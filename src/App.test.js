import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

afterEach(() => {
  // cleanup any fetch mocks
  // @todo: cleanup
  if (typeof fetch.mockClear === 'function') {
    fetch.mockClear();
  }
});

it('renders the default state as expected', () => {
  expect.assertions(6);

  // when rendering the app
  render(<App />);

  // then the heading is visible
  expect(screen.getByRole('heading', { name: 'CTA IP Data Fetch Tool' })).toBeInTheDocument();

  // and the IP input element is visible
  const ipInput = screen.getByLabelText('Enter an IP address:');
  expect(ipInput).toBeInTheDocument();
  expect(ipInput).toHaveAttribute('type', 'text');

  // and the submit button is visible
  expect(screen.getByRole('button', { name: 'Fetch Data' })).toBeInTheDocument();

  // and the field selector is not visible
  expect(screen.queryByRole('combobox')).not.toBeInTheDocument();

  // and the data display section is not visible
  expect(screen.queryByTestId('display-area')).not.toBeInTheDocument();
});

it('allows user to enter IP address, fetch data, and select field as expected', async() => {
  expect.assertions(9);

  // mock & spy on the global fetch object
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ field1: 'value1', field2: 'value2', field3: 'value3' })
    })
  );

  const testIp = '123.45.67.89';

  // when rendering the app
  render(<App />);

  // and the user enters an IP address
  const ipInput = screen.getByLabelText('Enter an IP address:');
  await fireEvent.change(ipInput, { target: { value: testIp }});
  // then the input's value updates
  expect(ipInput).toHaveValue(testIp);

  // when the user clicks 'Fetch Data'
  await fireEvent.click(screen.getByRole('button', { name: 'Fetch Data' }));

  await waitFor(() => {
    // then a new dropdown is rendered
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  // and the keys from the response object are rendered as options in a dropdown
  expect(screen.getAllByRole('option')).toHaveLength(3);
  
  // and fetch has been called correctly
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(`http://ip-api.com/json/${testIp}`);

  // when user selects an option from the dropdown
  await userEvent.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: 'field1' }));

  // that field is rendered in the display area
  expect(screen.getByRole('heading', { name: 'Your data for field1:' })).toBeInTheDocument();
  expect(screen.getByText(/value1/)).toBeInTheDocument();

  // when user selects another option from the dropdown
  await userEvent.selectOptions(screen.getByRole('combobox'), screen.getByRole('option', { name: 'field2' }));

  // that new field is rendered in the display area
  expect(screen.getByRole('heading', { name: 'Your data for field2:' })).toBeInTheDocument();
  expect(screen.getByText(/value2/)).toBeInTheDocument();
});

it.todo('handles a server error as expected');

it.todo('handles a 200 response with an error status field as expected');

it.todo('handles loading state as expected');

it.todo('validates IP address as expected');

it.todo('announces appearing elements to a11y screen readers as expected');


