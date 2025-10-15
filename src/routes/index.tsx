import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Layout } from "../components/Layout/Layout";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import { Students } from "../pages/Students/Students";
import { Subjects } from "../pages/Subjects/Subjects";

// Placeholder components for missing pages
const Tenants = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Tenants Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Users = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Users Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Classes = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Classes Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Attendance = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Attendance Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Exams = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Exams Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Grades = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Grades Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Timetables = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Timetables Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Fees = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Fees Management</h1>
    <p>Coming soon...</p>
  </div>
);
const Reports = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Reports & Analytics</h1>
    <p>Coming soon...</p>
  </div>
);
const Settings = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold">Settings</h1>
    <p>Coming soon...</p>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />

                  {/* Admin & Tenant Admin Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin") && (
                    <>
                      <Route path="/tenants" element={<Tenants />} />
                      <Route path="/users" element={<Users />} />
                    </>
                  )}

                  {/* Academic Management Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "teacher") && (
                    <>
                      <Route path="/subjects" element={<Subjects />} />
                      <Route path="/classes" element={<Classes />} />
                      <Route path="/students" element={<Students />} />
                    </>
                  )}

                  {/* Attendance Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "teacher" ||
                    user?.role === "student") && (
                    <Route path="/attendance" element={<Attendance />} />
                  )}

                  {/* Exams Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "teacher" ||
                    user?.role === "student") && (
                    <Route path="/exams" element={<Exams />} />
                  )}

                  {/* Grades Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "teacher" ||
                    user?.role === "student" ||
                    user?.role === "parent") && (
                    <Route path="/grades" element={<Grades />} />
                  )}

                  {/* Timetables Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "teacher" ||
                    user?.role === "student") && (
                    <Route path="/timetables" element={<Timetables />} />
                  )}

                  {/* Fees Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "student" ||
                    user?.role === "parent") && (
                    <Route path="/fees" element={<Fees />} />
                  )}

                  {/* Reports Routes */}
                  {(user?.role === "admin" ||
                    user?.role === "tenant_admin" ||
                    user?.role === "teacher") && (
                    <Route path="/reports" element={<Reports />} />
                  )}

                  {/* Settings Route - Available to all */}
                  <Route path="/settings" element={<Settings />} />

                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
