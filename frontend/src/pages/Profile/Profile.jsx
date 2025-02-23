import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; 
import "./Profile.css"; 

const Profile = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const { userId } = useParams(); 
    const navigate=useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const id = userId || "67b772913dfe49e00076dc2b"; 
                const response = await axios.get(`/api/user/${id}`);
                setUser(response.data);
            } catch (err) {
                console.error("Error fetching profile:", err.response ? err.response.data : err.message);
                setError("Failed to fetch profile");
            }
        };

        fetchProfile();
    }, [userId]); 
    const handleLogout = () => {
        localStorage.removeItem("token"); 
        navigate("/"); 
    };

    if (error) return <p className="error">{error}</p>;
    if (!user) return <p className="loading">Loading...</p>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <div className="profile-card">
                <p><strong>UserId:</strong>{user._id}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Balance:</strong> ${user.balance.toFixed(2)}</p>

                <h3>Portfolio</h3>
                {user.portfolio.length > 0 ? (
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>Stock Symbol</th>
                                <th>Quantity</th>
                                <th>Avg Buy Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.portfolio.map((stock) => (
                                <tr key={stock._id}>
                                    <td>{stock.symbol}</td>
                                    <td>{stock.quantity}</td>
                                    <td>${stock.avgBuyPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No stocks in portfolio</p>
                )}

                <h3>Transactions</h3>
                {user.transactions.length > 0 ? (
                    <table className="profile-table">
                        <thead>
                            <tr>
                                <th>Symbol</th>
                                <th>Type</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user.transactions.map((tx) => (
                                <tr key={tx._id}>
                                    <td>{tx.symbol}</td>
                                    <td>{tx.type}</td>
                                    <td>{tx.quantity}</td>
                                    <td>${tx.price.toFixed(2)}</td>
                                    <td>{new Date(tx.date).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No transactions found</p>
                )}
                 <button className="logout-button" onClick={handleLogout}>Logout</button>

            </div>
        </div>
    );
};

export default Profile;
