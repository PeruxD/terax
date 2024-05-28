import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [blockNumber, setBlockNumber] = useState('');
  const [blockData, setBlockData] = useState(null);

  const fetchBlockData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/block/${blockNumber}`);
      setBlockData(response.data);
    } catch (error) {
      console.error('Error fetching block data:', error);
    }
  };

  return (
    <div>
      <h1>Blockchain Explorer</h1>
      <input
        type="text"
        value={blockNumber}
        onChange={(e) => setBlockNumber(e.target.value)}
        placeholder="Enter block number"
      />
      <button onClick={fetchBlockData}>Fetch Block</button>
      {blockData && (
        <div>
          <h2>Block {blockData.number}</h2>
          <pre>{JSON.stringify(blockData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
