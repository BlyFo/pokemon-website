import { pokemonLanguages } from "./pokemon/pokeApiTypes";

export default class StringUtils {

  constructor() {
    if (this.constructor === StringUtils) {
      throw new Error("This class can't be instantiated.");
    }
  }

  static cleanPokemonName(name: string) {
    const nameSeparated = name.split("-");
    let cleanName = nameSeparated[0];
    if (nameSeparated.length <= 1) return name;
    if (nameSeparated[1] === "f") cleanName += "♀";
    if (nameSeparated[1] === "m") cleanName += "♂";
    return cleanName;
  }

  static cleanDescription(description: string) {
    return description.replace("\f", "\n").toLowerCase()
  }

  static filterLanguage(text: Array<pokemonLanguages>, language: string) {
    return text.filter(text => text.language.name === language)[0]
  }
}