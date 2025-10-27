'use client';

import Image from 'next/image';
import Button from './Button';
import getRandomPokemonNumber from '@/src/lib/pokemonNumber';
import { KantoPokedex, LocalStorageDataModel, PokemonUpdated } from '../types';
import {
  checkPokemonIsInLocalStorage,
  savePokemonToLocalstorage
} from '@/src/lib/localStorage';
import { useState } from 'react';
import { POKEMON_ERROR_MESSAGE, SPECIES_ERROR_MESSAGE } from '../constants';
import { PokemonSpecies } from 'pokenode-ts';
import Screen from './Screen';

interface PokedexComponentProps {
  kantoPokedex: KantoPokedex[];
}

const imageStyle = {
  width: 'auto',
  height: '100%',
  maxWidth: 'fit-content',
  filter: 'drop-shadow(0px 0px 100px #27272c)'
};

// !Reminder - parameterized for easy mocking
const PokedexComponent = ({ kantoPokedex }: PokedexComponentProps) => {
  let randomPokemonNumber: number;
  const [currentPokemon, setCurrentPokemon] = useState<LocalStorageDataModel>();

  const clickHandler = () => {
    randomPokemonNumber = getRandomPokemonNumber();
    const localStoragePokemonData =
      checkPokemonIsInLocalStorage(randomPokemonNumber);

    if (localStoragePokemonData) {
      // don't request, just set localstorage data to stat3
      setCurrentPokemon(localStoragePokemonData);
    } else {
      setPokemon(randomPokemonNumber);
    }
  };

  const setPokemon = async (randomPokemonNumber: number) => {
    const pokemon = kantoPokedex.find((pokemon) => {
      return pokemon.entry_number === randomPokemonNumber;
    });

    if (pokemon) {
      let pokemonSpeciesData: PokemonSpecies;
      let pokemonData: PokemonUpdated;

      try {
        const pokemonSpeciesResponse: Response = await fetch(
          pokemon.pokemon_species.url
        );
        pokemonSpeciesData = await pokemonSpeciesResponse.json();
      } catch (e: any) {
        console.error(SPECIES_ERROR_MESSAGE);
        return;
      }

      const pokemonUrl = pokemonSpeciesData.varieties[0].pokemon.url;

      try {
        const pokemonDataResponse = await fetch(pokemonUrl);
        pokemonData = await pokemonDataResponse.json();
      } catch (e: any) {
        console.error(POKEMON_ERROR_MESSAGE);
        return;
      }

      const dataToStore: LocalStorageDataModel = {
        entry_number: pokemon.entry_number,
        name: pokemon.pokemon_species.name,
        flavorText: pokemonSpeciesData.flavor_text_entries[0].flavor_text,
        soundFile: pokemonData.cries.latest,
        sprite: pokemonData.sprites.front_default!
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
        {currentPokemon && (
          <Screen
            name={currentPokemon.name}
            spriteUrl={currentPokemon.sprite}
          />
        )}
        <Button clickHandler={clickHandler} />
      </div>
    </div>
  );
};

export default PokedexComponent;
