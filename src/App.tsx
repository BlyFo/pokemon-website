import React, { useEffect } from 'react';
import './App.css';
import PokeApi from './Services/pokeApi';
import {FullPokemonType} from './Utilities/pokemon/pokeApiTypes';
import ExpandableCards from './Components/ExpandableCards/ExpandableCards';

function App() {

  const [pokemons,setPokemons] = React.useState<Array<FullPokemonType>>([])
  const [scrollPosition, setScrollPosition] = React.useState(500);
  const handleScroll = () => {
    const position = window.pageYOffset;
    if(position > 500) setScrollPosition(position);
    if(position < 500) setScrollPosition(500);
};

  async function test() {
    const result = await PokeApi.getPokeListByRegion(1);
    const result2 = await PokeApi.getFullPokemonsInfo(result);
    if (pokemons.length === 0 && result2.length !== 0) setPokemons(result2);
  }

  useEffect(() => {
    test();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };

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
        <nav className='nav-bar' style={{top: scrollPosition}}> 
          <button> generacion </button> 
          <button> typo </button>
          <button> favoritos </button>
          <button> buscar </button>
        </nav>
        {<ExpandableCards data={pokemons} />}
    </div>
  );
}

export default App;