import React from "react";
import { DebugApp } from "./components/DebugApp";

function App() {
  try {
    return <DebugApp />;
  } catch (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        <h1>Error in App:</h1>
        <pre>{error instanceof Error ? error.message : String(error)}</pre>
      </div>
    );
  }
}

export default App;
