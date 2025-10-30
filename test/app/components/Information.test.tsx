import Information from '@/src/app/components/Information';
import { render, screen } from '@testing-library/react';

describe('Information', () => {
  it('renders the information component', () => {
    render(<Information name="" />);

    const information = screen.queryByTestId('information');

    expect(information).toBeVisible();
  });

  it('displays the pokemon name', () => {
    render(<Information name="dineshraj" />);

    const information = screen.queryByTestId('information');

    expect(information).toHaveTextContent('dineshraj')

  })
});
