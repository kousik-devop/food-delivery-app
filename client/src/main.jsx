import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './axiosConfig';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalProvider.jsx';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </BrowserRouter>
)
