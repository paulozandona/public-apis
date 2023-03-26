import { render, screen, fireEvent } from '@testing-library/react';
import Search from './Search';

test('Checks if input field is active', async () => {
  render(    <Search
    id="searchByTitleField"
    disabled={false}
    label="Ricerca"
    hideLabel={false}
    onObjectSelected={(item) => item}
    theme="dark"
  />);
  const inputNode = screen.getByPlaceholderText('Ricerca');
  expect(inputNode).toBeInTheDocument();
  fireEvent.change(inputNode, {target: {value: 'test'}});
  expect(inputNode.value).toBe('test');
});


test("Matches the snapshot", () => {
  const { view } = render(
    <Search
      id="searchByTitleField"
      disabled={false}
      label="Ricerca"
      hideLabel={false}
      onObjectSelected={(item) => item}
      theme="dark"
    />
  );
  expect(view).toMatchSnapshot();
});
