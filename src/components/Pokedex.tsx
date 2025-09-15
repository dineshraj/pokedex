import Image from 'next/image';
import { Pokedex } from 'pokenode-ts';

const PokedexComponent = ({ pokedex }: { pokedex: Pokedex }) => {

  /*
    on initial render (useEffect) i should store it in state
    when they click the button
    get a random number between 1-151
    check localstorage for whether the pokemon has already been seen
    otherwise request it
    otherwise use it
  */

  return (
    <Image
      src="/pokedex.svg"
      data-testid="pokedex-image"
      alt="pokedex"
      priority
      width="1178"
      height="891"
    ></Image>
  );
};

export default PokedexComponent;
