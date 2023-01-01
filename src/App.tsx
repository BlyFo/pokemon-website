import React, { useEffect } from 'react';
import './App.css';
import PokeApi from './Services/pokeApi';
import { BasicInfo, CustomPokemonType, FavPokemons } from './Utilities/pokemon/pokeApiTypes';
import ExpandableCards from './Components/ExpandableCards/ExpandableCards';
import SearchBar from './Components/searchBar/searchBar';
import DropdownMenu from './Components/dropdownMenu/dropdownMenu';

import { motion } from 'framer-motion';
import { PokemonTypes } from './Utilities/pokemon/pokemonInfo';
import { useLocalStorage } from './Utilities/hooks/useLocalStorage';
import CustomSwitch from './Components/Switch/CustomSwitch';

function App() {

  const [pokemons, setPokemons] = React.useState<Record<number, Array<CustomPokemonType>>>({ 1: [] })
  const [pokemonsFav, setPokemonsFav] = React.useState<Array<CustomPokemonType>>([]);
  const [pokemonType, setPokemonType] = React.useState<PokemonTypes | null>(null);
  const [pokemonSearch, setPokemonSearch] = React.useState<string>("");
  const [pokemonGenCount, setPokemonGenCount] = React.useState<Array<string>>([]);
  const [pokemonGen, setPokemonGen] = React.useState<number>(1);
  const [saveFavPokemons, setSaveFavPokemons] = useLocalStorage<Array<FavPokemons>>("favPokemons", []);
  const [checked, setChecked] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const observer = React.useRef<null | IntersectionObserver>(null);

  const POKEMONS_PER_FETCH = 25;
  let pokemonsToFetch = React.useRef<Record<number, { list: Array<BasicInfo>, allFetch: boolean }>>({ 1: { list: [], allFetch: false } });
  let favPokemonsToFetch = React.useRef<Array<BasicInfo>>([]);

  //we detect if reach the end of the list and trie to fetch more pokemons
  const endOfPokemonListRef = React.useCallback((node: HTMLDivElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(async entries => {
      if (entries[0].isIntersecting) {
        if (checked && favPokemonsToFetch.current.length > 0) {
          setLoading(true);
          FetchPokemonFavInfo()
          setLoading(false);
        } else if (!pokemonsToFetch.current[pokemonGen].allFetch) {
          setLoading(true);
          const list = await fetchPokemons() as Record<number, Array<CustomPokemonType>>;
          setPokemons(list);
          setLoading(false);
        }
      }
    }
    )
    if (node) observer.current.observe(node)
  }, [loading])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  async function FetchPokemonInfo() {
    const generations = await PokeApi.getPokemonGenerations();
    const pokemonList = buildGenerationData(generations)
    const newDict = { ...pokemonsToFetch.current }
    newDict[1].list = await PokeApi.getPokemonsByGeneration(pokemonGen);
    pokemonsToFetch.current = newDict;
    const list = await fetchPokemons(pokemonList) as Record<number, Array<CustomPokemonType>>;
    setPokemons(list);
    setLoading(false);
  }

  async function FetchPokemonFavInfo() {
    const list = [...favPokemonsToFetch.current]
    let toFetch = list.splice(0, POKEMONS_PER_FETCH);
    favPokemonsToFetch.current = list;
    let result = await PokeApi.getPokemonsFullInfo(toFetch);
    setPokemonsFav(pokemonsFav.concat(result));
  }

  // create the list of gens and initialize empty arrays   
  function buildGenerationData(generations: number) {
    let data: Array<string> = []
    const toFetchDict: Record<number, { list: Array<BasicInfo>, allFetch: boolean }> = {};
    const pokemonsDict: Record<number, Array<CustomPokemonType>> = {};
    for (let i = 0; i < generations; i++) {
      data.push("Generation " + (i + 1));
      toFetchDict[i + 1] = { list: [], allFetch: false };
      pokemonsDict[i + 1] = [];
    }
    setPokemonGenCount(data);
    pokemonsToFetch.current = toFetchDict;
    return pokemonsDict;
  }

  async function fetchPokemons(pokemonList?: Record<number, Array<CustomPokemonType>>) {
    if (checked) return;

    const newDict = pokemonList ? { ...pokemonList } : { ...pokemons };
    // if the list is empty but the pokemons havent been fetch is because the list of pokemons was never fetch
    if (pokemonsToFetch.current[pokemonGen].list.length === 0 && !pokemonsToFetch.current[pokemonGen].allFetch) {
      pokemonsToFetch.current[pokemonGen].list = await PokeApi.getPokemonsByGeneration(pokemonGen);
    }
    let toFetch = pokemonsToFetch.current[pokemonGen].list.splice(0, POKEMONS_PER_FETCH);
    let result = await PokeApi.getPokemonsFullInfo(toFetch);
    newDict[pokemonGen].push(...result);
    //if the list is empty then all the pokemos are fetch
    if (pokemonsToFetch.current[pokemonGen].list.length === 0) pokemonsToFetch.current[pokemonGen].allFetch = true;
    return newDict;
  }

  useEffect(() => {
    FetchPokemonInfo();

    if (saveFavPokemons.length === 0) return;
    favPokemonsToFetch.current = saveFavPokemons.map(pokemon => pokemon["species"]);
    FetchPokemonFavInfo();
  }, [])

  const updateCurrentGeneration = (gen: string) => {
    const newgen = parseInt(gen.split(" ")[1])
    setPokemonGen(newgen)
  }

  const onFavPokemon = (pokemon: CustomPokemonType, isIncluded: boolean) => {
    //if a pokemons was marked as fav before we remove form the list, else its added
    if (isIncluded) {
      setSaveFavPokemons(
        saveFavPokemons.filter(favPokemon => favPokemon.id !== pokemon.id)
      );
    } else {
      setSaveFavPokemons([
        ...saveFavPokemons,
        {
          id: pokemon.id,
          species: pokemon.species
        }
      ]);
    }
  }

  const filterPokemons = (pokemons: Array<CustomPokemonType>) => {

    let filteredPokemons = pokemons;
    //filter by type
    if (pokemonType) {
      filteredPokemons = filteredPokemons.filter(pokemon =>
        pokemon.types.reduce((accumulator, currentValue) =>
          accumulator || (currentValue.type.name === pokemonType.toString()), false
        )
      );
    }

    // filter by id or name
    if (pokemonSearch !== "") {
      filteredPokemons = filteredPokemons.filter(pokemon => (
        pokemon.name.includes(pokemonSearch) || pokemon.id.toString() === pokemonSearch
      ));
    }

    return filteredPokemons;
  }

  return (
    <motion.div className="App">
      <header className='header'>
        <div className="logo__container">
          <div className="logo__glow"></div>
          <img className='logo' alt='' src='Images/background/pokeball.svg'></img>
        </div>
        <h1 className='header-description'> Web Page made with PokeAPI and React</h1>
      </header>
      <nav className='nav-bar'>
        <DropdownMenu text='Generation' options={pokemonGenCount} onSelect={updateCurrentGeneration} />
        <DropdownMenu text='Type' options={Object.values(PokemonTypes)} icons nullValue="-" onSelect={setPokemonType} />
        <CustomSwitch value={checked} onValueChange={handleChange} />
        <SearchBar text='Write pokemon name or ID' onSearch={setPokemonSearch} />
      </nav>
      <motion.div>
        <ExpandableCards data={filterPokemons(checked ? pokemonsFav : pokemons[pokemonGen])} onFav={onFavPokemon} favData={saveFavPokemons} />
        <div ref={endOfPokemonListRef} style={{ height: 0, width: "100%", background: "none", border: "1px solid red" }} > </div>
      </motion.div>
    </motion.div>
  );
}

export default App;