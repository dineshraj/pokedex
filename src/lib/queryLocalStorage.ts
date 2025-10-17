'use client';

import { LOCALSTORAGE_KEY } from '../app/constants';
import { KantoPokedex, localStorageDataModel } from '../app/types';

const checkPokemonIsInLocalStorage = (entryNumber: number) => {
  const storedData: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
  console.log('🚀 ~ checkPokemonIsInLocalStorage ~ storedData:', storedData);

  if (!storedData) return null;

  const storedDataAsArray: localStorageDataModel[] = JSON.parse(storedData);

  const pokemon = storedDataAsArray.find(
    (pokemon: localStorageDataModel) => pokemon.entry_number === entryNumber
  );

  if (!pokemon) return null;

  console.log('🚀 ~ checkPokemonIsInLocalStorage ~ pokemon:', pokemon);

  const { name, flavorText, soundFile, sprite } = pokemon;

  return {
    entry_number: entryNumber,
    name,
    flavorText,
    soundFile,
    sprite
  };
};

export default checkPokemonIsInLocalStorage;
