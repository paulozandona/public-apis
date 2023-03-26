import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders app title', () => {
  render(<App />);
  const titleElement = screen.getByText("API pubbliche");
  expect(titleElement).toBeInTheDocument();
});


test('Matches the snapshot', () => {
  const { view } = render(<App />);
  expect(view).toMatchSnapshot();
});
