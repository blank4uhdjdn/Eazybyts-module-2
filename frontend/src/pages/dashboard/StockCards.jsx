
import React, { useEffect, useState } from "react";
import axios from "axios";
import './StockCards.css'; 
import NoStockCard from "../../nostockcards/NoStockCard";


const StockCards = () => {
    const [stocks, setStocks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiLimitReached, setApiLimitReached] = useState(false);

    useEffect(() => {
        const fetchStockData = async () => {
            try {
                const response = await axios.get("/api/stockData");
                const validResults = response.data.validResults || [];

                
                const isApiLimitReached = validResults.every(stock =>
                    stock.data?.Information?.includes("Our standard API rate limit is 25 requests per day")
                );

                if (isApiLimitReached) {
                    setApiLimitReached(true);
                } else {
                    setStocks(validResults);
                }
            } catch (err) {
                if (err.response && err.response.status === 429) {
                    setApiLimitReached(true);
                } else {
                    setError("Failed to fetch stock data.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchStockData();
    }, []);

    if (loading) return <p>Loading stock data...</p>;
    if (error) return <p>{error}</p>;
    if (apiLimitReached) return <NoStockCard/>;

    return (
        <div className="stock-cards-container">
            {stocks.map((stock) => (
                <div key={stock.symbol} className="stock-card">
                    <h2>{stock.symbol}</h2>
                    <p>Last Refreshed: {stock.data["Meta Data"]?.["3. Last Refreshed"] || "N/A"}</p>
                    <p>Open: {stock.data["Time Series (5min)"] ? stock.data["Time Series (5min)"][Object.keys(stock.data["Time Series (5min)"])[0]]["1. open"] : "N/A"}</p>
                    <p>High: {stock.data["Time Series (5min)"] ? stock.data["Time Series (5min)"][Object.keys(stock.data["Time Series (5min)"])[0]]["2. high"] : "N/A"}</p>
                    <p>Low: {stock.data["Time Series (5min)"] ? stock.data["Time Series (5min)"][Object.keys(stock.data["Time Series (5min)"])[0]]["3. low"] : "N/A"}</p>
                    <p>Close: {stock.data["Time Series (5min)"] ? stock.data["Time Series (5min)"][Object.keys(stock.data["Time Series (5min)"])[0]]["4. close"] : "N/A"}</p>
                    <p>Volume: {stock.data["Time Series (5min)"] ? stock.data["Time Series (5min)"][Object.keys(stock.data["Time Series (5min)"])[0]]["5. volume"] : "N/A"}</p>
                </div>
            ))}
        </div>
    );
};

export default StockCards;
