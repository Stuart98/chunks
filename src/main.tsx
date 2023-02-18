// REACT
import React from 'react';
import ReactDOM from 'react-dom/client';

// COMPONENTS
import App from '@/app/App';

// CSS
import '@/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
