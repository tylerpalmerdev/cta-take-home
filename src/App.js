import { useState } from 'react';
import './App.css';

function App() {
  const BASE_API_ENDPOINT = 'http://ip-api.com/json/';

  const [ipAddress, setIpAddress] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [responseFields, setResponseFields] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [selectedField, setSelectedField] = useState('');

  const preventDefault = event => event.preventDefault();
  
  const onChangeIpAddress = event => {
    preventDefault(event);

    const { target: { value }} = event;
    setIpAddress(value);
  };

  const onChangeSelectedField = event => {
    preventDefault(event);

    const { target: { value }} = event;
    setSelectedField(value);
  };

  async function fetchIpData() {
    // reset all state
    setResponseData(null);
    setResponseFields(null);
    setSelectedField('');
    setFetchError(null);

    try {
      const endpoint = `${BASE_API_ENDPOINT}${ipAddress}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.status === 'fail') {
        throw new Error('IP address is malformed');
      }

      setResponseData(data);
      setResponseFields(Object.keys(data));
    } catch (err) {
      setFetchError(err);
    }
  }

  return (
    <main className="main-content">
      <h1 className="page-heading">CTA IP Data Fetch Tool</h1>
      <form className="ip-form" onSubmit={preventDefault}>
        <label htmlFor="ipAddressInput">Enter an IP address:</label>
        <input className="ip-form__input" onChange={onChangeIpAddress} value={ipAddress} type="text" id="ipAddressInput" placeholder="0.0.0.0" />
        <button className="ip-form__button" onClick={fetchIpData}>Fetch Data</button>
      </form>
      {fetchError && <h3 className="error-message">An error has occurred</h3>}
      {(responseFields && !fetchError) &&
        <>
          <label htmlFor="fieldSelector">Select a field to display:</label>
          <select className="field-selector" id="fieldSelector" value={selectedField} onChange={onChangeSelectedField}>
            <option value="" disabled hidden>Select a field</option>
            {responseFields.map(responseField =>
              <option key={responseField} value={responseField}>{responseField}</option>
            )}
          </select>
          {selectedField &&
            <section className="display-area" data-testid="display-area">
              <h3>Your data for {selectedField}:</h3>
              <span>{responseData[selectedField]}</span>
            </section>
          }
        </>
      }
    </main>
  );
}

export default App;
