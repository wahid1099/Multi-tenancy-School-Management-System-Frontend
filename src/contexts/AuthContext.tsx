import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole, LoginForm } from "../types";
import { apiService } from "../services/api";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (credentials: LoginForm) => Promise<void>;
  signOut: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await apiService.getCurrentUser();
          setUser(response.data);
        } catch (error) {
          console.error("Failed to get current user:", error);
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("tenant");
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const signIn = async (credentials: LoginForm) => {
    try {
      const response = await apiService.login(credentials);
      const { user: userData, token, refreshToken } = response.data;

      setUser(userData);
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("tenant", userData.tenant);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await apiService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("tenant");
    }
  };

  const switchRole = (role: UserRole) => {
    // Demo mode - create mock user for different roles
    const demoUser: User = {
      _id: `${role}-demo`,
      email: `${role}@demo.com`,
      firstName: role.charAt(0).toUpperCase() + role.slice(1).replace("_", " "),
      lastName: "Demo",
      role,
      tenant: "demo-school",
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setUser(demoUser);
    localStorage.setItem("tenant", "demo-school");
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) throw new Error("No user logged in");

    try {
      const response = await apiService.updateUser(user._id, userData);
      setUser(response.data);
    } catch (error) {
      console.error("Profile update failed:", error);
      throw error;
    }
  };

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      await apiService.changePassword(currentPassword, newPassword);
    } catch (error) {
      console.error("Password change failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        switchRole,
        updateProfile,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
