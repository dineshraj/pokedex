'use client';

import Image from 'next/image';
import Button from './Button';
import getRandomPokemonNumber from '@/src/lib/pokemonNumber';
import kantoPokedex from '@/src/data/pokedex';
import { KantoPokedex } from '../types';

interface PokedexComponentProps {
  kantoPokedex: KantoPokedex[]
}



 const getPokemon = async () => {
    const randomPokemonNumber = getRandomPokemonNumber();
    console.log("🚀 ~ getPokemon ~ randomPokemonNumber:", randomPokemonNumber)

  
    /*
      when they click the button
      get a random number between 1-151
      check localstorage for whether the pokemon has already been seen
      otherwise request it
      otherwise use it
    */
  }

const PokedexComponent = ({ kantoPokedex }: PokedexComponentProps ) => {
  
 ;

  const imageStyle = {
    width: 'auto',
    height: '100%',
    maxWidth: 'fit-content'
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
        <Button clickHandler={getPokemon} />
      </div>
    </div>
  );
};

export default PokedexComponent;
