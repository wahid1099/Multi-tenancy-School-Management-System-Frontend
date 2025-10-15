import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { RoleBasedComponent } from "../../components/RoleBasedComponent";
import { UserRole, CreateUserData } from "../../types";
import {
  getRoleOptions,
  canCreateRole,
  getRoleDisplayName,
} from "../../utils/roleUtils";
import { apiService } from "../../services/api";

export const CreateUser: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<UserRole[]>([]);

  const [formData, setFormData] = useState<CreateUserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "student",
    tenant: "",
    managedTenants: [],
  });

  useEffect(() => {
    // Fetch available roles for the current user
    const fetchAvailableRoles = async () => {
      try {
        const response = await apiService.get("/users/available-roles");
        setAvailableRoles(response.data.roles);

        // Set default role to the first available role
        if (response.data.roles.length > 0) {
          setFormData((prev) => ({ ...prev, role: response.data.roles[0] }));
        }
      } catch (error) {
        console.error("Failed to fetch available roles:", error);
        // Fallback to basic role options
        if (user) {
          const roleOptions = getRoleOptions(user.role);
          const availableOptions = roleOptions.filter(
            (option) => !option.disabled
          );
          setAvailableRoles(availableOptions.map((option) => option.value));
        }
      }
    };

    fetchAvailableRoles();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validate form
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError("First name and last name are required");
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    // Validate role permission
    if (user && !canCreateRole(user.role, formData.role)) {
      setError(
        `You don't have permission to create ${getRoleDisplayName(
          formData.role
        )} users`
      );
      setLoading(false);
      return;
    }

    try {
      const userData = {
        ...formData,
        // Set tenant based on user's scope
        tenant: formData.tenant || user?.tenant,
      };

      await apiService.post("/users", userData);

      setSuccess(
        `User created successfully! ${formData.firstName} ${
          formData.lastName
        } has been added as a ${getRoleDisplayName(formData.role)}.`
      );

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: availableRoles[0] || "student",
        tenant: "",
        managedTenants: [],
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/users");
      }, 2000);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create user";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const roleOptions = availableRoles.map((role) => ({
    value: role,
    label: getRoleDisplayName(role),
  }));

  return (
    <RoleBasedComponent
      requiredRoles={["super_admin", "manager", "admin", "tenant_admin"]}
    >
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <UserPlus className="w-6 h-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Create New User
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Add a new user to the system with appropriate role and
              permissions.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Success Message */}
            {success && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {success}
                  </p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter first name"
              />
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter last name"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              helperText="This will be used for login"
            />

            {/* Role Selection */}
            <Select
              label="Role"
              name="role"
              options={roleOptions}
              value={formData.role}
              onChange={handleChange}
              required
              helperText={`You can create: ${availableRoles
                .map((role) => getRoleDisplayName(role))
                .join(", ")}`}
            />

            {/* Tenant Assignment for Managers */}
            <RoleBasedComponent requiredRoles={["super_admin", "manager"]}>
              <Input
                label="Tenant ID (Optional)"
                type="text"
                name="tenant"
                value={formData.tenant}
                onChange={handleChange}
                placeholder="Leave empty to use your tenant"
                helperText="Specify a different tenant for this user (Super Admin and Manager only)"
              />
            </RoleBasedComponent>

            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter password"
                className="pr-10"
                helperText="Must be at least 8 characters long"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Role Information */}
            {formData.role && (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-4">
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-2">
                  Role Information: {getRoleDisplayName(formData.role)}
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  {getRoleDescription(formData.role)}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/users")}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={loading}
                disabled={availableRoles.length === 0}
              >
                Create User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </RoleBasedComponent>
  );
};

// Helper function to get role description
function getRoleDescription(role: UserRole): string {
  const descriptions: Record<UserRole, string> = {
    super_admin: "Full system access across all tenants and users",
    manager: "Manages specific tenants and their users",
    admin: "Manages users within assigned scope (global or tenant)",
    tenant_admin: "Manages all aspects of their school/tenant",
    teacher: "Manages classes, attendance, and grades",
    student: "Access to own academic information",
    parent: "Access to child's academic information",
  };

  return descriptions[role] || "No description available";
}
