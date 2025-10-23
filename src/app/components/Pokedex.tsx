'use client';

import Image from 'next/image';
import Button from './Button';
import getRandomPokemonNumber from '@/src/lib/pokemonNumber';
import { KantoPokedex, LocalStorageDataModel } from '../types';
import {
  checkPokemonIsInLocalStorage,
  savePokemonToLocalstorage
} from '@/src/lib/localStorage';
import { useState } from 'react';
import { POKEMON_ERROR_MESSAGE, SPECIES_ERROR_MESSAGE } from '../constants';
import { Pokemon, PokemonSpecies } from 'pokenode-ts';

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
    useState<LocalStorageDataModel | null>();

  const clickHandler = () => {
    const randomPokemonNumber = getRandomPokemonNumber();
    console.log(
      '🚀 ~ clickHandler ~ randomPokemonNumber:',
      randomPokemonNumber
    );

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
      (pokemon) => pokemon.entry_number === randomPokemonNumber
    );

    if (pokemon) {
      let pokemonSpeciesData: PokemonSpecies;
      let pokemonData: Pokemon;
      try {
        const pokemonSpeciesResponse = await fetch(pokemon.pokemon_species.url);
        pokemonSpeciesData = await pokemonSpeciesResponse.json();
      } catch (e: any) {
        console.error(e.message);
        return;
      }
      const pokemonUrl = pokemonSpeciesData.varieties[0].pokemon.url;

      try {
        const pokemonDataResponse = await fetch(pokemonUrl);
        pokemonData = await pokemonDataResponse.json();
      } catch (e: any) {
        console.error(e.message);
        return;
      }

      const dataToStore: LocalStorageDataModel = {
        entry_number: pokemon.entry_number,
        name: pokemon.pokemon_species.name,
        flavorText: pokemonSpeciesData.flavor_text_entries[0].flavor_text,
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
