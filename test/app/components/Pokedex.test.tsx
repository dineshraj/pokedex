import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokedexComponent from '@/src/app/components/Pokedex';
import {
  LOCALSTORAGE_KEY,
  POKEMON_ERROR_MESSAGE,
  SPECIES_ERROR_MESSAGE
} from '@/src/app/constants';
import { LocalStorageDataModel, PokemonUpdated } from '@/src/app/types';
import { PokemonSpecies, PokemonSprites } from 'pokenode-ts';

jest.mock('../../../src/lib/pokemonNumber', () => {
  return () => 1;
});

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
  } as unknown as PokemonUpdated,
  sprites: {
    front_default: 'http://spriteurl.com'
  } as unknown as PokemonSprites
};

const fetchMockData = (fetchMockSpy: jest.SpyInstance) => {
  fetchMockSpy
    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(speciesData)
    })
    .mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(pokemonData)
    });
};

const userEventSetup = () => {
  return userEvent.setup({ delay: null });
};

describe('PokedexComponent', () => {
  let getItemSpy: jest.SpyInstance;
  let setItemSpy: jest.SpyInstance;
  let fetchMockSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    fetchMockSpy = jest.spyOn(window, 'fetch');
    consoleErrorSpy = jest.spyOn(console, 'error');
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
    jest.resetAllMocks();
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
  });

  describe('Scan Button', () => {
    it('renders the scan button', () => {
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.queryByTestId('scan-button');

      expect(button).toBeVisible();
    });

    it('makes a fetch call if any data does not already exist in localstorage', async () => {
      const user = userEventSetup();
      getItemSpy.mockReturnValueOnce(null);

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });

      expect(fetchMockSpy).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
    });

    it('makes a fetch call if the correct pokemon data does not already exist in localstorage', async () => {
      const user = userEventSetup();
      const existingData = [
        {
          entry_number: 13,
          name: 'weedle',
          flavorText: '',
          soundFile: '',
          sprite: 'http://spriteurl.com'
        }
      ];

      getItemSpy.mockReturnValueOnce(JSON.stringify(existingData));

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      expect(fetchMockSpy).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
      expect(getItemSpy).toHaveBeenCalled();
    });

    it('does not make any fetch calls if the data is in localstorage', async () => {
      const user = userEventSetup();
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
      getItemSpy.mockReturnValueOnce(JSON.stringify(existingData));
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });

      expect(fetchMockSpy).not.toHaveBeenCalled();
    });

    it('it saves the pokemon object in local storage if it was not already saved', async () => {
      const user = userEventSetup();
      getItemSpy.mockReturnValueOnce(null);

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const expectedLocalstorageData: LocalStorageDataModel = {
        entry_number: 1,
        name: 'Bulbasaur',
        flavorText: 'plant boy',
        soundFile: 'cry url',
        sprite: 'http://spriteurl.com'
      };

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
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
      const user = userEventSetup();
      const expectedLocalstorageData: LocalStorageDataModel[] = [
        {
          entry_number: 1,
          name: 'Bulbasaur',
          flavorText: 'plant boy',
          soundFile: 'cry url',
          sprite: 'http://spriteurl.com'
        }
      ];

      getItemSpy.mockReturnValueOnce(JSON.stringify(expectedLocalstorageData));

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      expect(getItemSpy).toHaveReturnedWith(
        JSON.stringify(expectedLocalstorageData)
      );
    });

    it('outputs an error if the pokemon species api call fails', async () => {
      const user = userEventSetup();

      getItemSpy.mockReturnValueOnce(null);
      fetchMockSpy.mockRejectedValueOnce(new Error(SPECIES_ERROR_MESSAGE));

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(SPECIES_ERROR_MESSAGE);
    });

    it('outputs an error if the pokemon api call fails', async () => {
      const user = userEventSetup();

      getItemSpy.mockReturnValueOnce(null);

      fetchMockSpy
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValueOnce(speciesData)
        })
        .mockRejectedValueOnce(new Error(POKEMON_ERROR_MESSAGE));

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      expect(consoleErrorSpy).toHaveBeenCalledWith(POKEMON_ERROR_MESSAGE);
    });

    it('waits 3 seconds before displaying the new pokemon', async () => {
      const user = userEventSetup();
      const expectedLocalstorageData: LocalStorageDataModel[] = [
        {
          entry_number: 1,
          name: 'Bulbasaur',
          flavorText: 'plant boy',
          soundFile: 'cry url',
          sprite: 'http://spriteurl.com'
        }
      ];

      getItemSpy.mockReturnValueOnce(JSON.stringify(expectedLocalstorageData));

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      let sprite;

      await act(async () => {
        await user.click(button);
        sprite = screen.queryByTestId('pokedex-screen-sprite');
        expect(sprite).not.toBeInTheDocument();
        jest.runAllTimers();
      });

      expect(sprite).not.toBeInTheDocument();
    });
  });

  describe('Pokedex Screen', () => {
    it('renders the pokedex screen component if there is a current pokemon set', async () => {
      const user = userEventSetup();

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      const pokedexScreen = await screen.findByTestId('pokedex-screen');

      expect(pokedexScreen).toBeVisible();
    });

    it('renders the pokedex screen image with the correct attributes', async () => {
      const user = userEventSetup();

      const expectedLocalstorageData: LocalStorageDataModel[] = [
        {
          entry_number: 1,
          name: 'Bulbasaur',
          flavorText: 'plant boy',
          soundFile: 'cry url',
          sprite: 'http://spriteurl.com'
        }
      ];

      getItemSpy.mockReturnValueOnce(JSON.stringify(expectedLocalstorageData));

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      const pokedexSprite = screen.queryByTestId('pokedex-screen-sprite');

      expect(pokedexSprite).toHaveAttribute('src');
      expect(pokedexSprite).toHaveAttribute('alt', 'Bulbasaur');
    });

    it('does not render the pokedex screen component if there is no pokemon set', async () => {
      const user = userEventSetup();

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const pokedexScreen = screen.queryByTestId('pokedex-screen');

      expect(pokedexScreen).toBeNull();
    });

    it('clears the screen when the scan button is clicked again', async () => {
      const user = userEventSetup();

      getItemSpy.mockReturnValueOnce(null);

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');

      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });

      let pokedexScreen = screen.queryByTestId('pokedex-screen-sprite');
      expect(pokedexScreen).toBeVisible();

      await user.click(button);
      pokedexScreen = screen.queryByTestId('pokedex-screen-sprite');
      expect(pokedexScreen).not.toBeInTheDocument();
    });
  });

  describe('Scan Light', () => {
    // beforeEach(() => {
    //   jest.runAllTimers();
    // });

    // afterEach(() => {
    //   jest.useRealTimers();
    // });

    it('renders the scan light', () => {
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const scanLight = screen.queryByTestId('scan-light');

      expect(scanLight).toBeVisible();
    });

    it('adds the blink class when the scan button as been clicked', async () => {
      const user = userEventSetup();
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      const scanLight = screen.queryByTestId('scan-light');
    });
  });

  describe('Information', () => {
    it('renders the information when the scan button is clicked', async () => {
      const user = userEventSetup();

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });
      const information = screen.queryByTestId('information');

      expect(information).toBeVisible();
    });

    it('does not render the inforamation before the scan button is clicked', () => {
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const information = screen.queryByTestId('information');

      expect(information).not.toBeInTheDocument();
    });

    it('displays the pokemon name only after the timeout has run', async () => {
      const user = userEventSetup();

      getItemSpy.mockReturnValueOnce(null);

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');

      await act(async () => {
        await user.click(button);
        jest.runAllTimers();
      });

      let pokedexScreen = screen.queryByTestId('information');
      expect(pokedexScreen).toBeVisible();

      await user.click(button);
      pokedexScreen = screen.queryByTestId('information');
      expect(pokedexScreen).not.toHaveTextContent('bulbasaur');
    });
  });

  describe.only('Dots', () => {
    it('renders the dots when the timer is running', async () => {
      const user = userEventSetup();

      getItemSpy.mockReturnValueOnce(null);

      fetchMockData(fetchMockSpy);

      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      const dots = screen.queryByTestId('dots');
      expect(dots).toBeVisible();
    });

    it('does not renders the dots when the timer is finished', () => {});
  });
});
