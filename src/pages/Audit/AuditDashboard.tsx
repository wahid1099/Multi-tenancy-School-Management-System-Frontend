import React, { useState, useEffect } from "react";
import {
  Activity,
  Shield,
  AlertTriangle,
  Download,
  Calendar,
  Filter,
  RefreshCw,
  Eye,
  Search,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Table } from "../../components/UI/Table";
import { Modal } from "../../components/UI/Modal";
import { RoleBasedComponent } from "../../components/RoleBasedComponent";
import { AuditLog, AuditFilters } from "../../types";
import { getRoleDisplayName, getRoleColor } from "../../utils/roleUtils";
import { apiService } from "../../services/api";

interface AuditStats {
  totalEvents: number;
  eventsByAction: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  recentCriticalEvents: AuditLog[];
  topActors: Array<{ actor: any; count: number }>;
}

export const AuditDashboard: React.FC = () => {
  const { user } = useAuth();
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [stats, setStats] = useState<AuditStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [filters, setFilters] = useState<AuditFilters>({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
    endDate: new Date(),
    action: "",
    resource: "",
    severity: "",
    page: 1,
    limit: 25,
  });

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 25,
    total: 0,
    pages: 0,
  });

  useEffect(() => {
    fetchAuditLogs();
    fetchAuditStats();
  }, [filters]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.startDate)
        queryParams.append("startDate", filters.startDate.toISOString());
      if (filters.endDate)
        queryParams.append("endDate", filters.endDate.toISOString());
      if (filters.action) queryParams.append("action", filters.action);
      if (filters.resource) queryParams.append("resource", filters.resource);
      if (filters.severity) queryParams.append("severity", filters.severity);
      queryParams.append("page", filters.page?.toString() || "1");
      queryParams.append("limit", filters.limit?.toString() || "25");

      const response = await apiService.get(
        `/audit/logs?${queryParams.toString()}`
      );
      setAuditLogs(response.data.entries);
      setPagination(response.data.pagination);
    } catch (err) {
      setError("Failed to fetch audit logs");
      console.error("Error fetching audit logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditStats = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.startDate)
        queryParams.append("startDate", filters.startDate.toISOString());
      if (filters.endDate)
        queryParams.append("endDate", filters.endDate.toISOString());

      const response = await apiService.get(
        `/audit/stats?${queryParams.toString()}`
      );
      setStats(response.data);
    } catch (err) {
      console.error("Error fetching audit stats:", err);
    }
  };

  const handleFilterChange = (key: keyof AuditFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value,
    }));
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const queryParams = new URLSearchParams();

      if (filters.startDate)
        queryParams.append("startDate", filters.startDate.toISOString());
      if (filters.endDate)
        queryParams.append("endDate", filters.endDate.toISOString());
      if (filters.action) queryParams.append("action", filters.action);
      if (filters.resource) queryParams.append("resource", filters.resource);
      if (filters.severity) queryParams.append("severity", filters.severity);

      const response = await apiService.get(
        `/audit/export?${queryParams.toString()}`,
        {
          responseType: "blob",
        }
      );

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `audit-logs-${new Date().toISOString().split("T")[0]}.csv`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Failed to export audit logs");
      console.error("Error exporting audit logs:", err);
    } finally {
      setExporting(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      medium:
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      high: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      critical: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const getActionColor = (action: string) => {
    const colors = {
      create_user:
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      update_role:
        "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      delete_user: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      permission_denied:
        "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      login:
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      logout: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
    };
    return (
      colors[action as keyof typeof colors] ||
      "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    );
  };

  const columns = [
    {
      key: "timestamp",
      label: "Time",
      render: (log: AuditLog) => (
        <div className="text-sm">
          <p className="text-gray-900 dark:text-white">
            {new Date(log.timestamp).toLocaleDateString()}
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date(log.timestamp).toLocaleTimeString()}
          </p>
        </div>
      ),
    },
    {
      key: "actor",
      label: "Actor",
      render: (log: AuditLog) => (
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-medium">
              {log.actor?.firstName?.charAt(0) || "?"}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {log.actor
                ? `${log.actor.firstName} ${log.actor.lastName}`
                : "Unknown"}
            </p>
            {log.actor?.role && (
              <span
                className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${getRoleColor(
                  log.actor.role
                )}`}
              >
                {getRoleDisplayName(log.actor.role)}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (log: AuditLog) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getActionColor(
            log.action
          )}`}
        >
          {log.action.replace(/_/g, " ").toUpperCase()}
        </span>
      ),
    },
    {
      key: "target",
      label: "Target",
      render: (log: AuditLog) => (
        <div className="text-sm">
          {log.target ? (
            <>
              <p className="text-gray-900 dark:text-white">
                {log.target.firstName} {log.target.lastName}
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                {log.target.email}
              </p>
            </>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">N/A</span>
          )}
        </div>
      ),
    },
    {
      key: "resource",
      label: "Resource",
      render: (log: AuditLog) => (
        <span className="text-sm text-gray-900 dark:text-white capitalize">
          {log.resource || "N/A"}
        </span>
      ),
    },
    {
      key: "severity",
      label: "Severity",
      render: (log: AuditLog) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
            log.severity
          )}`}
        >
          {log.severity.toUpperCase()}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (log: AuditLog) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedLog(log);
            setShowDetailsModal(true);
          }}
        >
          <Eye className="w-4 h-4" />
        </Button>
      ),
    },
  ];

  const actionOptions = [
    { value: "", label: "All Actions" },
    { value: "create_user", label: "Create User" },
    { value: "update_role", label: "Update Role" },
    { value: "delete_user", label: "Delete User" },
    { value: "permission_denied", label: "Permission Denied" },
    { value: "login", label: "Login" },
    { value: "logout", label: "Logout" },
  ];

  const resourceOptions = [
    { value: "", label: "All Resources" },
    { value: "user", label: "User" },
    { value: "role", label: "Role" },
    { value: "permission", label: "Permission" },
    { value: "auth", label: "Authentication" },
    { value: "system", label: "System" },
  ];

  const severityOptions = [
    { value: "", label: "All Severities" },
    { value: "low", label: "Low" },
    { value: "medium", label: "Medium" },
    { value: "high", label: "High" },
    { value: "critical", label: "Critical" },
  ];

  return (
    <RoleBasedComponent
      requiredRoles={["super_admin", "manager", "admin", "tenant_admin"]}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Activity className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Audit Dashboard
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor security events and user activities
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={fetchAuditLogs}
              disabled={loading}
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <RoleBasedComponent requiredRoles={["super_admin", "manager"]}>
              <Button
                variant="outline"
                onClick={handleExport}
                disabled={exporting}
              >
                <Download className="w-4 h-4 mr-2" />
                {exporting ? "Exporting..." : "Export"}
              </Button>
            </RoleBasedComponent>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Events
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.totalEvents.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Critical Events
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.eventsBySeverity.critical || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <Shield className="w-8 h-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Permission Denied
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stats.eventsByAction.permission_denied || 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    User Actions
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(stats.eventsByAction.create_user || 0) +
                      (stats.eventsByAction.update_role || 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <Input
              type="date"
              label="Start Date"
              value={filters.startDate?.toISOString().split("T")[0] || ""}
              onChange={(e) =>
                handleFilterChange("startDate", new Date(e.target.value))
              }
            />
            <Input
              type="date"
              label="End Date"
              value={filters.endDate?.toISOString().split("T")[0] || ""}
              onChange={(e) =>
                handleFilterChange("endDate", new Date(e.target.value))
              }
            />
            <Select
              label="Action"
              options={actionOptions}
              value={filters.action || ""}
              onChange={(e) => handleFilterChange("action", e.target.value)}
            />
            <Select
              label="Resource"
              options={resourceOptions}
              value={filters.resource || ""}
              onChange={(e) => handleFilterChange("resource", e.target.value)}
            />
            <Select
              label="Severity"
              options={severityOptions}
              value={filters.severity || ""}
              onChange={(e) => handleFilterChange("severity", e.target.value)}
            />
            <Select
              label="Per Page"
              options={[
                { value: "25", label: "25 per page" },
                { value: "50", label: "50 per page" },
                { value: "100", label: "100 per page" },
              ]}
              value={filters.limit?.toString() || "25"}
              onChange={(e) =>
                handleFilterChange("limit", parseInt(e.target.value))
              }
            />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4 mb-6">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Audit Logs Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <Table
            columns={columns}
            data={auditLogs}
            loading={loading}
            emptyMessage="No audit logs found"
          />

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total
                  )}{" "}
                  of {pagination.total} results
                </p>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleFilterChange("page", pagination.page - 1)
                    }
                    disabled={pagination.page <= 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      handleFilterChange("page", pagination.page + 1)
                    }
                    disabled={pagination.page >= pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Audit Log Details Modal */}
        <Modal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          title="Audit Log Details"
        >
          {selectedLog && (
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Timestamp
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {new Date(selectedLog.timestamp).toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Actor
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedLog.actor
                      ? `${selectedLog.actor.firstName} ${selectedLog.actor.lastName} (${selectedLog.actor.email})`
                      : "Unknown"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Action
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedLog.action.replace(/_/g, " ").toUpperCase()}
                  </p>
                </div>

                {selectedLog.target && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Target
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedLog.target.firstName}{" "}
                      {selectedLog.target.lastName} ({selectedLog.target.email})
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Resource
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white">
                    {selectedLog.resource || "N/A"}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Severity
                  </label>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                      selectedLog.severity
                    )}`}
                  >
                    {selectedLog.severity.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Details
                  </label>
                  <pre className="text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-md overflow-auto">
                    {JSON.stringify(selectedLog.details, null, 2)}
                  </pre>
                </div>

                {selectedLog.ipAddress && (
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      IP Address
                    </label>
                    <p className="text-sm text-gray-900 dark:text-white">
                      {selectedLog.ipAddress}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </RoleBasedComponent>
  );
};
