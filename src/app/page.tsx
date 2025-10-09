// import { GameClient } from 'pokenode-ts';
import PokedexComponent from './components/Pokedex';
import '../styles/page.scss';
// import { POKEDEX } from './constants';
import kantoPokedex from '../data/pokedex'; // local data

// type PageProps = {
//   api?: Pick<GameClient, 'getPokedexById'>;
// };

const Page = /*async*/ (/*{ api = new GameClient() }: PageProps */) => {
  // const pokedex = await api.getPokedexById(POKEDEX); // this is now json

  return (
    <div data-testid="page">
      <div className="flex items-center min-h-screen justify-center">
        {/* <div className="pokedex-container relative"> */}
        {/* <PokedexComponent pokedex={pokedex} /> */}
        <PokedexComponent pokedex={kantoPokedex} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Page;

/*
  if I want to make this static..............

    * make an object with each pokemon in an array like this (statically, no API calls)

    each pokemon gets a { name, url } from https://pokeapi.co/api/v2/pokedex/2 in the pokemon_entries object
    (like { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon-species/1/"})

    Then go to the species URL and look at varieties[0].pokemon.url, this looks like https://pokeapi.co/api/v2/pokemon/1/

    When you go there you'll have all the details needed

    src/data ? 



*/
