import { createRoot } from "react-dom/client";
import React from "react";

import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "../views/css/united.min.css";

import routes from "../controllers/routes.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(routes);

const root = createRoot(document.getElementById("react-container"));
root.render(<RouterProvider router={router} />);
