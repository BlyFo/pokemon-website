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
  /*
  private static async getPokeList(limit=0, offset=0){
    const res = await axios.get(BASE_URL+`pokemon?limit=${limit}&offset=${offset}`)
    return res.data.results as Array<BasicInfo>;
  }

  static async getPokeListByRegion(generationNumber:number){
    const pokemonsByGeneration = [
      151, //generation 1
      100, //generation 2
      135, //generation 3
      107, //generation 4
      156, //generation 5
      72, //generation 6
      81, //generation 7
      96 //generation 8
    ]
    
    const offset = pokemonsByGeneration.slice(0,generationNumber-1).reduce((a,b) => a+b,0)
    return await this.getPokeList(pokemonsByGeneration[generationNumber-1],offset)
  }

  static async getFullPokemonInfo(pokemon:BasicInfo){
    const res = await axios.get(pokemon.url)
    return res.data as FullPokemonType;
  }

  static async getFullPokemonsInfo(pokemons:Array<BasicInfo>){
    let fullList:Array<FullPokemonType> = await Promise.all(
      pokemons.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return await res.data as FullPokemonType;
      })
    )
    return fullList.sort((a,b) => a.order - b.order)
  }
  */
  static async getPokemonsByGeneration(generationNumber:number){
    const res = await axios.get(BASE_URL+`generation/${generationNumber}`)
    return res.data.pokemon_species as Array<BasicInfo>;
  }

  static async getPokemonFullInfo(pokemon: BasicInfo){
    const res = await axios.get(pokemon.url);
    const pokemonSpecies = res.data as PokemonSpeciesType;
    const res2 = await axios.get(pokemonSpecies.varieties[0].pokemon.url);
    const pokemonData = res2.data as FullPokemonType;

    const customType: CustomPokemonType = {
      id: pokemonData.id,
      name:  StringUtils.cleanPokemonName(pokemonData.name),
      order: pokemonData.order,
      forms: pokemonData.forms,
      species: pokemon,
      sprites: pokemonData.sprites,
      types: pokemonData.types,
      names: pokemonSpecies.names,
      flavor_text_entries: pokemonSpecies.flavor_text_entries,
      form_descriptions: pokemonSpecies.form_descriptions
    }
    return customType;
  }
  static async getPokemonsFullInfo(pokemons: Array<BasicInfo>){
    let fullList:Array<CustomPokemonType> = await Promise.all(
      pokemons.map(async (pokemon) => {
        return await this.getPokemonFullInfo(pokemon);
      })
    )
    return fullList.sort((a,b) => a.order - b.order)
  }
}