import React from "react";

export const DebugApp: React.FC = () => {
  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333" }}>Debug App - Testing Netlify Deployment</h1>
      <p>If you can see this, the basic React app is working.</p>
      <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <h2>Environment Variables:</h2>
        <ul>
          <li>API URL: {import.meta.env.VITE_API_URL || "Not set"}</li>
          <li>App Name: {import.meta.env.VITE_APP_NAME || "Not set"}</li>
          <li>Mode: {import.meta.env.MODE}</li>
          <li>Dev: {import.meta.env.DEV ? "true" : "false"}</li>
        </ul>
      </div>
      <div
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "5px",
          marginTop: "20px",
        }}
      >
        <h2>Browser Info:</h2>
        <ul>
          <li>User Agent: {navigator.userAgent}</li>
          <li>URL: {window.location.href}</li>
        </ul>
      </div>
    </div>
  );
};
