// main.jsx
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename="/Book_My_Show_Clone">
    <App />
  </BrowserRouter>
);
