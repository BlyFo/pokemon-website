export interface BasicInfo {
    name: string
    url: string
}

export interface SpriteType {
    back_default: string | null
    back_female: string | null
    back_shiny: string | null
    back_shiny_female: string | null
    front_default: string | null
    front_female: string | null
    front_shiny: string | null
    front_shiny_female: string | null
}

export interface FullSpriteType extends SpriteType {
    other : {
        dream_world: SpriteType | null,
        home: SpriteType | null,
        "official-artwork": SpriteType,
    };
}

export interface GeneartionType {
    id: number;
    name: string;
    abilities: Array<any>;
    main_region: BasicInfo;
    moves: Array<any>;
    pokemon_species: Array<BasicInfo>;
    names: Array<any>;
    types: Array<any>;
    version_groups: Array<any>;
}

// a species can have multiple pokemons like Wormadam that as 3
// Wormadam-Trash, Wormadam-Sandy and Wormadam-Plant
export interface PokemonSpeciesType {
    id: number;
    name: string;
    order: number;
    gender_rate: number;
    capture_rate: number;
    base_happines: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    hatch_counter: number;
    has_gender_differences: boolean;
    forms_switchable: boolean;
    growth_rate: BasicInfo;
    pokedex_numbers: Array<any>;
    egg_groups: Array<BasicInfo>;
    color: BasicInfo;
    shape: BasicInfo;
    evolves_from_species: BasicInfo | null;
    evolution_chain: {url: string};
    habitat: BasicInfo;
    generation: BasicInfo;
    names: Array<{name: string, language:BasicInfo}>
    flavor_text_entries: Array<{flavor_text: string, language: BasicInfo, version: BasicInfo}>
    form_descriptions: Array<{description:string, language: BasicInfo}>
    genera: Array<{genus: string, language: BasicInfo}>
    varieties: Array<{is_default: boolean, pokemon: BasicInfo}>
}

export interface PokemonTypes {
    slot:number;
    type:BasicInfo;
}

export interface FullPokemonType {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: Array<any>;
    forms: Array<any>;
    game_indices: Array<any>;
    held_items: Array<any>;
    location_area_encounters: string;
    moves: Array<any>;
    species: BasicInfo;
    sprites: FullSpriteType;
    other: object;
    versions: object;
    stats: Array<any>;
    types: Array<PokemonTypes>;
    past_types: Array<any>;
}

export interface CustomPokemonType {
    id: number;
    name: string;
    order: number;
    forms: Array<any>;
    species: BasicInfo;
    sprites: FullSpriteType;
    types: Array<PokemonTypes>;
    names: Array<{name: string, language:BasicInfo}>
    flavor_text_entries: Array<{flavor_text: string, language: BasicInfo, version: BasicInfo}>
    form_descriptions: Array<{description:string, language: BasicInfo}>
}