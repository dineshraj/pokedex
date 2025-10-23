import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokedexComponent from '@/src/app/components/Pokedex';
import {
  LOCALSTORAGE_KEY,
  POKEMON_ERROR_MESSAGE,
  SPECIES_ERROR_MESSAGE
} from '@/src/app/constants';
import { LocalStorageDataModel } from '@/src/app/types';
import { PokemonCries, PokemonSpecies, PokemonSprites } from 'pokenode-ts';

// what you get when you call https://pokeapi.co/api/v2/pokedex/2
// even though we are not for now
const mockPokedex = [
  {
    entry_number: 1,
    pokemon_species: {
      name: 'Bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
    }
  },
  {
    entry_number: 2,
    pokemon_species: {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon-species/2/'
    }
  }
];

jest.mock('../../../src/lib/pokemonNumber', () => {
  return jest.fn().mockReturnValue(1);
});

// what is needed when calling https://pokeapi.co/api/v2/pokemon-species/1/
const speciesData = {
  flavor_text_entries: [{ flavor_text: 'plant boy' }],
  varieties: [
    {
      pokemon: {
        url: 'https://pokeapi.co/api/v2/pokemon/1/'
      }
    }
  ]
} as unknown as PokemonSpecies;

// what is needed when calling https://pokeapi.co/api/v2/pokemon/1/
const pokemonData = {
  cries: {
    latest: 'cry url'
  } as unknown as PokemonCries,
  sprites: {
    front_default: 'sprite url'
  } as unknown as PokemonSprites
};

describe('PokedexComponent', () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;
  let fetchMockSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    fetchMockSpy = jest.spyOn(window, 'fetch');
    consoleErrorSpy = jest.spyOn(console, 'error');
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // jest.resetAllMocks();
  });

  describe('rendering', () => {
    it('renders the pokedex component', () => {
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
    it('makes a fetch call if any data does not already exist in localstorage', async () => {
      const user = userEvent.setup();
      getItemSpy.mockReturnValueOnce(null);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(fetchMockSpy).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
    });

    it('makes a fetch call if the correct pokemon data does not already exist in localstorage', async () => {
      const user = userEvent.setup();
      
      const existingData = [
        {
          entry_number: 13,
          name: 'weedle',
          cries: {
            latest: ''
          },
          flavorText:
            '',
          soundFile:
            '',
          sprite:
            ''
        }
      ];
      getItemSpy.mockReturnValueOnce(JSON.stringify(existingData));
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(fetchMockSpy).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
      expect(getItemSpy).toHaveBeenCalled();
    });

    it('does not make any fetch calls if the data is in localstorage', async () => {
      const user = userEvent.setup();
      const existingData = [
        {
          entry_number: 1,
          name: 'bulbasaur',
          cries: {
            latest: ''
          },
          flavorText:
            'A strange seed was planted on its back at birth.The plant sprouts and grows with this POKéMON.',
          soundFile:
            'https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/1.ogg',
          sprite:
            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png'
        }
      ];
      getItemSpy.mockReturnValueOnce(JSON.stringify(existingData));
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(fetchMockSpy).not.toHaveBeenCalled();
    });

    it('it saves the pokemon object in local storage if it was not already saved', async () => {
      const user = userEvent.setup();
      getItemSpy.mockReturnValueOnce(null);

      fetchMockSpy
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(speciesData)
        })
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(pokemonData)
        });

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const expectedLocalstorageData: LocalStorageDataModel = {
        entry_number: 1,
        name: 'Bulbasaur',
        flavorText: 'plant boy',
        soundFile: 'cry url',
        sprite: 'sprite url'
      };

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(fetchMockSpy).toHaveBeenCalledTimes(2);
      expect(fetchMockSpy).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
      expect(fetchMockSpy).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon/1/'
      );

      expect(setItemSpy).toHaveBeenCalledWith(
        LOCALSTORAGE_KEY,
        JSON.stringify([expectedLocalstorageData])
      );
    });

    it('it retrieves the pokemon object from local storage if it was already saved', async () => {
      const user = userEvent.setup();
      const expectedLocalstorageData: LocalStorageDataModel[] = [
        {
          entry_number: 1,
          name: 'Bulbasaur',
          flavorText: 'plant boy',
          soundFile: 'cry url',
          sprite: 'sprite url'
        }
      ];

      getItemSpy.mockReturnValueOnce(JSON.stringify(expectedLocalstorageData));

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(getItemSpy).toHaveReturnedWith(
        JSON.stringify(expectedLocalstorageData)
      );
    });

    it('outputs an error if the pokemon species api call fails', async () => {
      const user = userEvent.setup();
      getItemSpy.mockReturnValueOnce(null);
      fetchMockSpy.mockRejectedValue(new Error(SPECIES_ERROR_MESSAGE));

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(consoleErrorSpy).toHaveBeenCalledWith(SPECIES_ERROR_MESSAGE);
    });

    it('outputs an error if the pokemon api call fails', async () => {
      const user = userEvent.setup();
      console.log('species data', speciesData);

      getItemSpy.mockReturnValueOnce(JSON.stringify([{}]));
      fetchMockSpy.mockRejectedValueOnce(new Error(POKEMON_ERROR_MESSAGE));

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(consoleErrorSpy).toHaveBeenCalledWith(POKEMON_ERROR_MESSAGE);
    });
  });
});
