

import React from 'react';
import './NoStockCard.css'; 

const NoStockCard = () => {
    return (
        <div className="no-stock-card">
            <h2 className="no-stock-title">Limit Reached</h2>
            <p className="no-stock-message">You have reached the limit for stock data requests. Please try again later.</p>
        </div>
    );
}

export default NoStockCard;