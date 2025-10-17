'use client';

import Image from 'next/image';
import Button from './Button';
import getRandomPokemonNumber from '@/src/lib/pokemonNumber';
import { KantoPokedex } from '../types';
import checkPokemonIsInLocalStorage from '@/src/lib/queryLocalStorage';

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
  const getPokemon = async () => {
    const randomPokemonNumber = getRandomPokemonNumber();
    const localStoragePokemonData =
      checkPokemonIsInLocalStorage(randomPokemonNumber);

    console.log(
      '🚀 ~ getPokemon ~ localStoragePokemonData:',
      localStoragePokemonData
    );

    if (localStoragePokemonData) {
      return localStoragePokemonData;
    }

    console.log('shouldnt get to here......');

    /*
    If the random pokemon 
    */

    const pokemon = kantoPokedex.find(
      (pokemon) => pokemon.entry_number === randomPokemonNumber
    );

    // if (pokemon) {
    // try {
    const response = await fetch(pokemon.url);
    const data = await response.json();
    console.log('data after fetch call', data);

    // } catch (e) {
    // }
  };

  /*

    // ! IGNORE A LITTLE BIT

      when they click the button
      get a random number between 1-151
      check localstorage for whether the pokemon has already been seen
      otherwise 
      otherwise use it
    */

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
        <Button clickHandler={getPokemon} />
      </div>
    </div>
  );
};

export default PokedexComponent;
