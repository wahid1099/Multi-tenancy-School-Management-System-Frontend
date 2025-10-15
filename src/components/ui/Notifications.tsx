import React, { useEffect } from "react";
import { X, CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

export const Notifications: React.FC = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Auto-remove notifications after 5 seconds
    const timers = state.notifications.map((notification) =>
      setTimeout(() => {
        dispatch({ type: "REMOVE_NOTIFICATION", payload: notification.id });
      }, 5000)
    );

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [state.notifications, dispatch]);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800";
      case "error":
        return "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800";
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
      default:
        return "bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800";
    }
  };

  if (state.notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {state.notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            flex items-start space-x-3 p-4 rounded-lg border shadow-lg transition-all duration-300 ease-in-out
            ${getBgColor(notification.type)}
          `}
        >
          {getIcon(notification.type)}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {notification.message}
            </p>
          </div>
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE_NOTIFICATION",
                payload: notification.id,
              })
            }
            className="flex-shrink-0 p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
};
