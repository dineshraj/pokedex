import '@testing-library/jest-dom';
import { GameClient } from 'pokenode-ts';
import { render, screen } from '@testing-library/react';
import { POKEDEX } from '../../src/app/constants';

import Page from '@/src/app/page';

describe('Page', () => {
  let fakeApi: GameClient;

  beforeEach(() => {
    fakeApi = {
      getPokedexById: jest.fn().mockResolvedValue({ id: POKEDEX })
    } as unknown as GameClient;
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetModules();
  });

  it('renders the home page', async () => {
    const home = await Page({});

    render(home);
    const appContainer = screen.queryByTestId('pokedex');
    expect(appContainer).toBeVisible();
  });

  it('calls the pokenode api with the right value', async () => {
    const expectedParam = 2;

    const home = await Page({ api: fakeApi });
    render(home);

    expect(fakeApi.getPokedexById).toHaveBeenCalledWith(expectedParam);
  });
});
