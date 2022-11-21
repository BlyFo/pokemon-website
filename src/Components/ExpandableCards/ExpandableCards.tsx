import './ExpandableCards.css';
import { PokemonType } from '../../Utilities/pokemon/pokemonInfo';
import React from 'react';
import { PokemonSpeciesType } from '../../Utilities/pokemon/pokeApiTypes';
import { LayoutGroup, motion, AnimatePresence } from "framer-motion"

interface Props {
  data: Array<PokemonSpeciesType>;
}

function ExpandableCards (props:Props) {
    
  const [selectedPokemon,setSelectedPokemeon] = React.useState<PokemonSpeciesType | null>(null)

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
          onClick={ () => setSelectedPokemeon(pokemon)}>
            <motion.div>
            <h6>{pokemon.name ? pokemon.name : "< Pokemon Name >"}</h6>
            <div>{"< Sprite >"}</div>
            <div>{"< Type >"} </div>
            <div>{ pokemon.id ? pokemon.id : "< # >"} </div>
            </motion.div>
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
      {selectedPokemon && (
        <motion.div
        className="expandable-card__clicked"
        style={{position: "fixed", top: "30%",left: "40%"}}
        layoutId={selectedPokemon.name}
        onClick={() => setSelectedPokemeon(null)}>
      <h1 className="card-title"> {selectedPokemon.name}</h1>
      <h1 className="card-title"> {selectedPokemon.flavor_text_entries[0].flavor_text}</h1>
      </motion.div>
      )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default ExpandableCards;