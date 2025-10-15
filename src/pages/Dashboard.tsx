import React, { useEffect } from "react";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  TrendingUp,
  Calendar,
  DollarSign,
  Award,
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
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { state } = useApp();
  const { fetchDashboardStats } = useApi();

  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  const stats = state.dashboardStats;

  const getStatsForRole = () => {
    if (!stats) return [];

    const baseStats = [
      {
        title: "Total Students",
        value: stats.totalStudents || 0,
        icon: <Users className="w-6 h-6 text-white" />,
        color: "bg-blue-500",
        trend: { value: 12, isPositive: true },
      },
      {
        title: "Total Classes",
        value: stats.totalClasses || 0,
        icon: <GraduationCap className="w-6 h-6 text-white" />,
        color: "bg-green-500",
        trend: { value: 5, isPositive: true },
      },
      {
        title: "Total Subjects",
        value: stats.totalSubjects || 0,
        icon: <BookOpen className="w-6 h-6 text-white" />,
        color: "bg-purple-500",
      },
      {
        title: "Attendance Rate",
        value: `${stats.attendanceRate || 0}%`,
        icon: <UserCheck className="w-6 h-6 text-white" />,
        color: "bg-yellow-500",
        trend: { value: 3, isPositive: true },
      },
    ];

    if (user?.role === "admin" || user?.role === "tenant_admin") {
      baseStats.push(
        {
          title: "Total Teachers",
          value: stats.totalTeachers || 0,
          icon: <Users className="w-6 h-6 text-white" />,
          color: "bg-indigo-500",
        },
        {
          title: "Fee Collection",
          value: `$${stats.feeCollection || 0}`,
          icon: <DollarSign className="w-6 h-6 text-white" />,
          color: "bg-green-600",
          trend: { value: 8, isPositive: true },
        }
      );
    }

    return baseStats;
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting =
      hour < 12
        ? "Good morning"
        : hour < 18
        ? "Good afternoon"
        : "Good evening";
    return `${greeting}, ${user?.firstName}!`;
  };

  const getRoleSpecificContent = () => {
    switch (user?.role) {
      case "admin":
      case "tenant_admin":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Activities
              </h3>
              <div className="space-y-3">
                {stats?.recentActivities?.slice(0, 5).map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.description}
                    </p>
                  </div>
                )) || (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No recent activities
                  </p>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Upcoming Events
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Parent-Teacher Meeting
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Tomorrow, 2:00 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Annual Sports Day
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Next Friday, 9:00 AM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "teacher":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Classes
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Mathematics
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Grade 10-A
                    </p>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    9:00 AM
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Physics
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Grade 11-B
                    </p>
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    11:00 AM
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Pending Tasks
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Grade Math assignments for Grade 10-A
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Prepare quiz for Physics class
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Update attendance records
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case "student":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Today's Schedule
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      Mathematics
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Room 101
                    </p>
                  </div>
                  <span className="text-sm text-blue-600 dark:text-blue-400">
                    9:00 AM
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      English
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Room 205
                    </p>
                  </div>
                  <span className="text-sm text-green-600 dark:text-green-400">
                    10:30 AM
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Grades
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Mathematics Quiz
                  </span>
                  <span className="text-sm font-medium text-green-600">A+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Physics Lab Report
                  </span>
                  <span className="text-sm font-medium text-blue-600">B+</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    English Essay
                  </span>
                  <span className="text-sm font-medium text-green-600">A</span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow p-6 text-white">
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
