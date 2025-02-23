
const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const PortfolioSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  quantity: { type: Number, required: true },
  avgBuyPrice: { type: Number, required: true }
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: { type: Number, default: 10000 },
  portfolio: [PortfolioSchema],  // Correctly define array of objects
  transactions: [TransactionSchema] // Use schema for transactions
});

const PortfolioUser = mongoose.model('PortfolioUser', UserSchema);
module.exports = PortfolioUser;
