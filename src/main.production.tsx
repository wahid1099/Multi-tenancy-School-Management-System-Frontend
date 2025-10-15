import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.production";
import "./index.css";

// Global error handlers
window.addEventListener("error", (event) => {
  console.error("Global error:", event.error);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
      <h1>🚨 Critical Error</h1>
      <p>Root element not found in HTML template.</p>
      <p>Please check that index.html contains: &lt;div id="root"&gt;&lt;/div&gt;</p>
    </div>
  `;
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error("Failed to render app:", error);
    rootElement.innerHTML = `
      <div style="padding: 40px; font-family: Arial, sans-serif; text-align: center; background-color: #f8f9fa; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px;">
          <h1 style="color: #dc3545; margin-bottom: 20px;">🚨 Render Error</h1>
          <p style="margin-bottom: 20px;">Failed to render the React application.</p>
          <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 4px; text-align: left; overflow: auto; font-size: 12px;">${
            error instanceof Error ? error.message : String(error)
          }</pre>
          <button onclick="window.location.reload()" style="padding: 10px 20px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 15px;">
            Reload Page
          </button>
        </div>
      </div>
    `;
  }
}
