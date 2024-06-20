// /app/home/page.js
'use client';

import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [txnHash, setTxnHash] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchTransaction = async () => {
    try {
      const response = await axios.get(`/api/getTxn`, {
        params: { txnHash }
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      setData(null);
    }
  };

  return (
    <div className="container">
      <h1>Fetch Transaction Data</h1>
      <input
        type="text"
        value={txnHash}
        onChange={(e) => setTxnHash(e.target.value)}
        placeholder="Enter transaction hash"
        className="inputField"
      />
      <button onClick={fetchTransaction} className="button">
        Fetch Transaction
      </button>
      {error && <p className="error">{error}</p>}
      {data && (
        <div className="dataContainer">
          <h2>Transaction Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Home;
