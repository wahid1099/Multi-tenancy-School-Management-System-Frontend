import { UserRole, User, Permission } from "../types";

/**
 * Role hierarchy levels - higher number means higher authority
 */
export const ROLE_LEVELS: Record<UserRole, number> = {
  student: 0,
  parent: 0,
  teacher: 1,
  admin: 2,
  tenant_admin: 3,
  manager: 4,
  super_admin: 5,
};

/**
 * Role hierarchy - what roles each role can create/manage
 */
export const ROLE_HIERARCHY: Record<UserRole, UserRole[]> = {
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

/**
 * Get numeric level for a role
 */
export function getRoleLevel(role: UserRole): number {
  return ROLE_LEVELS[role] || 0;
}

/**
 * Compare two roles and return the relationship
 */
export function compareRoles(
  role1: UserRole,
  role2: UserRole
): "higher" | "lower" | "equal" {
  const level1 = getRoleLevel(role1);
  const level2 = getRoleLevel(role2);

  if (level1 > level2) return "higher";
  if (level1 < level2) return "lower";
  return "equal";
}

/**
 * Check if role1 is higher than role2 in hierarchy
 */
export function isHigherRole(role1: UserRole, role2: UserRole): boolean {
  return getRoleLevel(role1) > getRoleLevel(role2);
}

/**
 * Check if role1 can manage role2 (is higher or equal in hierarchy)
 */
export function canManageRole(
  managerRole: UserRole,
  targetRole: UserRole
): boolean {
  return getRoleLevel(managerRole) >= getRoleLevel(targetRole);
}

/**
 * Check if user has required role or higher
 */
export function hasRequiredRole(user: User, requiredRole: UserRole): boolean {
  if (!user || !user.role) return false;

  // Super admin has access to everything
  if (user.role === "super_admin") return true;

  // Check if user has the exact role or higher
  const userLevel = getRoleLevel(user.role);
  const requiredLevel = getRoleLevel(requiredRole);

  return userLevel >= requiredLevel;
}

/**
 * Check if user has any of the required roles
 */
export function hasAnyRole(user: User, roles: UserRole[]): boolean {
  if (!user || !user.role) return false;

  return roles.some((role) => hasRequiredRole(user, role));
}

/**
 * Get roles that can be created by the given role
 */
export function getCreatableRoles(creatorRole: UserRole): UserRole[] {
  return ROLE_HIERARCHY[creatorRole] || [];
}

/**
 * Check if creator can create target role
 */
export function canCreateRole(
  creatorRole: UserRole,
  targetRole: UserRole
): boolean {
  if (creatorRole === "super_admin") return true;

  const creatableRoles = getCreatableRoles(creatorRole);
  return creatableRoles.includes(targetRole);
}

/**
 * Check if a role is administrative (can manage other users)
 */
export function isAdministrativeRole(role: UserRole): boolean {
  return getRoleLevel(role) >= getRoleLevel("admin");
}

/**
 * Check if a role is a system-level role (super_admin, manager)
 */
export function isSystemRole(role: UserRole): boolean {
  return role === "super_admin" || role === "manager";
}

/**
 * Check if a role is tenant-specific
 */
export function isTenantRole(role: UserRole): boolean {
  return !isSystemRole(role);
}

/**
 * Get role display name for UI
 */
export function getRoleDisplayName(role: UserRole): string {
  const displayNames: Record<UserRole, string> = {
    super_admin: "Super Administrator",
    manager: "Manager",
    admin: "Administrator",
    tenant_admin: "School Administrator",
    teacher: "Teacher",
    student: "Student",
    parent: "Parent",
  };

  return displayNames[role] || role;
}

/**
 * Get role description for UI
 */
export function getRoleDescription(role: UserRole): string {
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

/**
 * Get role color for UI styling
 */
export function getRoleColor(role: UserRole): string {
  const colors: Record<UserRole, string> = {
    super_admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    manager:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    admin: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    tenant_admin:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    teacher:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    student:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    parent: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
  };

  return colors[role] || "bg-gray-100 text-gray-800";
}

/**
 * Check if user has specific permission
 */
export function hasPermission(user: User, permissionName: string): boolean {
  if (!user || !user.permissions) return false;

  return user.permissions.some(
    (permission: Permission) =>
      permission.resource === permissionName ||
      permission.actions.includes(permissionName)
  );
}

/**
 * Check if user has access to specific resource and action
 */
export function hasResourceAccess(
  user: User,
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

/**
 * Get available actions for a user on a specific resource
 */
export function getAvailableActions(user: User, resource: string): string[] {
  if (!user || !user.permissions) return [];

  const actions: string[] = [];

  user.permissions.forEach((permission: Permission) => {
    if (permission.resource === resource || permission.resource === "system") {
      actions.push(...permission.actions);
    }
  });

  return [...new Set(actions)]; // Remove duplicates
}

/**
 * Check if user can access tenant
 */
export function canAccessTenant(user: User, tenantId: string): boolean {
  if (!user) return false;

  // Super admin can access all tenants
  if (user.role === "super_admin") return true;

  // Global scope users can access any tenant
  if (user.roleScope === "global") return true;

  // Limited scope users can access managed tenants
  if (user.roleScope === "limited") {
    return user.managedTenants.includes(tenantId);
  }

  // Tenant scope users can only access their own tenant
  if (user.roleScope === "tenant") {
    return user.tenant === tenantId;
  }

  return false;
}

/**
 * Get user's accessible tenants
 */
export function getAccessibleTenants(user: User): string[] {
  if (!user) return [];

  // Super admin and global scope users can access all tenants
  if (user.role === "super_admin" || user.roleScope === "global") {
    return ["*"]; // Represents all tenants
  }

  // Limited scope users can access managed tenants
  if (user.roleScope === "limited") {
    return user.managedTenants;
  }

  // Tenant scope users can only access their own tenant
  if (user.roleScope === "tenant") {
    return [user.tenant];
  }

  return [];
}

/**
 * Format role for display with badge styling
 */
export function formatRoleForDisplay(role: UserRole): {
  name: string;
  description: string;
  color: string;
  level: number;
} {
  return {
    name: getRoleDisplayName(role),
    description: getRoleDescription(role),
    color: getRoleColor(role),
    level: getRoleLevel(role),
  };
}

/**
 * Get role options for select components
 */
export function getRoleOptions(userRole?: UserRole): Array<{
  value: UserRole;
  label: string;
  description: string;
  disabled?: boolean;
}> {
  const allRoles: UserRole[] = [
    "super_admin",
    "manager",
    "admin",
    "tenant_admin",
    "teacher",
    "student",
    "parent",
  ];

  return allRoles.map((role) => {
    const canCreate = userRole ? canCreateRole(userRole, role) : true;

    return {
      value: role,
      label: getRoleDisplayName(role),
      description: getRoleDescription(role),
      disabled: !canCreate,
    };
  });
}
