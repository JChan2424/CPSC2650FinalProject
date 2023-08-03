import { createRoot } from 'react-dom/client';
import React from 'react';

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../views/css/united.min.css";

import App from './App.js';
import Login from './Login';
import Register from './Register';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Body from './body';

/*
useEffect(() => {
    const token = localStorage.getItem("token");
    const isPublicRoute = (path: string) => {
      const publicRoutesRegex = [
        /^\/$/,
        /^\/auth\/login$/,
        /^\/standings$/,
        /^\/home$/,
        /^\/404$/,
        /^\/gallery$/,
        /^\/about$/,
        /^\/contact$/,
        /^\/competitions$/,
        /^\/contact-us$/,
        /^\/register$/,
        /^\/filled$/,
        /^\/competitions\/open$/,
        /^\/competitions\/tournaments$/,
      ];

      return publicRoutesRegex.some((regex) => regex.test(path));
    };

    const isPrivateRoute = (path: string) => {
      const privateRoutesRegex = [
        /^\/dashboard$/,
        /^\/members$/,
        /^\/members\/create$/,
        /^\/members\/update\/\d+$/,
        /^\/memberships$/,
        /^\/memberships\/create$/,
        /^\/memberships\/update\/\d+$/,
        /^\/events$/,
        /^\/events\/update\/\d+$/,
        /^\/events\/create$/,
        /^\/events\/create-category$/,
        /^\/transactions\/\d+$/,
        /^\/users$/,
        /^\/users\/update\/\d+$/,
        /^\/users\/create$/,
        /^\/teams$/,
        /^\/teams\/update\/\d+$/,
        /^\/teams\/members$/,
        /^\/teams\/members\/update\/\d+$/,
        /^\/matches$/,
        /^\/matches\/match\/\d+$/,
        /^\/matches\/create\/result$/,
        /^\/matches\/create\/score$/,
        /^\/events\/categories$/,
        /^\/events\/categories\/update\/\d+$/,
        /^\/events\/upcoming$/,
        /^\/events\/upcoming\/\d+$/,
        /^\/user\/profile\/\d+$/,
        /^\/announcements$/,
        /^\/dashboard\/inquiry\/\d+$/,

        // Logged in member routes
        /^\/member\/events$/,
      ];

      return privateRoutesRegex.some((regex) => regex.test(path));
    };

    if (isPublicRoute(location.pathname)) {
      // Public route, do nothing
    } else if (isPrivateRoute(location.pathname)) {
      if (!token) {
        showNotification({
          title: "Error",
          message: "You are not authorized to view this page.",
          color: "red",
          icon: <IconExclamationMark />,
          autoClose: true,
        });
        navigate("/auth/login");
        setAuthenticated(false);
        localStorage.clear();
      }
    } else {
      // If the route is not found in publicRoutes or privateRoutes, redirect to 404
      navigate("/404");
    }
  }, [location]);
*/

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