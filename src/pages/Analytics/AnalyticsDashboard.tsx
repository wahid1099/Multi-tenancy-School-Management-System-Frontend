import React, { useEffect, useState } from "react";
import {
  Users,
  Building,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Calendar,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApi } from "../../hooks/useApi";

interface AnalyticsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
  subtitle,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
          {value}
        </p>
        {subtitle && (
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
        {trend && (
          <div
            className={`flex items-center mt-2 text-sm ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${!trend.isPositive && "rotate-180"}`}
            />
            {trend.value}% from last month
          </div>
        )}
      </div>
      <div className={`p-4 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

const ChartCard: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      {title}
    </h3>
    {children}
  </div>
);

export const AnalyticsDashboard: React.FC = () => {
  // Safely get user with error handling
  let user = null;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.error("Auth context not available:", error);
  }

  const { fetchDashboardStats } = useApi();
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("30d");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        if (fetchDashboardStats) {
          await fetchDashboardStats();
        }
      } catch (error) {
        console.error("Failed to load analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [fetchDashboardStats, timeRange]);

  // Enhanced analytics data
  const analyticsData = {
    overview: {
      totalTenants: 24,
      totalUsers: 3456,
      totalStudents: 2847,
      totalRevenue: 8950000,
      activeUsers: 2934,
      systemUptime: 99.8,
    },
    growth: {
      tenants: { value: 18.5, isPositive: true },
      users: { value: 12.3, isPositive: true },
      revenue: { value: 24.7, isPositive: true },
      engagement: { value: -2.1, isPositive: false },
    },
    tenantDistribution: [
      { name: "Schools", count: 18, percentage: 75 },
      { name: "Universities", count: 4, percentage: 16.7 },
      { name: "Training Centers", count: 2, percentage: 8.3 },
    ],
    revenueByMonth: [
      { month: "Jan", revenue: 650000 },
      { month: "Feb", revenue: 720000 },
      { month: "Mar", revenue: 680000 },
      { month: "Apr", revenue: 790000 },
      { month: "May", revenue: 850000 },
      { month: "Jun", revenue: 920000 },
    ],
    topTenants: [
      { name: "Greenwood Academy", users: 456, revenue: 125000, growth: 15.2 },
      { name: "Spring Valley School", users: 389, revenue: 98000, growth: 8.7 },
      {
        name: "Riverside University",
        users: 1247,
        revenue: 340000,
        growth: 22.1,
      },
      { name: "Oakwood Elementary", users: 234, revenue: 67000, growth: -3.2 },
    ],
    systemMetrics: {
      apiCalls: 1247893,
      avgResponseTime: 145,
      errorRate: 0.02,
      activeConnections: 2847,
    },
  };

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
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Comprehensive system analytics and insights
          </p>
        </div>
        <div className="flex space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnalyticsCard
          title="Total Tenants"
          value={analyticsData.overview.totalTenants}
          icon={<Building className="w-8 h-8 text-white" />}
          color="bg-blue-500"
          trend={analyticsData.growth.tenants}
          subtitle="Active organizations"
        />
        <AnalyticsCard
          title="Total Users"
          value={analyticsData.overview.totalUsers.toLocaleString()}
          icon={<Users className="w-8 h-8 text-white" />}
          color="bg-green-500"
          trend={analyticsData.growth.users}
          subtitle="Across all tenants"
        />
        <AnalyticsCard
          title="Total Revenue"
          value={`$${(analyticsData.overview.totalRevenue / 1000000).toFixed(
            1
          )}M`}
          icon={<DollarSign className="w-8 h-8 text-white" />}
          color="bg-purple-500"
          trend={analyticsData.growth.revenue}
          subtitle="Monthly recurring"
        />
        <AnalyticsCard
          title="System Uptime"
          value={`${analyticsData.overview.systemUptime}%`}
          icon={<Activity className="w-8 h-8 text-white" />}
          color="bg-emerald-500"
          subtitle="Last 30 days"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <ChartCard title="Revenue Trend">
          <div className="space-y-4">
            {analyticsData.revenueByMonth.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {item.month}
                </span>
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(item.revenue / 1000000) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    ${(item.revenue / 1000).toFixed(0)}K
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Tenant Distribution */}
        <ChartCard title="Tenant Distribution">
          <div className="space-y-4">
            {analyticsData.tenantDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      index === 0
                        ? "bg-blue-500"
                        : index === 1
                        ? "bg-green-500"
                        : "bg-purple-500"
                    }`}
                  ></div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {item.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{item.count}</span>
                  <span className="text-xs text-gray-500">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Top Tenants & System Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Tenants */}
        <ChartCard title="Top Performing Tenants">
          <div className="space-y-4">
            {analyticsData.topTenants.map((tenant, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {tenant.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {tenant.users} users • ${tenant.revenue.toLocaleString()}/mo
                  </p>
                </div>
                <div
                  className={`flex items-center text-sm ${
                    tenant.growth > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <TrendingUp
                    className={`w-4 h-4 mr-1 ${
                      tenant.growth < 0 && "rotate-180"
                    }`}
                  />
                  {Math.abs(tenant.growth)}%
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* System Metrics */}
        <ChartCard title="System Performance">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                {analyticsData.systemMetrics.apiCalls.toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                API Calls
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <Activity className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">
                {analyticsData.systemMetrics.avgResponseTime}ms
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Avg Response
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-red-600">
                {analyticsData.systemMetrics.errorRate}%
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Error Rate
              </p>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-600">
                {analyticsData.systemMetrics.activeConnections}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Active Users
              </p>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Quick Actions */}
      <ChartCard title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <Building className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Add Tenant
            </span>
          </button>
          <button className="p-4 text-center bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              Manage Users
            </span>
          </button>
          <button className="p-4 text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              View Reports
            </span>
          </button>
          <button className="p-4 text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
            <Activity className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              System Health
            </span>
          </button>
        </div>
      </ChartCard>
    </div>
  );
};
