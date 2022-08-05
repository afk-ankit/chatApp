import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StateProvider from "./App/StateProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <StateProvider>
      <App />
    </StateProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

reportWebVitals();
