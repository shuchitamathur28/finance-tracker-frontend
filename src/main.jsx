import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
// import AuthProvider from "./hooks/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <CookiesProvider>
          {/* <AuthProvider> */}
            <App />
          {/* </AuthProvider> */}
      </CookiesProvider>
    </BrowserRouter>
  </React.StrictMode>
);