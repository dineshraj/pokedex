'use client';

import { LOCALSTORAGE_KEY } from '../app/constants';
import { localStorageDataModel } from '../app/types';

const getLocalstorageData = () => {
  return localStorage.getItem(LOCALSTORAGE_KEY);
};

export const checkPokemonIsInLocalStorage = (entryNumber: number) => {
  const storedData = getLocalstorageData();

  if (!storedData) return null;


  const storedDataAsArray: localStorageDataModel[] = JSON.parse(storedData);

  const pokemon = storedDataAsArray.find(
    (pokemon: localStorageDataModel) => pokemon.entry_number === entryNumber
  );

  if (!pokemon) return null;

  const { name, flavorText, soundFile, sprite }: localStorageDataModel =
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
  pokemonData: localStorageDataModel
) => {
  const storedData = getLocalstorageData();

  let dataToStore = [];

  if (storedData) {
    const storedDataAsArray: localStorageDataModel[] = JSON.parse(storedData);
    dataToStore = [...storedDataAsArray, pokemonData];
  } else {
    dataToStore = [pokemonData];
  }

  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(dataToStore));
};
