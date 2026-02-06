import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";  
import "./index.css";

if (typeof window !== "undefined") {
  const scheduleIdle =
    window.requestIdleCallback ||
    function (cb) {
      return setTimeout(cb, 1500);
    };
  scheduleIdle(() => {
    import("./lib/analytics")
      .then(({ initAnalytics }) => initAnalytics())
      .catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
