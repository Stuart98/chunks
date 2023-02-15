// REACT
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

// STATE
import store from '@/state/store';
import { makeFolderActive, makeChunkActive } from './state/reducers/activeSlice';

// COMPONENTS
import Layout from '@/layouts/Layout';

// CSS
import '@/App.css';
import { useAppDispatch } from './state/hooks';

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
