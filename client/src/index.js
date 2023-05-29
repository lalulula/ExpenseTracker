import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import router from "./routes";
import store from "./store/index.js";
import { initializeApp } from "firebase/app";

const root = ReactDOM.createRoot(document.getElementById("root"));
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlwPPVcNxzKusgbN5SM8C1rzHX0K4Kmm0",
  authDomain: "expensetracker-66751.firebaseapp.com",
  projectId: "expensetracker-66751",
  storageBucket: "expensetracker-66751.appspot.com",
  messagingSenderId: "29768128962",
  appId: "1:29768128962:web:d2e61cd321165968441e5b",
};

// Initialize Firebase
initializeApp(firebaseConfig);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
