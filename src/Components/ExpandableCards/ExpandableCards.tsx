import './ExpandableCards.css';
import { PokemonType } from '../../Utilities/pokemon/pokemonInfo';
import React from 'react';
import { FullPokemonType, PokemonTypes } from '../../Utilities/pokemon/pokeApiTypes';
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

  function getPokemonTypes(type:Array<PokemonTypes>){
    console.log(type);
    return type.map( type => (
      <img key={type.type.name} src={`Images/pokemonTypesSvg/${type.type.name}.svg`}/>
    ))
  }

  return (
    <LayoutGroup>
      <ul className='expandable-card__group' >
        {props.data.map((pokemon) => (
          <motion.li 
          key={pokemon.name}
          layoutId={pokemon.name}
          className='expandable-card__main'
          onClick={ () => {setSelectedPokemeon(pokemon); console.log(pokemon.sprites.other?.['official-artwork'].front_default)}}>
            <motion.h6 layoutId={pokemon.name+"-title"} className="expandable-card__tittle" >{pokemon.name + "♀"}</motion.h6>
            {pokemon.sprites.other?.['official-artwork']?.front_default && <motion.img className='expandable-card__art' layoutId={pokemon.name+"-art"} src={pokemon.sprites.other?.['official-artwork'].front_default} />}
            <motion.div className='expandable-card__type' layoutId={pokemon.name+"-types"}>{ getPokemonTypes(pokemon.types)} </motion.div>
            {/*<div>{ pokemon.id ? pokemon.id : "< # >"} </div>*/}
          </motion.li>
        ))}
      </ul>
      <AnimatePresence>
      {selectedPokemon && (
        <motion.div
        animate={{width: "450px"}}
        transition={{ duration: 1 }}
        className="expandable-card__main"
        style={{position: "fixed", top: "30%",left: "40%"}}
        layoutId={selectedPokemon.name}
        onClick={() => setSelectedPokemeon(null)}>
      <motion.h6 layoutId={selectedPokemon.name+"-title"}  className="expandable-card__tittle" transition={{ duration: 1 }}> {selectedPokemon.name}</motion.h6>
      {selectedPokemon.sprites.other?.['official-artwork']?.front_default && <motion.img className='expandable-card__art' layoutId={selectedPokemon.name+"-art"} src={selectedPokemon.sprites.other?.['official-artwork'].front_default} />}
      <motion.div className='expandable-card__type' layoutId={selectedPokemon.name+"-types"}>{ getPokemonTypes(selectedPokemon.types)} </motion.div>

      </motion.div>
      )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default ExpandableCards;