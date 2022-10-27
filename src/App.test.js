import { render, screen } from '@testing-library/react';
import App from './App';

it('renders the default state as expected', () => {
  expect.assertions(5);

  // when rendering the app
  render(<App />);

  // then the heading is visible
  expect(screen.getByRole('heading', { name: 'CTA IP Data Fetch Tool'})).toBeInTheDocument();

  // and the IP input element is visible
  const ipInput = screen.getByLabelText('Enter an IP address:');
  expect(ipInput).toBeInTheDocument();

  // and the submit button is visible
  expect(screen.getByRole('button', { name: 'Fetch Data' })).toBeInTheDocument();

  // and the field selector is not visible
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

  // and the data display section is not visible
  expect(screen.queryByTestId('display-area')).not.toBeInTheDocument();
});

it.todo('allows user to enter IP address, fetch data, and select field as expected');

it.todo('handles a server error as expected');

it.todo('handles a 200 response with an error status field as expected');

it.todo('handles loading state as expected');

it.todo('validates IP address as expected');

it.todo('announces appearing elements to a11y screen readers as expected');


