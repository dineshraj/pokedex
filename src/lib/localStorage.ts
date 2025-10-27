'use client';

import { LOCALSTORAGE_KEY } from '../app/constants';
import { LocalStorageDataModel } from '../app/types';

const getLocalstorageData = () => {
  return localStorage.getItem(LOCALSTORAGE_KEY);
};

export const checkPokemonIsInLocalStorage = (entryNumber: number) => {
  const storedData = getLocalstorageData();

  if (!storedData) return null;

  const storedDataAsArray: LocalStorageDataModel[] = JSON.parse(storedData);

  const pokemon = storedDataAsArray.find(
    (pokemon: LocalStorageDataModel) => pokemon.entry_number === entryNumber
  );

  //!
  if (!pokemon) return null;

  const { name, flavorText, soundFile, sprite }: LocalStorageDataModel =
    pokemon;

  return {
    entry_number: entryNumber,
    name,
    flavorText,
    soundFile,
    sprite
  };
};

export const savePokemonToLocalstorage = (
  pokemonData: LocalStorageDataModel
) => {  
  const storedData = getLocalstorageData();

  let dataToStore = [];

  if (storedData) {
    const storedDataAsArray: LocalStorageDataModel[] = JSON.parse(storedData);
    dataToStore = [...storedDataAsArray, pokemonData];
  } else {
    dataToStore = [pokemonData];
  }

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataToStore));
};
