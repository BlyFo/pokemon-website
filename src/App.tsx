import React, { useEffect } from 'react';
import './App.css';
import PokeApi from './Services/pokeApi';
import { BasicInfo, PokemonSpeciesType } from './Utilities/pokemon/pokeApiTypes';
import ExpandableCards from './Components/ExpandableCards/ExpandableCards';

function App() {

  const [pokemons,setPokemons] = React.useState<Array<PokemonSpeciesType>>([])

  async function test() {
    const result = await PokeApi.getPokeListByRegion(1);
    const result2 = await PokeApi.getFullPokemonsInfo(result.pokemon_species);
    if (pokemons.length === 0 && result2.length !== 0) setPokemons(result2);
  }

  useEffect(() => {
    test();
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <ExpandableCards data={pokemons} />
      </header>
    </div>
  );
}

export default App;