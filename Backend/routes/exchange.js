import express from 'express';
import axios from 'axios';
import auth from '../middleware/auth.js';
import Exchange from '../models/Exchange.js';

const router = express.Router();

// Map crypto symbols to CoinGecko IDs
const coinGeckoMap = {
  ETH: 'ethereum',
  USDT: 'tether',
  BTC: 'bitcoin',
  BNB: 'binancecoin',
  MATIC: 'matic-network',
  SOL: 'solana',
  XRP: 'ripple',
  ADA: 'cardano',
  DOGE: 'dogecoin',
  DOT: 'polkadot',
  // Add more as needed
};

router.post('/', auth, async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  if (from === to) {
    return res.status(400).json({ error: 'From and To cannot be the same' });
  }

  const fromId = coinGeckoMap[from.toUpperCase()];
  const toSymbol = to.toLowerCase();

  if (!fromId) {
    return res.status(400).json({ error: `Unsupported currency: ${from}` });
  }

  try {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${fromId}&vs_currencies=${toSymbol}`;
    const response = await axios.get(url);

    const rate = response.data[fromId]?.[toSymbol];

    if (!rate) {
      return res.status(400).json({ error: 'Invalid currency pair or unsupported' });
    }

    const result = (parseFloat(amount) * rate).toFixed(4);

    // Save the transaction in MongoDB
    await Exchange.create({
      user: req.user,
      from,
      to,
      amount,
      result,
    });

    res.json({ convertedAmount: result });
  } catch (error) {
    console.error('CoinGecko API error:', error.message);
    res.status(500).json({ error: 'Failed to fetch rate from CoinGecko' });
  }
});

export default router;
