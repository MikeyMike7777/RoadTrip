import React from 'react';

require('dotenv').config();

export default function HomePage() {
    return (
        <div className = "body">
            <h1 className = "header">Road Trip</h1>
            <div className = "column">
                <div>
                    <h4>Welcome to Road Tripr!</h4>
                </div>
                <div>
                    {" "}
                    <a href="/login">
                        <button className = "button">Login</button>
                    </a>
                </div>
                <div>
                    <h4>Don't have an account? Make one today!</h4>
                </div>
                <div>
                    {" "}
                    <a href="/registration">
                        <button className = "button">Register</button>
                    </a>
                </div>
                <div>
                    <h4>Look for existing trips!</h4>
                </div>
                <div>
                    {" "}
                    <a href="/searchTrips">
                        <button className = "button">Search Trips</button>
                    </a>
                </div>
            </div>
        </div>
    )
}