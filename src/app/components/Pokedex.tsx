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
import ScanLight from './ScanLight';
import Information from './Information';
import Dots from './Dots';

interface PokedexComponentProps {
  kantoPokedex: KantoPokedex[];
}

const imageStyle = {
  width: '100%',
  height: '100%',
  maxWidth: 'fit-content',
  filter: 'drop-shadow(0px 0px 100px #27272c)'
};

// ? reminder - parameterized for easy mocking
const PokedexComponent = ({ kantoPokedex }: PokedexComponentProps) => {
  let randomPokemonNumber: number;
  const [currentPokemon, setCurrentPokemon] = useState<LocalStorageDataModel>();
  const [loadingPokemon, setLoadingPokemon] = useState<boolean>(false);

  const clickHandler = async () => {
    setLoadingPokemon(true);
    randomPokemonNumber = getRandomPokemonNumber();
    const localStoragePokemonData =
      checkPokemonIsInLocalStorage(randomPokemonNumber);

    if (localStoragePokemonData) {
      // don't request, just set localstorage data to state
      setCurrentPokemon(localStoragePokemonData);
    } else {
      await setPokemon(randomPokemonNumber);
    }

    //? fake delay to make it more exciting - this will make the light will blink
    setTimeout(async () => {
      setLoadingPokemon(false);
    }, 3000);
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

      setCurrentPokemon(dataToStore);
      savePokemonToLocalstorage(dataToStore);
    }
  };

  // pokedex: h-[80vh]

  return (
    <div
      className="relative items-center justify-center flex w-[min(90vw,90vh)] aspect-[300/227]"
      data-testid="pokedex"
    >
      <Image
        src="/pokedex.svg"
        data-testid="pokedex-image"
        alt="pokedex"
        priority
        fill
        className="drop-shadow-[0px_30px_100px_#27272c]"
      />
      <ScanLight loading={loadingPokemon} />
      {currentPokemon && (
        <Screen
          loading={loadingPokemon}
          name={currentPokemon.name}
          spriteUrl={currentPokemon.sprite}
        />
      )}
      <Button clickHandler={clickHandler} buttonDisabled={loadingPokemon} />

      {loadingPokemon && <Dots />}
      {(!loadingPokemon && currentPokemon) && <Information loading={loadingPokemon} name={currentPokemon.name} description={currentPokemon.flavorText} />}
    </div>
  );
};

export default PokedexComponent;
