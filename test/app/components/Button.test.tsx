import Button from "@/src/components/Button";
import { render, screen } from "@testing-library/react";

describe('Button', () => {
  it('renders the button', () => {
    render(<Button />)
    const button = screen.getByTestId('button')
    expect(button).toBeVisible();
  });
});
