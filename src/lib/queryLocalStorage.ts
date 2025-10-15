'use client';

const checkPokemonIsInLocalStorage = (entryNumber: number) => {
  return {
    entry_number: entryNumber,
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  };
};

export default checkPokemonIsInLocalStorage;
