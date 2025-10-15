import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import TestApp from "./TestApp";

// Simple test version for debugging Netlify deployment
const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: Arial;">
      <h1>Error: Root element not found</h1>
      <p>The HTML template might be missing the root div.</p>
    </div>
  `;
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <TestApp />
      </StrictMode>
    );
  } catch (error) {
    console.error("Render error:", error);
    rootElement.innerHTML = `
      <div style="padding: 20px; color: red; font-family: Arial;">
        <h1>Render Error</h1>
        <p>Failed to render the React app.</p>
        <pre>${error instanceof Error ? error.message : String(error)}</pre>
      </div>
    `;
  }
}
