import React, { useEffect } from 'react';
import './App.css';
import PokeApi from './Services/pokeApi';
import {CustomPokemonType} from './Utilities/pokemon/pokeApiTypes';
import ExpandableCards from './Components/ExpandableCards/ExpandableCards';
import SearchBar from './Components/searchBar/searchBar';
import DropdownMenu from './Components/dropdownMenu/dropdownMenu';

import Switch from '@mui/material/Switch';
import { PokemonTypes } from './Utilities/pokemon/pokemonInfo';

function App() {

  const [pokemons,setPokemons] = React.useState<Array<CustomPokemonType>>([])
  const [pokemonType, setPokemonType] = React.useState<PokemonTypes | null>(null);
  const [pokemonSearch, setPokemonSearch] = React.useState<string>("");


  async function test() {
    const result = await PokeApi.getPokemonsByGeneration(1);
    const result2 = await PokeApi.getPokemonsFullInfo(result);
    if (pokemons.length === 0 && result2.length !== 0) setPokemons(result2);
  }

  useEffect(() => {
    test();
  },[])

  const filterPokemons= ( pokemons: Array<CustomPokemonType>) =>{
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
      filteredPokemons = filteredPokemons.filter(pokemon => (
        pokemon.name.includes(pokemonSearch) || pokemon.id.toString() === pokemonSearch
      ));
    }

    //filter by generation
    //TODO
    
    return filteredPokemons;
  }

  return (
    <div className="App">
        <header className='header'>
          <div className="logo__container">
            <div className="logo__glow"></div>
            <img className='logo' alt='' src='Images/background/pokeball.svg'></img>
          </div>
          <h1 className='header-description'> Web Page made with PokeAPI and React</h1>
        </header>
        <nav className='nav-bar'> 
          <DropdownMenu text='Generation' options={ Object.values(PokemonTypes) } nullValue="-" />
          <DropdownMenu text='typo' options={Object.values(PokemonTypes)} nullValue="-" onSelect={setPokemonType} />
          <Switch />
          <SearchBar text='Write pokemon name or ID' onSearch={setPokemonSearch} />
        </nav>
        <ExpandableCards data={filterPokemons(pokemons)} />
    </div>
  );
}

export default App;