const express = require('express');
const Web3 = require('web3');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Conexión a la blockchain
const web3 = new Web3(new Web3.providers.HttpProvider('http://18.118.78.102:8545'));

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/blockchainExplorer', { useNewUrlParser: true, useUnifiedTopology: true });

const BlockSchema = new mongoose.Schema({
  number: Number,
  hash: String,
  transactions: Array,
  // Otros campos según sea necesario
});

const Block = mongoose.model('Block', BlockSchema);

// Rutas
app.get('/block/:number', async (req, res) => {
  const blockNumber = req.params.number;
  try {
    const block = await web3.eth.getBlock(blockNumber);
    res.json(block);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
