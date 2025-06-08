import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
if (process.env.NODE_ENV === 'development') {
    const originalWarn = console.warn;
    console.warn = (...args) => {
        if (typeof args[0] === 'string' &&
            args[0].includes('React Router Future Flag Warning')) {
            return; // ignore it
        }
        originalWarn(...args);
    };
}

root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
