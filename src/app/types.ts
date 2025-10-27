import { Pokemon } from 'pokenode-ts';
export interface KantoPokedex {
  entry_number: number;
  pokemon_species: {
    name: string;
    url: string;
  };
}

export interface LocalStorageDataModel {
  entry_number: number;
  name: string;
  flavorText: string;
  soundFile: string;
  sprite: string;
}

interface PokemonCries {
  cries: {
    legacy: string;
    latest: string;
  };
}

export type PokemonUpdated = Pokemon & PokemonCries;
