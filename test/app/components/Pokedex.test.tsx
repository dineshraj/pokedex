import PokedexComponent from '@/src/components/Pokedex';
import { render, screen } from '@testing-library/react';
import { Pokedex } from 'pokenode-ts';

// test that it returns an image

const mockPokedex = {} as Pokedex;

describe('PokedexComponent', () => {
  it('renders the pokedex', () => {
    render(<PokedexComponent pokedex={mockPokedex} />);

    const image = screen.getByTestId('pokedex-image');

    expect(image).toBeVisible();

  });
});
