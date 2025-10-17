// import { GameClient } from 'pokenode-ts';
import PokedexComponent from './components/Pokedex';
import '../styles/page.scss';
// import { POKEDEX } from './constants';
import kantoPokedex from '../data/pokedex'; //! local data for ease

const Page = /*async*/ (/*{ api = new GameClient() }: PageProps */) => {
  // const pokedex = await api.getPokedexById(POKEDEX); // this is now json

  return (
    <div data-testid="page">
      <div className="flex items-center min-h-screen justify-center">
        {/* <div className="pokedex-container relative"> */}
        <PokedexComponent kantoPokedex={kantoPokedex} />
      </div>
      {/* </div> */}
    </div>
  );
};

export default Page;

/*
  if I want to make this static..............

    * make an object with each pokemon in an array like this (statically, no API calls) in data.pokdex.ts

    store each pokemon as { entry_number, name, url } taken from https://pokeapi.co/api/v2/pokedex/2 (this is the URL for Kanto) in the "pokemon_entries" property
    like:
    { 
      entry_number: 1
      name: "bulbasaur",
      url: "https://pokeapi.co/api/v2/pokemon-species/1/"
    }

    the url is the species URL
      
    ! We are storing the above in a local object so we don't need server side requests

    Then on the client side fetch the species URL (https://pokeapi.co/api/v2/pokemon-species/1) 
    - fetch the "flavour text entries[0]" for the description
    - look at varieties[0].pokemon.url
    - fetch THAT URL too ("https://pokeapi.co/api/v2/pokemon/1/")

    When you go there you'll have all the details needed 
    - an ogg file for cries ( { cries.latest })
    - sprite files { sprites.front_default }

    ! localstorage aspect
    when a pokemon is found, store the object above in local storage
    if a pokemen has been found (entries exist in localstorage) then display the lowest entry number
    which means ...
    - on load, get the local storage property
    - parse JSON
    - map over the array and use a sort function to order them
    - STORE IT 
    - display the first one
    - then this enables the D-Pad to cycle back and forth through the pokemon




*/
