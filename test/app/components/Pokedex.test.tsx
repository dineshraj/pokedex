import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokedexComponent from '@/src/app/components/Pokedex';
// import * as rand
// omPokemonNumber from '../../../src/lib/pokemonNumber';

const mockPokedex = [
  {
    entry_number: 1,
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  },
  {
    entry_number: 2,
    name: 'ivysaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/2/'
  }
];

const mockPokemonData = {
  flavor_text_entries: 'plant boy', // from { flavor_text_entries[0] } from https://pokeapi.co/api/v2/pokemon-species/1/
  cry: 'someone with downs syndrome', // from { cries: { latest: "url" } { from "https://pokeapi.co/api/v2/pokemon/1/",
  sprite: 'url' // from { sprites: { front_default: "url" } } from https://pokeapi.co/api/v2/pokemon/1
};

jest.mock('../../../src/lib/pokemonNumber', () => {
  return jest.fn().mockReturnValue(1);
});

//! mock local storage here too (maybe abstract it to another file)
const getItemSpy = jest.spyOn(Storage.prototype, 'getItem');

const fetchMock = () => {
  jest.spyOn(window, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockPokemonData)
  } as unknown as Response);
};

// jest.spyOn(global, 'fetch').mockResolvedValue({
//     ok: true,
//     json: jest.fn().mockResolvedValue(mockPokemonData),
//   } as unknown as Response);

describe('PokedexComponent', () => {
  // beforeEach(() => {

  // });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  describe('rendering', () => {
    it('renders the pokedex', () => {
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const image = screen.getByTestId('pokedex');

      expect(image).toBeVisible();
    });

    it('renders the pokedex image', () => {
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const image = screen.getByTestId('pokedex-image');

      expect(image).toBeVisible();
    });

    it('renders the scan button', () => {
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.queryByTestId('scan-button');

      expect(button).toBeVisible();
    });
  });

  describe('Scan Button', () => {
    it('makes a fetch call if the data does not already exist in localstorage', async () => {
      const user = userEvent.setup();
      getItemSpy.mockReturnValue('');
      fetchMock();
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
    });

    it('does not make any fetch calls if the data is in local storage', async () => {
      const user = userEvent.setup();
      const existingData = [
        {
          entry_number: 1,
          name: 'bulbasaur',
          flavorText:
            'A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.',
          soundFile:
            'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        }
      ];
      getItemSpy.mockReturnValue(JSON.stringify(existingData));
      fetchMock();
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('it saves the pokemon object in local storage if it was not already saved', () => {
      // setItem spy
    });

    it('it retrieces the pokemon object from local storage if it was already saved', () => {
      // getItem spy
    });

    it('makes calls to get the sprite', () => {
      // irrespective of retrieving data or local storage it requests the .ogg and the sprite
    });

    it('makes calls to get the sound file', () => {
      // irrespective of retrieving data or local storage it requests the .ogg and the sprite
    });
  });
});
