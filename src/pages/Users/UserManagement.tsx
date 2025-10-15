import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  UserPlus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Eye,
  RefreshCw,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Table } from "../../components/UI/Table";
import { Modal } from "../../components/UI/Modal";
import { RoleBasedComponent } from "../../components/RoleBasedComponent";
import { User, UserRole } from "../../types";
import {
  getRoleDisplayName,
  getRoleColor,
  hasRequiredRole,
  canCreateRole,
} from "../../utils/roleUtils";
import { apiService } from "../../services/api";

interface UserFilters {
  search: string;
  role: UserRole | "";
  isActive: boolean | "";
  page: number;
  limit: number;
}

export const UserManagement: React.FC = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [newRole, setNewRole] = useState<UserRole>("student");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  });

  const [filters, setFilters] = useState<UserFilters>({
    search: "",
    role: "",
    isActive: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      if (filters.search) queryParams.append("search", filters.search);
      if (filters.role) queryParams.append("role", filters.role);
      if (filters.isActive !== "")
        queryParams.append("isActive", filters.isActive.toString());
      queryParams.append("page", filters.page.toString());
      queryParams.append("limit", filters.limit.toString());

      const response = await apiService.get(`/users?${queryParams.toString()}`);
      setUsers(response.data);
      setPagination(
        response.pagination || {
          page: filters.page,
          limit: filters.limit,
          total: response.data.length,
          pages: 1,
        }
      );
    } catch (err) {
      setError("Failed to fetch users");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof UserFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: key !== "page" ? 1 : value, // Reset to page 1 when changing filters
    }));
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      await apiService.delete(`/users/${selectedUser._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUser._id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (err) {
      setError("Failed to delete user");
      console.error("Error deleting user:", err);
    }
  };

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      const response = await apiService.patch(
        `/users/${selectedUser._id}/role`,
        {
          role: newRole,
        }
      );

      setUsers((prev) =>
        prev.map((u) =>
          u._id === selectedUser._id ? { ...u, role: newRole } : u
        )
      );

      setShowRoleModal(false);
      setSelectedUser(null);
    } catch (err) {
      setError("Failed to update user role");
      console.error("Error updating role:", err);
    }
  };

  const canManageUser = (user: User): boolean => {
    if (!currentUser) return false;

    // Super admin can manage everyone
    if (currentUser.role === "super_admin") return true;

    // Users can't manage users with higher or equal roles
    return hasRequiredRole(currentUser, user.role);
  };

  const getAvailableRoles = (): UserRole[] => {
    if (!currentUser) return [];

    const allRoles: UserRole[] = [
      "super_admin",
      "manager",
      "admin",
      "tenant_admin",
      "teacher",
      "student",
      "parent",
    ];

    return allRoles.filter((role) => canCreateRole(currentUser.role, role));
  };

  const columns = [
    {
      key: "name",
      label: "Name",
      render: (user: User) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.firstName.charAt(0)}
              {user.lastName.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user.email}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "role",
      label: "Role",
      render: (user: User) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(
            user.role
          )}`}
        >
          {getRoleDisplayName(user.role)}
        </span>
      ),
    },
    {
      key: "tenant",
      label: "Tenant",
      render: (user: User) => (
        <span className="text-sm text-gray-900 dark:text-white">
          {user.tenant}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (user: User) => (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            user.isActive
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "lastLogin",
      label: "Last Login",
      render: (user: User) => (
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user.lastLogin
            ? new Date(user.lastLogin).toLocaleDateString()
            : "Never"}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (user: User) => (
        <div className="flex items-center space-x-2">
          <RoleBasedComponent
            requiredRoles={["super_admin", "manager", "admin", "tenant_admin"]}
          >
            {canManageUser(user) && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setNewRole(user.role);
                    setShowRoleModal(true);
                  }}
                >
                  <Shield className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowDeleteModal(true);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </>
            )}
          </RoleBasedComponent>
        </div>
      ),
    },
  ];

  const roleOptions = [
    { value: "", label: "All Roles" },
    { value: "super_admin", label: "Super Administrator" },
    { value: "manager", label: "Manager" },
    { value: "admin", label: "Administrator" },
    { value: "tenant_admin", label: "School Administrator" },
    { value: "teacher", label: "Teacher" },
    { value: "student", label: "Student" },
    { value: "parent", label: "Parent" },
  ];

  const statusOptions = [
    { value: "", label: "All Status" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  return (
    <RoleBasedComponent
      requiredRoles={["super_admin", "manager", "admin", "tenant_admin"]}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                User Management
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage users and their roles in the system
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={fetchUsers} disabled={loading}>
              <RefreshCw
                className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <RoleBasedComponent
              requiredRoles={[
                "super_admin",
                "manager",
                "admin",
                "tenant_admin",
              ]}
            >
              <Link to="/users/create">
                <Button>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User
                </Button>
              </Link>
            </RoleBasedComponent>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Input
              placeholder="Search users..."
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full"
            />
            <Select
              options={roleOptions}
              value={filters.role}
              onChange={(e) => handleFilterChange("role", e.target.value)}
              placeholder="Filter by role"
            />
            <Select
              options={statusOptions}
              value={filters.isActive.toString()}
              onChange={(e) =>
                handleFilterChange(
                  "isActive",
                  e.target.value === "" ? "" : e.target.value === "true"
                )
              }
              placeholder="Filter by status"
            />
            <Select
              options={[
                { value: "10", label: "10 per page" },
                { value: "25", label: "25 per page" },
                { value: "50", label: "50 per page" },
              ]}
              value={filters.limit.toString()}
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

        {/* Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <Table
            columns={columns}
            data={users}
            loading={loading}
            emptyMessage="No users found"
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

        {/* Delete User Modal */}
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete User"
        >
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Are you sure you want to delete {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={handleDeleteUser}
                className="text-red-600 hover:text-red-700"
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>

        {/* Update Role Modal */}
        <Modal
          isOpen={showRoleModal}
          onClose={() => setShowRoleModal(false)}
          title="Update User Role"
        >
          <div className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Update the role for {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </p>
            <Select
              label="New Role"
              options={getAvailableRoles().map((role) => ({
                value: role,
                label: getRoleDisplayName(role),
              }))}
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as UserRole)}
              className="mb-4"
            />
            <div className="flex items-center justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowRoleModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateRole}>Update Role</Button>
            </div>
          </div>
        </Modal>
      </div>
    </RoleBasedComponent>
  );
};
