import React, { Suspense, useState, useEffect } from "react";

// Simple loading component
const LoadingSpinner = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
    }}
  >
    <div
      style={{
        padding: "20px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #007bff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          margin: "0 auto 10px",
        }}
      ></div>
      <div>Loading School Management System...</div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({
  error,
  resetError,
}: {
  error: Error;
  resetError: () => void;
}) => (
  <div
    style={{
      padding: "40px",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f8f9fa",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        maxWidth: "500px",
      }}
    >
      <h1 style={{ color: "#dc3545", marginBottom: "20px" }}>
        ⚠️ Application Error
      </h1>
      <p style={{ marginBottom: "20px", color: "#666" }}>
        Something went wrong while loading the application.
      </p>
      <details style={{ marginBottom: "20px", textAlign: "left" }}>
        <summary style={{ cursor: "pointer", marginBottom: "10px" }}>
          View Error Details
        </summary>
        <pre
          style={{
            backgroundColor: "#f8f9fa",
            padding: "10px",
            borderRadius: "4px",
            fontSize: "12px",
            overflow: "auto",
            maxHeight: "200px",
          }}
        >
          {error.message}
        </pre>
      </details>
      <button
        onClick={resetError}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Try Again
      </button>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "10px 20px",
          backgroundColor: "#6c757d",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Reload Page
      </button>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  {
    children: React.ReactNode;
    fallback: (error: Error, resetError: () => void) => React.ReactNode;
  },
  { hasError: boolean; error?: Error }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.resetError);
    }

    return this.props.children;
  }
}

// Main App component
function App() {
  const [appState, setAppState] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        // Check if required modules can be loaded
        await import("./contexts/ThemeContext");
        await import("./contexts/AuthContext");
        await import("./contexts/AppContext");
        await import("./routes");

        setAppState("ready");
      } catch (err) {
        console.error("Failed to initialize app:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown initialization error")
        );
        setAppState("error");
      }
    };

    initializeApp();
  }, []);

  if (appState === "loading") {
    return <LoadingSpinner />;
  }

  if (appState === "error" && error) {
    return (
      <ErrorFallback error={error} resetError={() => setAppState("loading")} />
    );
  }

  // Lazy load the main components
  const ThemeProvider = React.lazy(() =>
    import("./contexts/ThemeContext").then((m) => ({
      default: m.ThemeProvider,
    }))
  );
  const AuthProvider = React.lazy(() =>
    import("./contexts/AuthContext").then((m) => ({ default: m.AuthProvider }))
  );
  const AppProvider = React.lazy(() =>
    import("./contexts/AppContext").then((m) => ({ default: m.AppProvider }))
  );
  const AppRoutes = React.lazy(() =>
    import("./routes").then((m) => ({ default: m.AppRoutes }))
  );

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<LoadingSpinner />}>
        <ThemeProvider>
          <Suspense fallback={<LoadingSpinner />}>
            <AuthProvider>
              <Suspense fallback={<LoadingSpinner />}>
                <AppProvider>
                  <Suspense fallback={<LoadingSpinner />}>
                    <AppRoutes />
                  </Suspense>
                </AppProvider>
              </Suspense>
            </AuthProvider>
          </Suspense>
        </ThemeProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
