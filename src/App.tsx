import React, { Suspense, useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

// Import contexts
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppProvider } from "./contexts/AppContext";

// Import routes
import { AppRoutes } from "./routes";

// Import error boundary
import { ErrorBoundary } from "./components/UI/ErrorBoundary";

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-400">
        Loading School Management System...
      </p>
    </div>
  </div>
);

// Error fallback component
const AppErrorFallback: React.FC<{ error: Error; resetError: () => void }> = ({
  error,
  resetError,
}) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 text-center">
      <div className="text-red-500 mb-4">
        <svg
          className="w-16 h-16 mx-auto"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      </div>
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        Application Error
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Something went wrong while loading the application.
      </p>

      {/* Error details */}
      <details className="text-left mb-6">
        <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400 mb-2">
          View Error Details
        </summary>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded p-3">
          <pre className="text-xs text-red-600 dark:text-red-400 overflow-auto max-h-32">
            {error.message}
          </pre>
        </div>
      </details>

      {/* Action buttons */}
      <div className="space-y-2">
        <button
          onClick={resetError}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={() => window.location.reload()}
          className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Reload Page
        </button>
      </div>

      {/* Environment info */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Environment: {import.meta.env.MODE} | Version:{" "}
          {import.meta.env.VITE_APP_VERSION || "1.0.0"}
        </p>
      </div>
    </div>
  </div>
);

// App initialization hook
const useAppInitialization = () => {
  const [initState, setInitState] = useState<{
    status: "loading" | "ready" | "error";
    error?: Error;
  }>({ status: "loading" });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Check environment variables
        const requiredEnvVars = ["VITE_API_URL"];
        const missingVars = requiredEnvVars.filter(
          (varName) => !import.meta.env[varName]
        );

        if (missingVars.length > 0) {
          throw new Error(
            `Missing required environment variables: ${missingVars.join(", ")}`
          );
        }

        // Test API connectivity (optional)
        const apiUrl = import.meta.env.VITE_API_URL;
        if (apiUrl) {
          try {
            // Simple connectivity test - don't fail if this doesn't work
            await fetch(`${apiUrl}/health`, {
              method: "GET",
              signal: AbortSignal.timeout(5000), // 5 second timeout
            });
          } catch (apiError) {
            // Log but don't fail initialization for API connectivity issues
            console.warn("API connectivity test failed:", apiError);
          }
        }

        // Simulate any other initialization tasks
        await new Promise((resolve) => setTimeout(resolve, 100));

        setInitState({ status: "ready" });
      } catch (error) {
        console.error("App initialization failed:", error);
        setInitState({
          status: "error",
          error:
            error instanceof Error
              ? error
              : new Error("Unknown initialization error"),
        });
      }
    };

    initializeApp();
  }, []);

  return initState;
};

// Main App component
const App: React.FC = () => {
  const initState = useAppInitialization();

  // Show loading during initialization
  if (initState.status === "loading") {
    return <LoadingSpinner />;
  }

  // Show error if initialization failed
  if (initState.status === "error" && initState.error) {
    return (
      <AppErrorFallback
        error={initState.error}
        resetError={() => window.location.reload()}
      />
    );
  }

  // Render the full application
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <AppProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                  <AppRoutes />
                </div>
              </Suspense>
            </AppProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

// Global error handlers
if (typeof window !== "undefined") {
  // Handle uncaught JavaScript errors
  window.addEventListener("error", (event) => {
    console.error("Global error:", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error,
    });
  });

  // Handle unhandled promise rejections
  window.addEventListener("unhandledrejection", (event) => {
    console.error("Unhandled promise rejection:", event.reason);
  });

  // Log environment info
  console.log("🚀 School Management System Starting...", {
    mode: import.meta.env.MODE,
    apiUrl: import.meta.env.VITE_API_URL,
    version: import.meta.env.VITE_APP_VERSION || "1.0.0",
  });
}

export default App;
