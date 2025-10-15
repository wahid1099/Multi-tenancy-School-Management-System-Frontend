import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Environment validation
const validateEnvironment = () => {
  const requiredVars = ["VITE_API_URL"];
  const missing = requiredVars.filter((varName) => !import.meta.env[varName]);

  if (missing.length > 0) {
    console.warn("Missing environment variables:", missing);
  }

  // Log environment info in development
  if (import.meta.env.DEV) {
    console.log("🔧 Development Environment:", {
      mode: import.meta.env.MODE,
      apiUrl: import.meta.env.VITE_API_URL,
      appName: import.meta.env.VITE_APP_NAME,
      version: import.meta.env.VITE_APP_VERSION,
    });
  }
};

// Initialize error handling
const initializeErrorHandling = () => {
  // Global error handler
  window.addEventListener("error", (event) => {
    console.error("🚨 Global Error:", {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
      error: event.error,
    });
  });

  // Unhandled promise rejection handler
  window.addEventListener("unhandledrejection", (event) => {
    console.error("🚨 Unhandled Promise Rejection:", event.reason);
  });
};

// Main initialization function
const initializeApp = () => {
  try {
    // Validate environment
    validateEnvironment();

    // Initialize error handling
    initializeErrorHandling();

    // Get root element
    const rootElement = document.getElementById("root");

    if (!rootElement) {
      throw new Error(
        'Root element not found. Make sure index.html contains <div id="root"></div>'
      );
    }

    // Create React root and render app
    const root = createRoot(rootElement);

    root.render(
      <StrictMode>
        <App />
      </StrictMode>
    );

    // Log successful initialization
    console.log("✅ School Management System initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize application:", error);

    // Fallback error display
    const rootElement = document.getElementById("root") || document.body;
    rootElement.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 20px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background-color: #f8f9fa;
      ">
        <div style="
          max-width: 500px;
          width: 100%;
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 40px;
          text-align: center;
        ">
          <div style="
            width: 64px;
            height: 64px;
            background-color: #dc3545;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
            color: white;
            font-size: 24px;
          ">⚠️</div>
          
          <h1 style="
            color: #212529;
            margin-bottom: 16px;
            font-size: 24px;
            font-weight: 600;
          ">Application Error</h1>
          
          <p style="
            color: #6c757d;
            margin-bottom: 24px;
            line-height: 1.5;
          ">
            Failed to initialize the School Management System. 
            Please check the console for detailed error information.
          </p>
          
          <details style="
            text-align: left;
            margin-bottom: 24px;
            padding: 16px;
            background-color: #f8f9fa;
            border-radius: 4px;
            border: 1px solid #dee2e6;
          ">
            <summary style="
              cursor: pointer;
              font-weight: 500;
              margin-bottom: 8px;
            ">Error Details</summary>
            <pre style="
              font-size: 12px;
              color: #dc3545;
              white-space: pre-wrap;
              word-break: break-word;
              margin: 0;
            ">${error instanceof Error ? error.message : String(error)}</pre>
          </details>
          
          <button 
            onclick="window.location.reload()" 
            style="
              background-color: #007bff;
              color: white;
              border: none;
              padding: 12px 24px;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
              transition: background-color 0.2s;
            "
            onmouseover="this.style.backgroundColor='#0056b3'"
            onmouseout="this.style.backgroundColor='#007bff'"
          >
            Reload Application
          </button>
          
          <div style="
            margin-top: 24px;
            padding-top: 16px;
            border-top: 1px solid #dee2e6;
            font-size: 12px;
            color: #6c757d;
          ">
            Environment: ${import.meta.env.MODE} | 
            Version: ${import.meta.env.VITE_APP_VERSION || "1.0.0"}
          </div>
        </div>
      </div>
    `;
  }
};

// Initialize the application
initializeApp();
