import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './statistics.css';

function Statistics() {
    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        // Make an API request to your server to fetch statistics from MongoDB
        axios.get('/api/statistics') // Replace with your actual API endpoint
            .then((response) => {
                setStatistics(response.data);
            })
            .catch((error) => {
                console.error('Error fetching statistics:', error);
            });
    }, []);

    return (
        <div className="statistics-container">
            <h1>Statistics</h1>
            {statistics ? (
                <div className="statistics-content">
                    <p>Total Users: {statistics.totalUsers}</p>
                    <p>Total Orders: {statistics.totalOrders}</p>
                    {/* Add more statistics as needed */}
                </div>
            ) : (
                <p>Loading statistics...</p>
            )}
        </div>
    );
}

export default Statistics;
