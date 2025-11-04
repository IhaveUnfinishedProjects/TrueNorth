import App from "./App.js";
import './index.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Router>
    <App />
  </Router>
);
