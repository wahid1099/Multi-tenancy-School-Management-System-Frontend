import React, { useState, useEffect } from "react";

interface HealthStatus {
  status: "checking" | "healthy" | "unhealthy";
  api: boolean;
  frontend: boolean;
  timestamp: Date;
}

export const HealthCheck: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus>({
    status: "checking",
    api: false,
    frontend: true,
    timestamp: new Date(),
  });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        let apiHealthy = false;

        if (apiUrl) {
          try {
            const response = await fetch(`${apiUrl}/health`, {
              method: "GET",
              signal: AbortSignal.timeout(5000),
            });
            apiHealthy = response.ok;
          } catch {
            apiHealthy = false;
          }
        }

        setHealth({
          status: apiHealthy ? "healthy" : "unhealthy",
          api: apiHealthy,
          frontend: true,
          timestamp: new Date(),
        });
      } catch (error) {
        setHealth({
          status: "unhealthy",
          api: false,
          frontend: true,
          timestamp: new Date(),
        });
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-600";
      case "unhealthy":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
        return "✅";
      case "unhealthy":
        return "❌";
      default:
        return "⏳";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 text-xs border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-2">
        <span className={getStatusColor(health.status)}>
          {getStatusIcon(health.status)}
        </span>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          System Status
        </span>
      </div>
      <div className="mt-1 space-y-1">
        <div className="flex justify-between">
          <span className="text-gray-500">Frontend:</span>
          <span className="text-green-600">✅</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">API:</span>
          <span className={health.api ? "text-green-600" : "text-red-600"}>
            {health.api ? "✅" : "❌"}
          </span>
        </div>
        <div className="text-gray-400 text-xs">
          {health.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default HealthCheck;
