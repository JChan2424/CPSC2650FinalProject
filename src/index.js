import { createRoot } from 'react-dom/client';
import React from 'react';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../views/css/united.min.css";

import App from './App.js';
import Login from './Login';
import Register from './Register';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Body from './body';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/announcements",
                element: <Body />
            }

        ]
    },
]);

const root = createRoot(document.getElementById('react-container'));
root.render(<RouterProvider router={router}/>)
console.log('render')