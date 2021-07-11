import { render, screen } from '@testing-library/react';
import Rewards from './Rewards';

test('renders table head text', () => {
  render(<Rewards />);
  const tableHead = screen.getByText(/Customer Name/i);
  expect(tableHead).toBeInTheDocument();
});
