export default class StringUtils {

  constructor() {
    if (this.constructor === StringUtils) {
      throw new Error("This class can't be instantiated.");
    }
  }

  static cleanPokemonName(name:string){
    const firstCharacters = name.slice(0,name.length-2);
    const lastCharacters = name.slice(name.length-2,name.length);
    if(lastCharacters === "-f") name = firstCharacters+ "♀";
    if(lastCharacters === "-m") name = firstCharacters+ "♂";
    return name;
  }

  static cleanDescription(description: string){
    return description.replace("\f","\n").toLowerCase()
  }
}