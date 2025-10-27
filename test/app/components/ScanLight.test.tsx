import ScanLight from "@/src/app/components/ScanLight";
import { screen } from "@testing-library/dom"
import { render } from "@testing-library/react";

describe('ScanLight', () => {
  it('renders the scan light', () => {
    render(<ScanLight />)

    const scanLight = screen.queryByTestId('scan-light');

    expect(scanLight).toBeVisible()
  })
})