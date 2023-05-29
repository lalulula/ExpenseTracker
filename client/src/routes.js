import React, { useEffect } from "react";
import "./index.css";
import App from "./pages/App";
import Login from "./pages/Login";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Register from "./pages/Register";
import CheckAuth from "./utils/CheckAuth";
import IfGuest from "./utils/IfGuest";
import Cookies from "js-cookie";
const token = Cookies.get("token");
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json",
    credentials: "include",
    Authorization: `Bearer ${token}`,
  },
};

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: (
          <CheckAuth>
            <Home />
          </CheckAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <IfGuest>
            <Login defaultHeaders={defaultHeaders} />
          </IfGuest>
        ),
      },
      {
        path: "/register",
        element: (
          <IfGuest>
            <Register defaultHeaders={defaultHeaders} />
          </IfGuest>
        ),
      },
      {
        path: "/category",
        element: (
          <CheckAuth>
            <Category defaultHeaders={defaultHeaders} />
          </CheckAuth>
        ),
      },
    ],
  },
]);
export default router;
