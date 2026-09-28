import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
// Tailwind first, so the app's own colour classes (App.css) win over its resets
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthProvider.jsx";

async function start() {
  // Demo builds (the live demo on maxblaschek.com) run the API in the browser
  if (import.meta.env.VITE_DEMO === "true") {
    const { startDemo } = await import("./demo/browser.js");
    await startDemo();
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <AuthProvider>
        {/* BASE_URL is / normally, and /demos/y/ in the portfolio demo */}
        <Router basename={import.meta.env.BASE_URL}>
          <App />
        </Router>
      </AuthProvider>
    </React.StrictMode>
  );
}

start();
