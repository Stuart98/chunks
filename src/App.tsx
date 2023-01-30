import { Provider } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import './App.css';

import store from './state/store';
import Layout from './layouts/Layout';

function App() {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            
            <Route path="*" element={<Layout />} />

          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
