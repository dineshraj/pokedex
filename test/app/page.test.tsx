import '@testing-library/jest-dom';
import Home from '@/src/app/page';
import { render, screen } from '@testing-library/react';

describe('page', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders the home page', () => {
    render(<Home />);
    const appContainer = screen.queryByTestId('pokedex');

    expect(appContainer).toBeVisible();
  });


  // it('does not calls localstorage if the right key exists');
});
