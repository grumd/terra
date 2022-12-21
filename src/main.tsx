import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // TODO: bring back strict mode later (removed it to make logging easier when debugging)
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
