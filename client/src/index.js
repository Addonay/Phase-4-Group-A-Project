import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';
import { createRoot } from 'react-dom/client'; 

const root = document.getElementById('root');
const rootElement = createRoot(root);

rootElement.render(
  <Router>
    <App />
  </Router>
);
