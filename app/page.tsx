import React from 'react';
import mockData from './mockData'; // Importing mock data instead of Supabase client

const App = () => {
    const data = mockData; // Use mock data instead of fetching from Supabase

    return (
        <div>
            <h1>My App</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default App;