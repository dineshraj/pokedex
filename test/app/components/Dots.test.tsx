import Dots from '@/src/app/components/Dots';
import { render, screen } from '@testing-library/react';

describe('Dots', () => {
  it('renders the dots', () => {
    render(<Dots />);
    const dots = screen.getByTestId('dots');
    expect(dots).toBeVisible();
  });
});
