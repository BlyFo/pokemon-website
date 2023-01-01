import './ExpandableCards.css';
import React from 'react';
import { CustomPokemonType, FavPokemons, PokemonTypes } from '../../Utilities/pokemon/pokeApiTypes';
import { LayoutGroup, motion, AnimatePresence } from "framer-motion"
import StringUtils from '../../Utilities/stringUtils';
import Icons from '../Icons/icons';
import { Icon } from '../Icons/iconsType';

interface Props {
  data: Array<CustomPokemonType>;
  onFav?: (pokemon: CustomPokemonType, isIncluded: boolean) => void;
  favData?: Array<FavPokemons>;
}

function ExpandableCards(props: Props) {

  const [selectedPokemon, setSelectedPokemeon] = React.useState<Array<CustomPokemonType>>([]);

  function getPokemonTypes(type: Array<PokemonTypes>) {
    return type.map((type, index) => (
      <Icons style={{ marginLeft: `${5 * index}px`, userSelect: 'none', filter: "saturate(150%)" }} size="s" key={type.type.name} icon={type.type.name as Icon} />
    ))
  }

  function fav(pokemon: CustomPokemonType, isIncluded: boolean) {
    if (!props.onFav) return;
    props.onFav(pokemon, isIncluded);
  }

  function checkFav(pokemon: CustomPokemonType) {
    if (!props.favData) return false;
    return props.favData.find(fav => fav.id === pokemon.id) ? true : false;
  }

  return (
    <LayoutGroup>
      <ul className='expandable-card__group' >
        {props.data.map((pokemon) => {
          const isFav = checkFav(pokemon)
          return (
            <motion.li
              key={pokemon.name}
              layoutId={pokemon.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 0.5 } }}
              className='expandable-card__main'>
              <motion.h6 layoutId={pokemon.name + "-title"} className="expandable-card__tittle" >{pokemon.name}</motion.h6>
              {props.onFav &&
                <motion.button
                  onClick={() => fav(pokemon, isFav)}
                  className='expandable-card__fav-icon'>
                  <Icons
                    icon={isFav ? Icon.FAV_SELECT : Icon.FAV_NO_SELECT}
                    size="s"
                    color={isFav ? 'var(--color4)' : 'var(--color3)'} />
                </motion.button>}
              <motion.div className='expandable-card__clickeable-area' onClick={() => setSelectedPokemeon([pokemon])}>
                {pokemon.sprites.other?.['official-artwork']?.front_default && <motion.img className='expandable-card__art' layoutId={pokemon.name + "-art"} src={pokemon.sprites.other?.['official-artwork'].front_default} />}
                <motion.div className='expandable-card__type' layoutId={pokemon.name + "-types"}>{getPokemonTypes(pokemon.types)} </motion.div>
              </motion.div>
            </motion.li>
          );
        })}
      </ul>
      {selectedPokemon.length > 0 &&
        <ul className='expandable-card__group' >
          {selectedPokemon.map((pokemon) => {
            const isFav = checkFav(pokemon)
            return (
              <AnimatePresence>
                <motion.li
                  key={"selected card " + pokemon.name}
                  animate={{ width: "450px" }}
                  transition={{ duration: 0.5 }}
                  initial={{ opacity: 1 }}
                  className="expandable-card__main"
                  style={{ position: "fixed", top: "30%", left: "40%", zIndex: 3 }}
                  layoutId={pokemon.name}
                  onClick={() => setSelectedPokemeon(selectedPokemon.filter((pokemon2) => pokemon2.name !== pokemon.name))}>
                  <motion.h6 layoutId={pokemon.name + "-title"} className="expandable-card__tittle" transition={{ duration: 1 }}> {pokemon.name}</motion.h6>
                  {props.onFav &&
                    <motion.button
                      onClick={() => fav(pokemon, isFav)}
                      className='expandable-card__fav-icon'>
                      <Icons
                        icon={isFav ? Icon.FAV_SELECT : Icon.FAV_NO_SELECT}
                        size="s"
                        color={isFav ? 'var(--color4)' : 'var(--color3)'} />
                    </motion.button>}
                  {pokemon.sprites.other?.['official-artwork']?.front_default &&
                    <motion.img
                      className='expandable-card__art'
                      initial={{ right: "0px", top: "calc(50% - 100px)" }}
                      style={{ opacity: 1 }}
                      layoutId={pokemon.name + "-art"}
                      src={pokemon.sprites.other?.['official-artwork'].front_default} />
                  }
                  <motion.div
                    className='expandable-card__type'
                    initial={{ transform: "translate3d(0px,0px,0px)", translateX: 0 }}
                    animate={{ transform: "translate3d(0px,0px,0px)", translateX: 0 }}
                    layoutId={pokemon.name + "-types"}>
                    {getPokemonTypes(pokemon.types)}
                  </motion.div>
                  <motion.div
                    className='expandable-card__description'
                    initial={{ opacity: 0, height: 0, originY: 0 }}
                    animate={{ height: 120, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}>
                    {StringUtils.cleanDescription(
                      StringUtils.filterLanguage(pokemon.flavor_text_entries, "es").flavor_text)
                    }
                  </motion.div>
                </motion.li>
              </AnimatePresence>
            )
          })}
        </ul>
      }
    </LayoutGroup>
  );
}

export default ExpandableCards;