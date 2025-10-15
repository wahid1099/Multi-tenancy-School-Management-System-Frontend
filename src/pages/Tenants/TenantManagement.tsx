import React, { useState, useEffect } from "react";
import {
  Building,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Users,
  Calendar,
  DollarSign,
  Activity,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../hooks/useApi";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Modal } from "../../components/UI/Modal";
import { Table } from "../../components/UI/Table";

interface Tenant {
  _id: string;
  name: string;
  subdomain: string;
  domain?: string;
  contact: {
    email: string;
    phone: string;
  };
  subscription: {
    plan: string;
    status: string;
    maxUsers: number;
    maxStudents: number;
  };
  isActive: boolean;
  createdAt: string;
  stats?: {
    totalUsers: number;
    totalStudents: number;
    lastActivity: string;
  };
}

const StatusBadge: React.FC<{ status: string; isActive: boolean }> = ({
  status,
  isActive,
}) => {
  const getStatusColor = () => {
    if (!isActive) return "bg-red-100 text-red-800";
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "suspended":
        return "bg-yellow-100 text-yellow-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = () => {
    if (!isActive) return <XCircle className="w-3 h-3" />;
    switch (status) {
      case "active":
        return <CheckCircle className="w-3 h-3" />;
      case "suspended":
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <XCircle className="w-3 h-3" />;
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
    >
      {getStatusIcon()}
      <span className="ml-1">
        {!isActive
          ? "Inactive"
          : status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </span>
  );
};

const PlanBadge: React.FC<{ plan: string }> = ({ plan }) => {
  const getPlanColor = () => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-100 text-purple-800";
      case "premium":
        return "bg-blue-100 text-blue-800";
      case "basic":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPlanColor()}`}
    >
      {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </span>
  );
};

export const TenantManagement: React.FC = () => {
  // Safely get user with error handling
  let user = null;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.error("Auth context not available:", error);
  }

  const { fetchTenants, createTenant, updateTenant, deleteTenant } = useApi();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Mock data for demonstration
  const mockTenants: Tenant[] = [
    {
      _id: "1",
      name: "Greenwood Academy",
      subdomain: "greenwood",
      domain: "greenwood-academy.edu",
      contact: {
        email: "admin@greenwood-academy.edu",
        phone: "+1-555-0123",
      },
      subscription: {
        plan: "premium",
        status: "active",
        maxUsers: 500,
        maxStudents: 2000,
      },
      isActive: true,
      createdAt: "2024-01-15T10:30:00Z",
      stats: {
        totalUsers: 456,
        totalStudents: 1847,
        lastActivity: "2 hours ago",
      },
    },
    {
      _id: "2",
      name: "Spring Valley School",
      subdomain: "springvalley",
      contact: {
        email: "contact@springvalley.edu",
        phone: "+1-555-0124",
      },
      subscription: {
        plan: "basic",
        status: "active",
        maxUsers: 100,
        maxStudents: 500,
      },
      isActive: true,
      createdAt: "2024-02-20T14:15:00Z",
      stats: {
        totalUsers: 89,
        totalStudents: 423,
        lastActivity: "1 hour ago",
      },
    },
    {
      _id: "3",
      name: "Riverside University",
      subdomain: "riverside",
      contact: {
        email: "admin@riverside.edu",
        phone: "+1-555-0125",
      },
      subscription: {
        plan: "enterprise",
        status: "active",
        maxUsers: 1000,
        maxStudents: 5000,
      },
      isActive: true,
      createdAt: "2023-11-10T09:00:00Z",
      stats: {
        totalUsers: 1247,
        totalStudents: 4532,
        lastActivity: "30 minutes ago",
      },
    },
    {
      _id: "4",
      name: "Oakwood Elementary",
      subdomain: "oakwood",
      contact: {
        email: "info@oakwood.edu",
        phone: "+1-555-0126",
      },
      subscription: {
        plan: "basic",
        status: "suspended",
        maxUsers: 50,
        maxStudents: 200,
      },
      isActive: false,
      createdAt: "2024-03-05T16:45:00Z",
      stats: {
        totalUsers: 34,
        totalStudents: 156,
        lastActivity: "2 days ago",
      },
    },
  ];

  useEffect(() => {
    const loadTenants = async () => {
      try {
        // For now, use mock data
        setTenants(mockTenants);
        // Uncomment when API is ready:
        // if (fetchTenants) {
        //   await fetchTenants();
        // }
      } catch (error) {
        console.error("Failed to load tenants:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTenants();
  }, []);

  // Filter tenants based on search and filters
  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.subdomain.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.contact.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "active" &&
        tenant.isActive &&
        tenant.subscription.status === "active") ||
      (filterStatus === "inactive" && !tenant.isActive) ||
      (filterStatus === "suspended" &&
        tenant.subscription.status === "suspended");

    const matchesPlan =
      filterPlan === "all" || tenant.subscription.plan === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTenants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTenants = filteredTenants.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCreateTenant = async (tenantData: any) => {
    try {
      // Mock creation for now
      const newTenant: Tenant = {
        _id: Date.now().toString(),
        ...tenantData,
        isActive: true,
        createdAt: new Date().toISOString(),
        stats: {
          totalUsers: 0,
          totalStudents: 0,
          lastActivity: "Just created",
        },
      };
      setTenants([...tenants, newTenant]);
      setShowCreateModal(false);

      // Uncomment when API is ready:
      // await createTenant(tenantData);
    } catch (error) {
      console.error("Failed to create tenant:", error);
    }
  };

  const handleEditTenant = async (tenantData: any) => {
    try {
      // Mock update for now
      setTenants(
        tenants.map((t) =>
          t._id === selectedTenant?._id ? { ...t, ...tenantData } : t
        )
      );
      setShowEditModal(false);
      setSelectedTenant(null);

      // Uncomment when API is ready:
      // await updateTenant(selectedTenant._id, tenantData);
    } catch (error) {
      console.error("Failed to update tenant:", error);
    }
  };

  const handleDeleteTenant = async (tenantId: string) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      try {
        // Mock deletion for now
        setTenants(tenants.filter((t) => t._id !== tenantId));

        // Uncomment when API is ready:
        // await deleteTenant(tenantId);
      } catch (error) {
        console.error("Failed to delete tenant:", error);
      }
    }
  };

  const columns = [
    {
      key: "name",
      label: "Tenant",
      render: (tenant: Tenant) => (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-blue-600" />
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {tenant.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {tenant.subdomain}.school.com
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "contact",
      label: "Contact",
      render: (tenant: Tenant) => (
        <div>
          <div className="text-sm text-gray-900 dark:text-white">
            {tenant.contact.email}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {tenant.contact.phone}
          </div>
        </div>
      ),
    },
    {
      key: "subscription",
      label: "Plan",
      render: (tenant: Tenant) => (
        <div className="space-y-1">
          <PlanBadge plan={tenant.subscription.plan} />
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {tenant.subscription.maxUsers} users •{" "}
            {tenant.subscription.maxStudents} students
          </div>
        </div>
      ),
    },
    {
      key: "stats",
      label: "Usage",
      render: (tenant: Tenant) => (
        <div className="text-sm">
          <div className="text-gray-900 dark:text-white">
            {tenant.stats?.totalUsers} users
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            {tenant.stats?.totalStudents} students
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (tenant: Tenant) => (
        <StatusBadge
          status={tenant.subscription.status}
          isActive={tenant.isActive}
        />
      ),
    },
    {
      key: "lastActivity",
      label: "Last Activity",
      render: (tenant: Tenant) => (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {tenant.stats?.lastActivity}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (tenant: Tenant) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              setSelectedTenant(tenant);
              setShowEditModal(true);
            }}
            className="p-1 text-gray-400 hover:text-blue-600"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteTenant(tenant._id)}
            className="p-1 text-gray-400 hover:text-red-600"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tenant Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage all tenants and their subscriptions
          </p>
        </div>
        <Button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Tenant</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Tenants
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {tenants.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Tenants
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {
                  tenants.filter(
                    (t) => t.isActive && t.subscription.status === "active"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {tenants.reduce(
                  (sum, t) => sum + (t.stats?.totalUsers || 0),
                  0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-emerald-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Monthly Revenue
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                $24.5K
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search tenants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Plans</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </div>

      {/* Tenants Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <Table data={paginatedTenants} columns={columns} loading={loading} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Showing {startIndex + 1} to{" "}
                {Math.min(startIndex + itemsPerPage, filteredTenants.length)} of{" "}
                {filteredTenants.length} results
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create Tenant Modal */}
      <TenantModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSubmit={handleCreateTenant}
        title="Create New Tenant"
      />

      {/* Edit Tenant Modal */}
      <TenantModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setSelectedTenant(null);
        }}
        onSubmit={handleEditTenant}
        title="Edit Tenant"
        initialData={selectedTenant}
      />
    </div>
  );
};

// Tenant Modal Component
const TenantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  title: string;
  initialData?: Tenant | null;
}> = ({ isOpen, onClose, onSubmit, title, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    subdomain: "",
    domain: "",
    contact: {
      email: "",
      phone: "",
    },
    subscription: {
      plan: "basic",
      maxUsers: 50,
      maxStudents: 200,
    },
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        subdomain: initialData.subdomain,
        domain: initialData.domain || "",
        contact: initialData.contact,
        subscription: {
          plan: initialData.subscription.plan,
          maxUsers: initialData.subscription.maxUsers,
          maxStudents: initialData.subscription.maxStudents,
        },
      });
    } else {
      setFormData({
        name: "",
        subdomain: "",
        domain: "",
        contact: {
          email: "",
          phone: "",
        },
        subscription: {
          plan: "basic",
          maxUsers: 50,
          maxStudents: 200,
        },
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Tenant Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Subdomain"
            value={formData.subdomain}
            onChange={(e) =>
              setFormData({ ...formData, subdomain: e.target.value })
            }
            required
          />
        </div>

        <Input
          label="Custom Domain (Optional)"
          value={formData.domain}
          onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contact Email"
            type="email"
            value={formData.contact.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, email: e.target.value },
              })
            }
            required
          />
          <Input
            label="Contact Phone"
            value={formData.contact.phone}
            onChange={(e) =>
              setFormData({
                ...formData,
                contact: { ...formData.contact, phone: e.target.value },
              })
            }
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subscription Plan
            </label>
            <select
              value={formData.subscription.plan}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  subscription: {
                    ...formData.subscription,
                    plan: e.target.value,
                  },
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="basic">Basic</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          <Input
            label="Max Users"
            type="number"
            value={formData.subscription.maxUsers}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscription: {
                  ...formData.subscription,
                  maxUsers: parseInt(e.target.value),
                },
              })
            }
            required
          />
          <Input
            label="Max Students"
            type="number"
            value={formData.subscription.maxStudents}
            onChange={(e) =>
              setFormData({
                ...formData,
                subscription: {
                  ...formData.subscription,
                  maxStudents: parseInt(e.target.value),
                },
              })
            }
            required
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Tenant" : "Create Tenant"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
