import React, { useEffect } from 'react';
import './App.css';
import PokeApi from './Services/pokeApi';
import {CustomPokemonType, FavPokemons} from './Utilities/pokemon/pokeApiTypes';
import ExpandableCards from './Components/ExpandableCards/ExpandableCards';
import SearchBar from './Components/searchBar/searchBar';
import DropdownMenu from './Components/dropdownMenu/dropdownMenu';

import { motion } from 'framer-motion';
import { PokemonTypes } from './Utilities/pokemon/pokemonInfo';
import { useLocalStorage } from './Utilities/hooks/useLocalStorage';
import CustomSwitch from './Components/Switch/CustomSwitch';

function App() {

  const [pokemons,setPokemons] = React.useState<Array<CustomPokemonType>>([])
  const [pokemonType, setPokemonType] = React.useState<PokemonTypes | null>(null);
  const [pokemonSearch, setPokemonSearch] = React.useState<string>("");

  const [favPokemons, setFavPokemons] = useLocalStorage<Array<FavPokemons>>("favPokemons",[] );

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  async function FetchPokemonInfo() {
    const result = await PokeApi.getPokemonsByGeneration(1);
    const result2 = await PokeApi.getPokemonsFullInfo(result);
    if (pokemons.length === 0 && result2.length !== 0) setPokemons(result2);
  }

  useEffect(() => {
    FetchPokemonInfo();
  },[])

  const onFavPokemon = (pokemon:CustomPokemonType, isIncluded: boolean ) => {
    if (isIncluded){
      setFavPokemons(
        favPokemons.filter(favPokemon => favPokemon.id !== pokemon.id)
      );
    } else {
      setFavPokemons([
        ...favPokemons,
        {
          id: pokemon.id, 
          species: pokemon.species
        }
      ]);
    }
  }

  const filterPokemons = ( pokemons: Array<CustomPokemonType>) =>{
    let filteredPokemons = [...pokemons]

    //filter by type
    if(pokemonType) {
      filteredPokemons = filteredPokemons.filter( pokemon => 
        pokemon.types.reduce( (accumulator, currentValue) => 
          accumulator || (currentValue.type.name === pokemonType.toString()), false
        )
      );
    }

    // filter by id or name
    if(pokemonSearch !== "") {
      filteredPokemons = filteredPokemons.filter( pokemon => (
        pokemon.name.includes(pokemonSearch) || pokemon.id.toString() === pokemonSearch
      ));
    }

    //filter by generation
    //TODO

    //filter Fav Pokemons
    if(checked){
      filteredPokemons = filteredPokemons.filter( pokemon => (
        favPokemons.find( fav => fav.id === pokemon.id)
      ))
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
          <DropdownMenu text='Generation' options={ Object.values(PokemonTypes) } nullValue="-" />
          <DropdownMenu text='type' options={Object.values(PokemonTypes)} nullValue="-" onSelect={setPokemonType} />
          <CustomSwitch value={checked} onValueChange={handleChange}/>
          <SearchBar text='Write pokemon name or ID' onSearch={setPokemonSearch}  />
        </nav>
        <motion.div>
          <ExpandableCards data={filterPokemons(pokemons)} onFav={onFavPokemon} favData={favPokemons} />
        </motion.div>
    </motion.div>
  );
}

export default App;