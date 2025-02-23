const express = require("express");
const axios = require("axios");

const handleStockApi = async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            return res.status(500).json({ error: "API key is missing. Please set API_KEY in environment variables." });
        }

        const stockSymbols = ["AAPL", "GOOGL", "MSFT", "AMZN", "TSLA", "FB", "NFLX"];

        const requests = stockSymbols.map((symbol) => {
            const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
            return axios.get(url)
                .then((response) => ({
                    symbol,
                    data: response.data,
                    error: response.data["Error Message"] ? response.data["Error Message"] : null
                }))
                .catch((error) => ({
                    symbol,
                    data: null,
                    error: error.message
                }));
        });

        const results = await Promise.all(requests);

        const validResults = results.filter((result) => !result.error);
        const invalidResults = results.filter((result) => result.error);

        if (validResults.length === 0) {
            return res.status(404).json({ error: "No valid stock data found." });
        }

        res.json({ validResults, invalidResults });
    } catch (error) {
        console.error("Error fetching stock data:", error.message);
        res.status(500).json({ error: "Internal server error while fetching stock data." });
    }
};

module.exports = handleStockApi;
