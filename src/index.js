import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import App from "./App";
import { UIProvider } from "./Context/UIContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <UIProvider>
          <App />
        </UIProvider>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
