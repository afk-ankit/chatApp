import React from "react";
import ReactDOM from "react-dom/client";
import "./Css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import StateProvider from "./App/StateProvider";
import { BrowserRouter } from "react-router-dom";
import ChatProvider from "./App/ChatProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StateProvider>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </StateProvider>
  </React.StrictMode>
);

reportWebVitals();
