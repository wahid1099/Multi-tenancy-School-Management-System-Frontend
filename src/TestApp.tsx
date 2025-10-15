import React from "react";

function TestApp() {
  return (
    <div
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          🎉 Netlify Deployment Test - SUCCESS!
        </h1>

        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "#666" }}>Environment Check:</h2>
          <ul style={{ lineHeight: "1.6" }}>
            <li>
              <strong>API URL:</strong>{" "}
              {import.meta.env.VITE_API_URL || "Not configured"}
            </li>
            <li>
              <strong>App Name:</strong>{" "}
              {import.meta.env.VITE_APP_NAME || "Not configured"}
            </li>
            <li>
              <strong>Mode:</strong> {import.meta.env.MODE}
            </li>
            <li>
              <strong>Production:</strong> {import.meta.env.PROD ? "Yes" : "No"}
            </li>
          </ul>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ color: "#666" }}>Browser Info:</h2>
          <ul style={{ lineHeight: "1.6" }}>
            <li>
              <strong>URL:</strong> {window.location.href}
            </li>
            <li>
              <strong>User Agent:</strong>{" "}
              {navigator.userAgent.substring(0, 100)}...
            </li>
          </ul>
        </div>

        <div
          style={{
            backgroundColor: "#e8f5e8",
            padding: "15px",
            borderRadius: "4px",
            border: "1px solid #4caf50",
          }}
        >
          <p style={{ margin: 0, color: "#2e7d32" }}>
            ✅ If you can see this page, your Netlify deployment is working
            correctly!
          </p>
        </div>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => {
              console.log("Test button clicked");
              alert("JavaScript is working!");
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Test JavaScript
          </button>
        </div>
      </div>
    </div>
  );
}

export default TestApp;
