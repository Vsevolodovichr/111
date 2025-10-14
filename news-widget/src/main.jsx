import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import NewsSection from './components/NewsSection';
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('news-root')).render(
  <React.StrictMode>
    <NewsSection />
  </React.StrictMode>
);

