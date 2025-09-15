import Image from 'next/image';
import { useEffect, useState } from 'react';
import { GameClient, POKEDEXES } from 'pokenode-ts';

// type Pokedex = {};

export const api = new GameClient();
const generation = 'kantoPokedex';
const generationID = POKEDEXES.KANTO;

const Pokedex = () => {
  const [pokedex, setPokedex] = useState<[]>([]);

  const getPokedex = async (generationID: number) => {
    return await api.getPokedexById(generationID);
  };

  useEffect(() => {
    getPokedex(generationID);
    //   let pokedex;
    //   const localStorage = window.localStorage;
    //   if (localStorage.getItem(generation) === null) {
    //     try {
    //       pokedex = await api.getPokedexById(region);
    //       localStorage.setItem(generation, JSON.stringify(pokedex));
    //     } catch (e: unknown) {
    //       console.error('Could not fetch Pokédex', e);
    //     }
    //   }
    // };
  }, []);

  return (
    <Image
      src="/pokedex.svg"
      alt="pokedex"
      priority
      width="1178"
      height="891"
    />
  );
};

export default Pokedex;
