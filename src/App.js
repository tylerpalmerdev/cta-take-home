import './App.css';

function App() {
  return (
    <main className="main-content">
      <h1>CTA IP Data Fetch Tool</h1>
      <form>
        <label htmlFor="ipAddressInput">Enter an IP address:</label>
        <input id="ipAddressInput" placeholder="0.0.0.0" />
        <button>Fetch Data</button>
      </form>
    </main>
  );
}

export default App;
