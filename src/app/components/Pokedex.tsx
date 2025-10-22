'use client';

import Image from 'next/image';
import Button from './Button';
import getRandomPokemonNumber from '@/src/lib/pokemonNumber';
import { KantoPokedex, localStorageDataModel } from '../types';
import {
  checkPokemonIsInLocalStorage,
  savePokemonToLocalstorage
} from '@/src/lib/localStorage';
import { useState } from 'react';
import { POKEMON_ERROR_MESSAGE, SPECIES_ERROR_MESSAGE } from '../constants';

interface PokedexComponentProps {
  kantoPokedex: KantoPokedex[];
}

const imageStyle = {
  width: 'auto',
  height: '100%',
  maxWidth: 'fit-content'
};

// !Reminder - parameterized for easy mocking
const PokedexComponent = ({ kantoPokedex }: PokedexComponentProps) => {
  const [currentPokemon, setCurrentPokemon] =
    useState<localStorageDataModel | null>();

  const clickHandler = () => {
    const randomPokemonNumber = 1; //getRandomPokemonNumber();

    const localStoragePokemonData =
      checkPokemonIsInLocalStorage(randomPokemonNumber);
    if (localStoragePokemonData) {
      setCurrentPokemon(localStoragePokemonData);
    } else {
      setPokemon(randomPokemonNumber);
    }
  };

  const setPokemon = async (randomPokemonNumber: number) => {
    const pokemon = kantoPokedex.find(
      (pokemon) => pokemon.entry_number === 1 //randomPokemonNumber
    );

    if (pokemon) {
      let pokemonSpeciesData;
      let pokemonData;
      try {
        const pokemonSpeciesResponse = await fetch(pokemon.url);
        pokemonSpeciesData = await pokemonSpeciesResponse.json();
      } catch (e) {
        console.error(SPECIES_ERROR_MESSAGE);
        return;
      }
      const pokemonUrl = pokemonSpeciesData.varieties[0].pokemon.url;

      try {
        const pokemonDataResponse = await fetch(pokemonUrl);
        pokemonData = await pokemonDataResponse.json();
      } catch (e) {
        console.error(POKEMON_ERROR_MESSAGE);
        return;
      }

      const dataToStore: localStorageDataModel = {
        entry_number: pokemon.entry_number,
        name: pokemon.name,
        flavorText: pokemonSpeciesData.flavor_text_entries[0].flavour_text,
        soundFile: pokemonData.cries.latest,
        sprite: pokemonData.sprites.front_default
      };

      savePokemonToLocalstorage(dataToStore);
      setCurrentPokemon(dataToStore);
    }
  };

  return (
    <div
      className="pokedex relative flex w-[80vw] h-[80vh] justify-center"
      data-testid="pokedex"
    >
      <div className="pokedex-elements relative w=[100%] h=[100%]">
        <Image
          src="/pokedex.svg"
          data-testid="pokedex-image"
          alt="pokedex"
          priority
          width="50"
          height="50"
          style={imageStyle}
        />
        <div>{currentPokemon?.name}</div>
        <Button clickHandler={clickHandler} />
      </div>
    </div>
  );
};

export default PokedexComponent;
