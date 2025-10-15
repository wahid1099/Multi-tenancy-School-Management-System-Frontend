import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { UserRole, Permission } from "../types";

interface RoleBasedComponentProps {
  requiredRole?: UserRole;
  requiredRoles?: UserRole[];
  requiredPermission?: string;
  requiredAction?: string;
  requiredResource?: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * Component that conditionally renders children based on user role and permissions
 */
export const RoleBasedComponent: React.FC<RoleBasedComponentProps> = ({
  requiredRole,
  requiredRoles,
  requiredPermission,
  requiredAction,
  requiredResource,
  fallback = null,
  children,
  className,
}) => {
  const { user } = useAuth();

  if (!user) {
    return <>{fallback}</>;
  }

  // Check role requirements
  if (requiredRole && !hasRequiredRole(user, requiredRole)) {
    return <>{fallback}</>;
  }

  if (
    requiredRoles &&
    !requiredRoles.some((role) => hasRequiredRole(user, role))
  ) {
    return <>{fallback}</>;
  }

  // Check permission requirements
  if (requiredPermission && !hasPermission(user, requiredPermission)) {
    return <>{fallback}</>;
  }

  // Check resource and action requirements
  if (
    requiredResource &&
    requiredAction &&
    !hasResourceAccess(user, requiredResource, requiredAction)
  ) {
    return <>{fallback}</>;
  }

  return <div className={className}>{children}</div>;
};

/**
 * Hook for role-based conditional logic
 */
export const useRoleAccess = () => {
  const { user } = useAuth();

  return {
    hasRole: (role: UserRole) => (user ? hasRequiredRole(user, role) : false),
    hasAnyRole: (roles: UserRole[]) =>
      user ? roles.some((role) => hasRequiredRole(user, role)) : false,
    hasPermission: (permission: string) =>
      user ? hasPermission(user, permission) : false,
    hasResourceAccess: (resource: string, action: string) =>
      user ? hasResourceAccess(user, resource, action) : false,
    isAdmin: () => (user ? isAdminRole(user.role) : false),
    isSuperAdmin: () => user?.role === "super_admin",
    canCreateRole: (targetRole: UserRole) =>
      user ? canCreateRole(user.role, targetRole) : false,
    user,
  };
};

/**
 * Higher-order component for role-based access control
 */
export const withRoleAccess = <P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: UserRole,
  fallback?: React.ComponentType<P>
) => {
  return (props: P) => {
    const { user } = useAuth();

    if (!user || (requiredRole && !hasRequiredRole(user, requiredRole))) {
      if (fallback) {
        const FallbackComponent = fallback;
        return <FallbackComponent {...props} />;
      }
      return null;
    }

    return <Component {...props} />;
  };
};

// Utility functions
const ROLE_LEVELS: Record<UserRole, number> = {
  student: 0,
  parent: 0,
  teacher: 1,
  admin: 2,
  tenant_admin: 3,
  manager: 4,
  super_admin: 5,
};

const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
  super_admin: [
    "manager",
    "admin",
    "tenant_admin",
    "teacher",
    "student",
    "parent",
  ],
  manager: ["admin", "tenant_admin", "teacher", "student", "parent"],
  admin: ["teacher", "student", "parent"],
  tenant_admin: ["admin", "teacher", "student", "parent"],
  teacher: ["student", "parent"],
  student: [],
  parent: [],
};

function hasRequiredRole(user: any, requiredRole: UserRole): boolean {
  if (!user || !user.role) return false;

  // Super admin has access to everything
  if (user.role === "super_admin") return true;

  // Check if user has the exact role or higher
  const userLevel = ROLE_LEVELS[user.role as UserRole] || 0;
  const requiredLevel = ROLE_LEVELS[requiredRole] || 0;

  return userLevel >= requiredLevel;
}

function hasPermission(user: any, permissionName: string): boolean {
  if (!user || !user.permissions) return false;

  return user.permissions.some(
    (permission: Permission) =>
      permission.resource === permissionName ||
      permission.actions.includes(permissionName)
  );
}

function hasResourceAccess(
  user: any,
  resource: string,
  action: string
): boolean {
  if (!user || !user.permissions) return false;

  return user.permissions.some(
    (permission: Permission) =>
      (permission.resource === resource || permission.resource === "system") &&
      (permission.actions.includes(action) ||
        permission.actions.includes("manage"))
  );
}

function isAdminRole(role: UserRole): boolean {
  const adminRoles: UserRole[] = [
    "super_admin",
    "manager",
    "admin",
    "tenant_admin",
  ];
  return adminRoles.includes(role);
}

function canCreateRole(creatorRole: UserRole, targetRole: UserRole): boolean {
  if (creatorRole === "super_admin") return true;

  const creatableRoles = ROLE_HIERARCHY[creatorRole] || [];
  return creatableRoles.includes(targetRole);
}

export default RoleBasedComponent;
