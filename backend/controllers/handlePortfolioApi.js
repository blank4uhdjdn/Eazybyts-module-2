
const PortfolioUser = require("../model/portfolioModel");
const StockUser = require("../model/userModel");
const axios = require("axios");
const mongoose = require("mongoose");

const handlePortfolio = async (req, res) => {
    try {
        const { userId, symbol, quantity } = req.body;
        const API_KEY = process.env.API_KEY;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        let user = await StockUser.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const stockData = await axios.get(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
        );

        if (!stockData.data["Global Quote"]) {
            return res.status(400).json({ error: "Stock not found" });
        }

        const price = parseFloat(stockData.data["Global Quote"]["05. price"]);
        const cost = price * quantity;

        let portfolioUser = await PortfolioUser.findOne({ _id: userId });

        if (!portfolioUser) {
            portfolioUser = new PortfolioUser({
                _id: userId,
                name: user.name,
                email: user.email,
                balance: 10000, // Initial balance
                portfolio: [],
                transactions: []
            });
        }

        if (portfolioUser.balance < cost) {
            return res.status(400).json({ error: "Insufficient balance" });
        }

        let stock = portfolioUser.portfolio.find((s) => s.symbol === symbol);
        if (stock) {
            stock.avgBuyPrice = (stock.avgBuyPrice * stock.quantity + cost) / (stock.quantity + quantity);
            stock.quantity += quantity;
        } else {
            portfolioUser.portfolio.push({ symbol, quantity, avgBuyPrice: price });
        }

        portfolioUser.balance -= cost;

        portfolioUser.transactions.push({
            symbol,
            type: "buy",
            quantity: Number(quantity), 
            price: Number(price),
            date: new Date()
        });

        await portfolioUser.save();

        res.json({ message: "Stock purchased successfully", portfolioUser });

    } catch (error) {
        console.error("Error in handlePortfolio method:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { handlePortfolio };


