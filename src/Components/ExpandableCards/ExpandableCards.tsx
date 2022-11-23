import './ExpandableCards.css';
import { PokemonType } from '../../Utilities/pokemon/pokemonInfo';
import React from 'react';
import { FullPokemonType, PokemonSpeciesType } from '../../Utilities/pokemon/pokeApiTypes';
import { LayoutGroup, motion, AnimatePresence } from "framer-motion"

interface Props {
  data: Array<FullPokemonType>;
}

function ExpandableCards (props:Props) {
    
  const [selectedPokemon,setSelectedPokemeon] = React.useState<FullPokemonType | null>(null)

  const variants = {
    visible: {
      scale: 1.1,
      boxShadow: "10px 10px 0 rgba(0, 0, 0, 0.2)",
      y: -50,
      x: -100,
      cursor: "pointer",
      transition: { duration: 1, type: "spring" },
    },
    hidden: { scale: 1, opacity: 0 },
  };

  return (
    <LayoutGroup>
      <ul className='expandable-card__group' >
        {props.data.map((pokemon) => (
          <motion.li 
          key={pokemon.name}
          layoutId={pokemon.name}
          className='expandable-card__main'
          onClick={ () => {setSelectedPokemeon(pokemon); console.log(pokemon.sprites.other?.['official-artwork'].front_default)}}>
            <motion.h6 layoutId={pokemon.name+" title"} >{pokemon.name + "♀"}</motion.h6>
            {pokemon.sprites.other?.['official-artwork']?.front_default && <motion.img src={pokemon.sprites.other?.['official-artwork'].front_default} />}
            <div>{"< Type >"} </div>
            <div>{ pokemon.id ? pokemon.id : "< # >"} </div>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
      {selectedPokemon && (
        <motion.div
        transition={{ duration: 2 }}
        className="expandable-card__clicked"
        style={{position: "fixed", top: "30%",left: "40%"}}
        layoutId={selectedPokemon.name}
        onClick={() => setSelectedPokemeon(null)}>
      <motion.h6 layoutId={selectedPokemon.name+" title"} transition={{ duration: 2 }}> {selectedPokemon.name}</motion.h6>
      <motion.h6> {selectedPokemon.name}</motion.h6>
      </motion.div>
      )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default ExpandableCards;