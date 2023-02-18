// REACT
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';

// STATE
import store from '@/app/store';

// COMPONENTS
import Layout from '@/layouts/Layout';

// CSS
import '@/app/App.css';

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
