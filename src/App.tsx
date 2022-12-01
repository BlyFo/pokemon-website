import React, { useEffect } from 'react';
import './App.css';
import PokeApi from './Services/pokeApi';
import {CustomPokemonType, FullPokemonType} from './Utilities/pokemon/pokeApiTypes';
import ExpandableCards from './Components/ExpandableCards/ExpandableCards';
import SearchBar from './Components/searchBar/searchBar';
import DropdownMenu from './Components/dropdownMenu/dropdownMenu';

import Switch from '@mui/material/Switch';

function App() {

  const [pokemons,setPokemons] = React.useState<Array<CustomPokemonType>>([])


  async function test() {
    const result = await PokeApi.getPokemonsByGeneration(1);
    const result2 = await PokeApi.getPokemonsFullInfo(result);
    if (pokemons.length === 0 && result2.length !== 0) setPokemons(result2);
  }

  useEffect(() => {
    test();
  },[])

  return (
    <div className="App">
        <header className='header'>
          <div className="logo__container">
            <div className="logo__glow"></div>
            <img className='logo' src='Images/background/pokeball.svg'></img>
          </div>
          <h1 className='header-description'> Web Page made with PokeAPI and React</h1>
        </header>
        <nav className='nav-bar'> 
          <DropdownMenu text='Generation' options={["1","2","3","4","5"]} />
          <DropdownMenu text='typo' options={["1","2","3","4","5"]} />
          <Switch />
          <SearchBar text='Write pokemon name or ID' />
        </nav>
        {<ExpandableCards data={pokemons} />}
    </div>
  );
}

export default App;