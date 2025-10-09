// import { GameClient } from 'pokenode-ts';
import { render, screen } from '@testing-library/react';
// import { POKEDEX } from '../../src/app/constants';

import Page from '@/src/app/page';

describe('Page', () => {
  // let fakeApi: GameClient;

  beforeEach(() => {
    //   fakeApi = {
    //     getPokedexById: jest.fn().mockResolvedValue({ id: POKEDEX })
    //   } as unknown as GameClient;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('renders the main page', () => {
    const home = Page();

    render(home);
    const appContainer = screen.queryByTestId('page');
    expect(appContainer).toBeVisible();
  });

});
