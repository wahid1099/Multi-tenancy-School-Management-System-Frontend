import React, { useEffect, useState } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
  Building,
  Activity,
  FileText,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useApi } from "../hooks/useApi";
import { useApp } from "../contexts/AppContext";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-white">
          {value}
        </p>
        {trend && (
          <div
            className={`flex items-center mt-1 text-sm ${
              trend.isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`w-4 h-4 mr-1 ${!trend.isPositive && "rotate-180"}`}
            />
            {trend.value}%
          </div>
        )}
      </div>
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
    </div>
  </div>
);

interface ActivityCardProps {
  title: string;
  items: any[];
  emptyMessage: string;
  renderItem: (item: any, index: number) => React.ReactNode;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  items,
  emptyMessage,
  renderItem,
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
      {title}
    </h3>
    <div className="space-y-3">
      {items && items.length > 0 ? (
        items.slice(0, 5).map(renderItem)
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {emptyMessage}
        </p>
      )}
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);

  // Safely get user with error handling
  let user = null;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.error("Auth context not available in Dashboard:", error);
    user = null;
  }

  const { state } = useApp();
  const { fetchDashboard } = useApi();

  useEffect(() => {
    const loadDashboard = async () => {
      if (fetchDashboard) {
        setLoading(true);
        try {
          await fetchDashboard();
        } catch (error) {
          console.error("Failed to load dashboard:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [fetchDashboard]);

  const dashboardData = state.dashboardStats;

  const getStatsForRole = () => {
    if (!dashboardData) return [];

    const role = user?.role;

    if (role === "admin" || role === "tenant_admin") {
      return [
        {
          title: "Total Students",
          value: dashboardData.overview?.totalStudents || 0,
          icon: <Users className="w-6 h-6 text-white" />,
          color: "bg-blue-500",
        },
        {
          title: "Total Teachers",
          value: dashboardData.overview?.totalTeachers || 0,
          icon: <GraduationCap className="w-6 h-6 text-white" />,
          color: "bg-green-500",
        },
        {
          title: "Total Classes",
          value: dashboardData.overview?.totalClasses || 0,
          icon: <Building className="w-6 h-6 text-white" />,
          color: "bg-purple-500",
        },
        {
          title: "Total Subjects",
          value: dashboardData.overview?.totalSubjects || 0,
          icon: <BookOpen className="w-6 h-6 text-white" />,
          color: "bg-indigo-500",
        },
        {
          title: "Today's Attendance",
          value: `${Math.round(
            dashboardData.attendance?.todayAttendance || 0
          )}%`,
          icon: <UserCheck className="w-6 h-6 text-white" />,
          color: "bg-yellow-500",
        },
        {
          title: "Fee Collection Rate",
          value: `${Math.round(dashboardData.fees?.collectionRate || 0)}%`,
          icon: <DollarSign className="w-6 h-6 text-white" />,
          color: "bg-green-600",
        },
        {
          title: "Upcoming Exams",
          value: dashboardData.academics?.upcomingExams || 0,
          icon: <FileText className="w-6 h-6 text-white" />,
          color: "bg-red-500",
        },
        {
          title: "Active Users",
          value: dashboardData.tenantStats?.activeUsers || 0,
          icon: <Activity className="w-6 h-6 text-white" />,
          color: "bg-teal-500",
        },
      ];
    } else if (role === "teacher") {
      return [
        {
          title: "My Classes",
          value: dashboardData.overview?.myClasses || 0,
          icon: <Building className="w-6 h-6 text-white" />,
          color: "bg-blue-500",
        },
        {
          title: "My Subjects",
          value: dashboardData.overview?.mySubjects || 0,
          icon: <BookOpen className="w-6 h-6 text-white" />,
          color: "bg-green-500",
        },
        {
          title: "Total Students",
          value: dashboardData.overview?.totalStudents || 0,
          icon: <Users className="w-6 h-6 text-white" />,
          color: "bg-purple-500",
        },
        {
          title: "Pending Grades",
          value: dashboardData.pendingGrades?.length || 0,
          icon: <Award className="w-6 h-6 text-white" />,
          color: "bg-yellow-500",
        },
      ];
    } else if (role === "student") {
      return [
        {
          title: "My Subjects",
          value: dashboardData.overview?.mySubjects || 0,
          icon: <BookOpen className="w-6 h-6 text-white" />,
          color: "bg-blue-500",
        },
        {
          title: "Attendance Rate",
          value: `${dashboardData.overview?.attendanceRate || 0}%`,
          icon: <UserCheck className="w-6 h-6 text-white" />,
          color: "bg-green-500",
        },
        {
          title: "Average Grade",
          value: dashboardData.overview?.averageGrade || "N/A",
          icon: <Award className="w-6 h-6 text-white" />,
          color: "bg-purple-500",
        },
        {
          title: "Fees Due",
          value: `$${dashboardData.feeStatus?.totalDue || 0}`,
          icon: <DollarSign className="w-6 h-6 text-white" />,
          color: "bg-red-500",
        },
      ];
    }

    return [];
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening";
    return `${greeting}, ${user?.firstName || "User"}!`;
  };

  const getRoleSpecificContent = () => {
    const role = user?.role;

    if (role === "admin" || role === "tenant_admin") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityCard
            title="Recent Activities"
            items={dashboardData?.recentActivities || []}
            emptyMessage="No recent activities"
            renderItem={(activity: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.message}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          />

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              System Health
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Uptime
                </span>
                <span className="text-sm font-medium text-green-600">
                  {Math.round(
                    (dashboardData?.systemHealth?.uptime || 0) / 3600
                  )}
                  h
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Memory Usage
                </span>
                <span className="text-sm font-medium text-blue-600">
                  {Math.round(dashboardData?.systemHealth?.memoryUsage || 0)}MB
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Active Connections
                </span>
                <span className="text-sm font-medium text-purple-600">
                  {dashboardData?.systemHealth?.activeConnections || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (role === "teacher") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityCard
            title="Today's Schedule"
            items={dashboardData?.todaySchedule || []}
            emptyMessage="No classes scheduled for today"
            renderItem={(schedule: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {schedule.subject?.name || "Subject"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {schedule.class?.name || "Class"} -{" "}
                    {schedule.class?.section || ""}
                  </p>
                </div>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {schedule.startTime} - {schedule.endTime}
                </span>
              </div>
            )}
          />

          <ActivityCard
            title="Upcoming Exams"
            items={dashboardData?.upcomingExams || []}
            emptyMessage="No upcoming exams"
            renderItem={(exam: any, index: number) => (
              <div key={index} className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {exam.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {exam.subject?.name} -{" "}
                    {new Date(exam.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          />
        </div>
      );
    } else if (role === "student") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityCard
            title="Today's Schedule"
            items={dashboardData?.todaySchedule || []}
            emptyMessage="No classes scheduled for today"
            renderItem={(schedule: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {schedule.subject?.name || "Subject"}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {schedule.teacher?.firstName} {schedule.teacher?.lastName}
                  </p>
                </div>
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {schedule.startTime}
                </span>
              </div>
            )}
          />

          <ActivityCard
            title="Recent Grades"
            items={dashboardData?.recentGrades || []}
            emptyMessage="No recent grades"
            renderItem={(grade: unknown, index: number) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {grade.exam?.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {grade.subject?.name}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    grade.grade === "A"
                      ? "text-green-600"
                      : grade.grade === "B"
                      ? "text-blue-600"
                      : grade.grade === "C"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {grade.grade} ({grade.percentage}%)
                </span>
              </div>
            )}
          />
        </div>
      );
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-6 text-white">
        <h1 className="text-2xl font-bold">{getWelcomeMessage()}</h1>
        <p className="mt-2 opacity-90">
          Welcome to your school management dashboard. Here's what's happening
          today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getStatsForRole().map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Role-specific content */}
      {getRoleSpecificContent()}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {user?.role === "admin" || user?.role === "tenant_admin" ? (
            <>
              <button className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Add User
                </span>
              </button>
              <button className="p-4 text-center bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Add Class
                </span>
              </button>
              <button className="p-4 text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <BookOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Add Subject
                </span>
              </button>
              <button className="p-4 text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                <UserCheck className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Take Attendance
                </span>
              </button>
            </>
          ) : user?.role === "teacher" ? (
            <>
              <button className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <UserCheck className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Take Attendance
                </span>
              </button>
              <button className="p-4 text-center bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Grade Exam
                </span>
              </button>
              <button className="p-4 text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Schedule Exam
                </span>
              </button>
              <button className="p-4 text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                <BookOpen className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  View Timetable
                </span>
              </button>
            </>
          ) : (
            <>
              <button className="p-4 text-center bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  View Schedule
                </span>
              </button>
              <button className="p-4 text-center bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <Award className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  View Grades
                </span>
              </button>
              <button className="p-4 text-center bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  View Attendance
                </span>
              </button>
              <button className="p-4 text-center bg-yellow-50 dark:bg-yellow-900/20 rounded-lg hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors">
                <DollarSign className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Pay Fees
                </span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
