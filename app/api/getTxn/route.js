// /pages/api/getTxn/route.js

import axios from 'axios';

export default async function handler(req, res) {
  const { txnHash, to } = req.query;
  console.log(txnHash);
  console.log(to);
  const apiKey = 'process.env.Api_Key'; // Replace with your actual API key

  try {
    let response;
    if (txnHash) {
      console.log(txnHash);
      response = await axios.get(`https://sepolia-api.voyager.online/beta/txns/${txnHash}`, {
        headers: {
          'accept': 'application/json',
          'x-api-key': apiKey,
        },
      });
    } else if (to) {
      console.log(to);
      response = await axios.get(`https://sepolia-api.voyager.online/beta/txns`, {
        headers: {
          'accept': 'application/json',
          'x-api-key': apiKey,
        },
        params: {
          to: to,
        },
      });
    } else {
      throw new Error('Either txnHash or to address must be provided');
    }

    res.status(200).json(response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.error || error.message;
    res.status(500).json({ error: errorMessage });
  }
}
