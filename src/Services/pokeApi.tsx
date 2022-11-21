import axios from "axios";
import { BasicInfo, GeneartionType, FullPokemonType, PokemonSpeciesType } from "../Utilities/pokemon/pokeApiTypes";
const BASE_URL = "https://pokeapi.co/api/v2/";

export default class PokeApi {

  constructor() {
    if (this.constructor === PokeApi) {
      throw new Error("This class can't be instantiated.");
    }
  }

  static async getPokeList(){
    const res = await axios.get(BASE_URL+"pokemon?limit=151")
    return {
      pokemons: res.data.results as Array<BasicInfo>,
      next: res.data.next as string, 
      previous: res.data.previous as string
    };
  }

  static async getPokeListByRegion(generationNumber:number){
    const res = await axios.get(BASE_URL+"generation/"+generationNumber)
    return res.data as GeneartionType;
  }

  static async getFullPokemonInfo(pokemon:BasicInfo){
    const res = await axios.get(pokemon.url)
    return res.data as PokemonSpeciesType;
  }

  static async getFullPokemonsInfo(pokemons:Array<BasicInfo>){
    let fullList:Array<PokemonSpeciesType> = await Promise.all(
      pokemons.map(async (pokemon) => {
        const res = await axios.get(pokemon.url);
        return await res.data as PokemonSpeciesType;
      })
    )
    return fullList.sort((a,b) => a.order - b.order)
  }
}