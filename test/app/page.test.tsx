import '@testing-library/jest-dom';
import Home from '@/src/app/page';
import { render, screen } from '@testing-library/react';

describe('page', () => {
  it('renders the home page', () => {
    render(<Home pokedex={''} />);
    screen.debug();
    const appContainer = screen.queryByTestId('pokedex');

    expect(appContainer).toBeVisible();
  });
});
