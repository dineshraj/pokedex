import { render, screen } from '@testing-library/react';

import Screen from '@/src/app/components/Screen';

describe('Screen', () => {
  describe('rendering', () => {
    it('renders the pokedex component', () => {
      render(<Screen spriteUrl="/hi" name="" />);

      const screenComponent = screen.getByTestId('pokedex-screen');

      expect(screenComponent).toBeVisible();
    });

    it('renders a sprite with the correct url', () => {
      render(<Screen spriteUrl="/my-url" name="hi" />);

      const image = screen.getByTestId('pokedex-screen-sprite');

      expect(image).toHaveAttribute('src');
    });

    it('has an alt attribute with the pokemon name', () => {
      render(<Screen spriteUrl="/hi" name="charmander" />);

      const image = screen.getByTestId('pokedex-screen-sprite');

      expect(image).toHaveAttribute('alt', 'charmander');
    });
  });
});
