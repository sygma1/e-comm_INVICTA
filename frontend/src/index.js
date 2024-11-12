import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'; // Ensure the casing matches the file name
import AuthProvider from './context/AuthProvider'; // Import AuthProvider correctly

ReactDOM.render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
