"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [toAddress, setToAddress] = useState('');
  const [txnData, setTxnData] = useState(null);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [modalContent, setModalContent] = useState(null); // State to hold modal content
  const apiKey = 'fNqNAyThtG6kZStO3WdH5RLANALQBpK7hkg570l3';

  useEffect(() => {
    fetchTransactionsByAddress();
  }, []);

  const fetchTransactionsByAddress = async () => {
    try {
      if (!toAddress) {
        throw new Error('Voyager do not provide token transfers/balances endpoints yet.');
      }

      const response = await axios.get(`https://sepolia-api.voyager.online/beta/txns`, {
        headers: {
          'accept': 'application/json',
          'x-api-key': apiKey,
        },
        params: {
          to: toAddress,
        },
      });

      setTxnData(response.data);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      setTxnData(null);
    }
  };

  const fetchTransactionByHash = async (hash) => {
    try {
      const response = await axios.get(`https://sepolia-api.voyager.online/beta/txns/${hash}`, {
        headers: {
          'accept': 'application/json',
          'x-api-key': apiKey,
        },
      });

      setModalContent(response.data); // Store response data in modalContent state
      setModalOpen(true); // Open the modal
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      setModalContent(null);
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Close the modal
    setModalContent(null); // Clear modal content
  };

  return (
    <div className="container">
      <h1>Fetch Transaction Data</h1>
      <div>
        <input
          type="text"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
          placeholder="Enter Starknet address"
          className="inputField"
        />
        <button onClick={fetchTransactionsByAddress} className="button">
          Fetch Transactions by Address
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {txnData && (
        <div className="dataContainer">
          <h2>Transactions:</h2>
          {Array.isArray(txnData.items) && txnData.items.map((item, index) => (
            <div key={index}>
              <p>
                Hash: 
                <button
                  className="linkButton"
                  onClick={() => fetchTransactionByHash(item.hash)} 
                >
                  {item.hash}
                </button>
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
      {modalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Transaction Details</h2>
            <pre>{JSON.stringify(modalContent, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
