import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
// import "./index.css";
import App from "./App";
import ContextProviders from "./Context/ContextProviders";

ReactDOM.render(
  <React.StrictMode>
    <ContextProviders>
      <Router>
        <App />
      </Router>
    </ContextProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
