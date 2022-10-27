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
    try {
      const endpoint = `${BASE_API_ENDPOINT}${ipAddress}`;
      const response = await fetch(endpoint);
      const data = await response.json();

      setResponseData(data);
      setResponseFields(Object.keys(data));
    } catch (err) {
      setFetchError(err);
    }
  }

  return (
    <main className="main-content">
      <h1>CTA IP Data Fetch Tool</h1>
      <form onSubmit={preventDefault}>
        <label htmlFor="ipAddressInput">Enter an IP address:</label>
        <input onChange={onChangeIpAddress} value={ipAddress} type="text" id="ipAddressInput" placeholder="0.0.0.0" />
        <button onClick={fetchIpData}>Fetch Data</button>
      </form>
      {responseFields && 
        <div>
          <label htmlFor="fieldSelector">Select a field to display:</label>
          <select id="fieldSelector" value={selectedField} onChange={onChangeSelectedField}>
            <option value="" disabled hidden>Select a field</option>
            {responseFields.map(responseField =>
              <option key={responseField} value={responseField}>{responseField}</option>
            )}
          </select>
        </div>
      }
      {(selectedField && responseData) &&
        <section data-testid="display-area">
          <h3>Your data for {selectedField}:</h3>
          <span>{responseData[selectedField]}</span>
        </section>
      }
    </main>
  );
}

export default App;
