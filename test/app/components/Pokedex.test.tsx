
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PokedexComponent from '@/src/app/components/Pokedex';

const mockPokedex = [
  {
    entry_number: '1',
    name: 'Bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
  }
];

const mockPokemonData = {
  flavor_text_entries: 'plant boy', // from { flavor_text_entries[0] } from https://pokeapi.co/api/v2/pokemon-species/1/
  cry: 'someone with downs syndrome', // from { cries: { latest: "url" } { from "https://pokeapi.co/api/v2/pokemon/1/",
  sprite: 'url' // from { sprites: { front_default: "url" } } from https://pokeapi.co/api/v2/pokemon/1
};

// jest.mock('../../../src/lib/pokemonNumber', () => {
//   return jest.fn().mockReturnValue(1);
// });

const fetchMock = () => {
  jest.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(mockPokedex),
  } as unknown as Response);
};


// const fetchMock = global.fetch = jest.fn().mockResolvedValue({
//   ok: true,
//   json: jest.fn().mockResolvedValue(mockPokemonData)
// } as unknown as Response);

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
    it('retrieves a pokemon object from the data provided', async () => {
      const user = userEvent.setup();
      fetchMock();
      render(<PokedexComponent kantoPokedex={mockPokedex} />);

      const button = screen.getByTestId('scan-button');
      await user.click(button);

      expect(global.fetch).toHaveBeenCalledWith(
        'https://pokeapi.co/api/v2/pokemon-species/1/'
      );
    });
  });
});
