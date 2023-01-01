import axios from "axios";
import { BasicInfo, FullPokemonType, PokemonSpeciesType, CustomPokemonType } from "../Utilities/pokemon/pokeApiTypes";
import StringUtils from "../Utilities/stringUtils";
const BASE_URL = "https://pokeapi.co/api/v2/";

export default class PokeApi {

  constructor() {
    if (this.constructor === PokeApi) {
      throw new Error("This class can't be instantiated.");
    }
  }

  static async getPokemonsByGeneration(generationNumber: number) {
    const res = await axios.get(BASE_URL + `generation/${generationNumber}`)
    const list = res.data.pokemon_species as Array<BasicInfo>;
    const orderedList = list.sort((a, b) => parseInt(a.url.split("/")[6]) - parseInt(b.url.split("/")[6]))
    return orderedList as Array<BasicInfo>;
  }

  static async getPokemonFullInfo(pokemon: BasicInfo) {
    const res = await axios.get(pokemon.url);
    const pokemonSpecies = res.data as PokemonSpeciesType;
    const res2 = await axios.get(pokemonSpecies.varieties[0].pokemon.url);
    const pokemonData = res2.data as FullPokemonType;

    const customType: CustomPokemonType = {
      id: pokemonData.id,
      name: StringUtils.cleanPokemonName(pokemonData.name),
      order: pokemonData.order,
      forms: pokemonData.forms,
      species: pokemon,
      sprites: pokemonData.sprites,
      types: pokemonData.types,
      names: pokemonSpecies.names,
      flavor_text_entries: pokemonSpecies.flavor_text_entries,
      form_descriptions: pokemonSpecies.form_descriptions,
      generation: parseInt(pokemonSpecies.generation.url.split("/")[6])
    }
    return customType;
  }

  static async getPokemonsFullInfo(pokemons: Array<BasicInfo>) {
    let fullList: Array<CustomPokemonType> = await Promise.all(
      pokemons.map(async (pokemon) => {
        return await this.getPokemonFullInfo(pokemon);
      })
    )
    return fullList.sort((a, b) => a.id - b.id)
  }

  // fetch how many generations there are
  // this will stop working after gen 20 
  static async getPokemonGenerations() {
    const res = await axios.get(BASE_URL + `generation/`)
    return res.data.count;
  }
}