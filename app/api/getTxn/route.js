import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const txnHash = searchParams.get('txnHash');
  const apiKey = 'fNqNAyThtG6kZStO3WdH5RLANALQBpK7hkg570l3'; // Access API key from environment variable

  if (!txnHash) {
    return new Response(JSON.stringify({ error: 'Transaction hash is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await axios.get(`https://sepolia-api.voyager.online/beta/txns/${txnHash}`, {
      headers: {
        'accept': 'application/json',
        'x-api-key': apiKey // Use API key from environment variable
      }
    });
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
