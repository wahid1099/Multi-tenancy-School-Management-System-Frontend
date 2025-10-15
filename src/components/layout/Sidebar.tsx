import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  Building,
  BookOpen,
  GraduationCap,
  UserCheck,
  Calendar,
  FileText,
  Trophy,
  Clock,
  DollarSign,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useApp } from "../../contexts/AppContext";
import { UserRole } from "../../types";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const menuItems: MenuItem[] = [
  {
    path: "/dashboard",
    label: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher", "student", "parent"],
  },
  {
    path: "/tenants",
    label: "Tenants",
    icon: <Building className="w-5 h-5" />,
    roles: ["admin"],
  },
  {
    path: "/users",
    label: "Users",
    icon: <Users className="w-5 h-5" />,
    roles: ["admin", "tenant_admin"],
  },
  {
    path: "/subjects",
    label: "Subjects",
    icon: <BookOpen className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher"],
  },
  {
    path: "/classes",
    label: "Classes",
    icon: <GraduationCap className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher"],
  },
  {
    path: "/students",
    label: "Students",
    icon: <Users className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher"],
  },
  {
    path: "/attendance",
    label: "Attendance",
    icon: <UserCheck className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher", "student"],
  },
  {
    path: "/exams",
    label: "Exams",
    icon: <FileText className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher", "student"],
  },
  {
    path: "/grades",
    label: "Grades",
    icon: <Trophy className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher", "student", "parent"],
  },
  {
    path: "/timetables",
    label: "Timetables",
    icon: <Clock className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher", "student"],
  },
  {
    path: "/fees",
    label: "Fees",
    icon: <DollarSign className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "student", "parent"],
  },
  {
    path: "/reports",
    label: "Reports",
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ["admin", "tenant_admin", "teacher"],
  },
];

export const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { state, dispatch } = useApp();

  const filteredMenuItems = menuItems.filter(
    (item) => user && item.roles.includes(user.role)
  );

  const toggleSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR" });
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {state.sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out
        ${state.sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SchoolMS
            </span>
          </div>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-medium">
                  {user.firstName.charAt(0)}
                  {user.lastName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {filteredMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }
              `}
              onClick={() => {
                // Close sidebar on mobile after navigation
                if (window.innerWidth < 1024) {
                  dispatch({ type: "TOGGLE_SIDEBAR" });
                }
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-1">
          <NavLink
            to="/settings"
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </NavLink>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
};
