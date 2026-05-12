import { render, screen } from '@testing-library/react';
import App from './App';

test('renders editor', () => {
  render(<App />);
  expect(
    screen.getByText(/Video Editor/i)
  ).toBeInTheDocument();
});