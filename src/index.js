import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  UserCustomProvider from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserCustomProvider>
    <App />
  </UserCustomProvider>
);
