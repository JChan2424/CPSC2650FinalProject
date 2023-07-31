import { createRoot } from 'react-dom/client';
import React from 'react';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../views/css/united.min.css";

import App from './App.js';

const root = createRoot(document.getElementById('react-container'));
root.render(<App />)
console.log('render')