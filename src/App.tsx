// REACT
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// STATE
import store from '@/state/store';

// COMPONENTS
import Layout from '@/layouts/Layout';

// CSS
import '@/App.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
