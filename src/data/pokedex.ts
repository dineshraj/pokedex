import { KantoPokedex } from "../app/types";

//! This is what we would get from the API so don't change this file

const kantoPokedex: KantoPokedex[] = [
  {
    entry_number: 1,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  },
  {
    entry_number: 2,
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/2/'
  },
  {
    entry_number: 3,
    name: 'venusaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/3/'
  }
];

export default kantoPokedex;
