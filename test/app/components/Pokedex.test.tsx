import { Pokedex } from '../../../src/app/components/Pokedex';

import { render, screen } from '@testing-library/react';
import PokedexComponent from '@/src/app/components/Pokedex';

const mockPokedex = [
  {
    name: '',
    url: ''
  }
];

describe('PokedexComponent', () => {
  it('renders the pokedex', () => {
    render(<PokedexComponent pokedex={mockPokedex} />);

    const image = screen.getByTestId('pokedex');

    expect(image).toBeVisible();
  });

  it('renders the pokedex image', () => {
    render(<PokedexComponent pokedex={mockPokedex} />);

    const image = screen.getByTestId('pokedex-image');

    expect(image).toBeVisible();
  });

  it('renders the scan button', () => {
    render(<PokedexComponent pokedex={mockPokedex} />);

    const button = screen.queryByTestId('scan-button');

    expect(button).toBeVisible();
  });
});
