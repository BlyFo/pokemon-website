import './ExpandableCards.css';
import React from 'react';
import { CustomPokemonType, FavPokemons, PokemonTypes } from '../../Utilities/pokemon/pokeApiTypes';
import { LayoutGroup, motion, AnimatePresence } from "framer-motion"
import StringUtils from '../../Utilities/stringUtils';
import Icons from '../Icons/icons';
import { Icon } from '../Icons/iconsType';

interface Props {
  data: Array<CustomPokemonType>;
  onFav?: (pokemon:CustomPokemonType, isIncluded:boolean) => void;
  favData?: Array<FavPokemons>;
}

function ExpandableCards (props:Props) {
    
  const [selectedPokemon,setSelectedPokemeon] = React.useState<CustomPokemonType | null>(null);

  function getPokemonTypes(type:Array<PokemonTypes>){
    return type.map( (type,index) => (
      <Icons style={{marginLeft: `${5*index}px`, userSelect: 'none' ,  filter: "saturate(150%)"}} size="s" key={type.type.name} icon={type.type.name as Icon}/>
    ))
  }

  function fav(pokemon: CustomPokemonType, isIncluded:boolean ){
    if(!props.onFav) return;
    props.onFav(pokemon, isIncluded);
  }

  function checkFav(pokemon: CustomPokemonType ){
    if (!props.favData) return false;
    return props.favData.find(fav => fav.id === pokemon.id) ? true : false ;
  }

  return (
    <LayoutGroup>
      <ul className='expandable-card__group' >
        {props.data.map((pokemon) => {
          const isFav = checkFav(pokemon)
          return(
            <motion.li 
            key={pokemon.name}
            layoutId={pokemon.name}
            initial={{opacity:0}}
            animate={{opacity:1, transition:{duration: 0.5}}}
            className='expandable-card__main'
            style={{opacity: selectedPokemon?.name === pokemon.name ? 0 : 1}}>
              <motion.h6 layoutId={pokemon.name+"-title"} className="expandable-card__tittle" >{pokemon.name}</motion.h6>
              { props.onFav && <motion.button onClick={ () => fav(pokemon, isFav)} className='expandable-card__fav-icon' > <Icons icon={ isFav ? Icon.FAV_SELECT : Icon.FAV_NO_SELECT} size="s" color={ isFav ? 'var(--color4)': 'var(--color3)'}/> </motion.button>}
              <motion.div className='expandable-card__clickeable-area' onClick={ () => setSelectedPokemeon(pokemon)}>
                {pokemon.sprites.other?.['official-artwork']?.front_default && <motion.img  className='expandable-card__art' layoutId={pokemon.name+"-art"} src={pokemon.sprites.other?.['official-artwork'].front_default} />}
                <motion.div className='expandable-card__type' layoutId={pokemon.name+"-types"}>{ getPokemonTypes(pokemon.types)} </motion.div>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
      <AnimatePresence>
      {selectedPokemon && (
        <motion.div
        animate={{width: "450px"}}
        transition={{ duration: 1 }}
        className="expandable-card__main"
        style={{position: "fixed", top: "30%",left: "40%", zIndex: 3}}
        layoutId={selectedPokemon.name}
        onClick={() => setSelectedPokemeon(null)}>
          <motion.h6 layoutId={selectedPokemon.name+"-title"}  className="expandable-card__tittle" transition={{ duration: 1 }}> {selectedPokemon.name}</motion.h6>
          {selectedPokemon.sprites.other?.['official-artwork']?.front_default && <motion.img className='expandable-card__art' style={{opacity: 1}} layoutId={selectedPokemon.name+"-art"} src={selectedPokemon.sprites.other?.['official-artwork'].front_default} />}
          <motion.div className='expandable-card__type' layoutId={selectedPokemon.name+"-types"}>{ getPokemonTypes(selectedPokemon.types)} </motion.div>
          <motion.div className='expandable-card__description'  initial={{ opacity: 0, height: 0, originY: 0 }} animate={{height: 100, opacity: 1}} transition={{delay: 0.5, duration: 0.8}}>{StringUtils.cleanDescription(selectedPokemon.flavor_text_entries[0].flavor_text)}</motion.div>
      </motion.div>
      )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

export default ExpandableCards;