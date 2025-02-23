import React, { useState } from 'react';
import axios from 'axios';
import './BuyStock.css'; 

const BuyStock = () => {
    const [userId, setUserId] = useState('');
    const [symbol, setSymbol] = useState('');
    const [quantity, setQuantity] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleBuyStock = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!userId || !symbol || !quantity) {
            setError('Please fill in all fields');
            return;
        }

        if (isNaN(quantity) || quantity <= 0) {
            setError('Quantity must be a positive number');
            return;
        }

        try {
            const response = await axios.post('/api/stock/buy', {
                userId,
                symbol,
                quantity: Number(quantity),
            });
            setSuccess(response.data.message);
            console.log(response.data);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error);
            } else {
                setError('Internal server error');
            }
        }
    };

    return (
        <div className="container">
            <div className="buy-stock-card">
                <h2 className="buy-stock-title">Buy Stock</h2>
                <form onSubmit={handleBuyStock} className="space-y-4">
                    <div className="form-group">
                        <label htmlFor="userId" className="label">User  ID:</label>
                        <input
                            type="text"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="symbol" className="label">Stock Symbol:</label>
                        <input
                            type="text"
                            id="symbol"
                            value={symbol}
                            onChange={(e) => setSymbol(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quantity" className="label">Quantity:</label>
                        <input
                            type="number"
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            className="input"
                        />
                    </div>
                    <button
                        type="submit"
                        className="button"
                    >
                        Buy Stock
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </div>
        </div>
    );
};

export default BuyStock;