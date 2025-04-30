//Where the applications starts. First components (App.js) are rendered here.

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// Rendering component
// connects the react app to the static html structure (index.html)
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  // helps to show problems during development
  <React.StrictMode>
    <App />
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
