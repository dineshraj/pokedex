import '@testing-library/jest-dom';
import { Pokedex } from 'pokenode-ts';

import { render, screen } from '@testing-library/react';
import PokedexComponent from '@/src/components/Pokedex';

const mockPokedex = {} as unknown as Pokedex;

describe('PokedexComponent', () => {
  it('renders the pokedex', async () => {
    render(<PokedexComponent pokedex={mockPokedex} />);

    const image = screen.getByTestId('pokedex-image');

    expect(image).toBeVisible();
  });
});
