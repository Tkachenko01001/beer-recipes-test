import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app/App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/beer-recipes-test">
    <App />
  </BrowserRouter>
);
