// Core Types
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  roleLevel: number;
  createdBy?: string;
  managedTenants: string[];
  permissions: Permission[];
  roleScope: "global" | "tenant" | "limited";
  tenant: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Permission {
  resource: string;
  actions: string[];
  scope: "global" | "tenant" | "own";
  conditions?: Record<string, unknown>;
}

export interface AuditLog {
  _id: string;
  actor: string;
  action: string;
  target?: string;
  resource?: string;
  details: Record<string, unknown>;
  tenant: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: Date;
  severity: "low" | "medium" | "high" | "critical";
}

export type UserRole =
  | "super_admin"
  | "manager"
  | "admin"
  | "tenant_admin"
  | "teacher"
  | "student"
  | "parent";

export interface Tenant {
  _id: string;
  name: string;
  subdomain: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  subscriptionPlan: "basic" | "premium" | "enterprise";
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  _id: string;
  name: string;
  code: string;
  description: string;
  category: "core" | "elective" | "extracurricular";
  credits: number;
  prerequisites: string[];
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Class {
  _id: string;
  name: string;
  section: string;
  grade: string;
  academicYear: string;
  classTeacher: string;
  subjects: string[];
  students: string[];
  capacity: number;
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Student {
  _id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  gender: "male" | "female" | "other";
  address: string;
  phone: string;
  guardianName: string;
  guardianPhone: string;
  guardianEmail: string;
  class: string;
  status: "active" | "inactive" | "transferred" | "graduated" | "dropped";
  admissionDate: Date;
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  _id: string;
  student: string;
  class: string;
  subject: string;
  date: Date;
  period: number;
  status: "present" | "absent" | "late" | "excused";
  remarks?: string;
  submittedBy: string;
  isSubmitted: boolean;
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Exam {
  _id: string;
  title: string;
  description: string;
  subject: string;
  class: string;
  examDate: Date;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  examType: "unit_test" | "mid_term" | "final" | "assignment" | "project";
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grade {
  _id: string;
  student: string;
  exam: string;
  marksObtained: number;
  grade: string;
  percentage: number;
  remarks?: string;
  gradedBy: string;
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Timetable {
  _id: string;
  class: string;
  subject: string;
  teacher: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  room?: string;
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Fee {
  _id: string;
  student: string;
  feeType: string;
  amount: number;
  dueDate: Date;
  status: "pending" | "paid" | "overdue" | "cancelled";
  paymentDate?: Date;
  paymentMethod?: string;
  transactionId?: string;
  tenant: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

// Dashboard Types
export interface DashboardStats {
  overview?: {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    totalSubjects: number;
    myClasses?: number;
    mySubjects?: number;
    attendanceRate?: number;
    averageGrade?: string;
  };
  attendance?: {
    todayAttendance: number;
    weeklyAttendance: number;
    monthlyAttendance: number;
  };
  academics?: {
    upcomingExams: number;
    pendingGrades: number;
    activeExams: number;
  };
  fees?: {
    totalCollected: number;
    totalPending: number;
    collectionRate: number;
    overdueCount: number;
  };
  tenantStats?: {
    totalUsers: number;
    activeUsers: number;
    newRegistrations: number;
  };
  systemHealth?: {
    uptime: number;
    memoryUsage: number;
    activeConnections: number;
  };
  recentActivities?: Activity[];
  todaySchedule?: unknown[];
  upcomingExams?: unknown[];
  pendingGrades?: unknown[];
  recentAttendance?: unknown[];
  recentGrades?: unknown[];
  feeStatus?: {
    totalDue: number;
    overdue: number;
    nextDueDate: Date | null;
  };
}

export interface Activity {
  _id: string;
  type: string;
  description: string;
  user: string;
  timestamp: Date;
}

// Role Management Types
export interface CreateUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  tenant?: string;
  managedTenants?: string[];
}

export interface RoleHierarchy {
  role: UserRole;
  level: number;
  canCreate: UserRole[];
  permissions: Permission[];
}

export interface AuditFilters {
  startDate?: Date;
  endDate?: Date;
  actor?: string;
  action?: string;
  resource?: string;
  tenant?: string;
  severity?: "low" | "medium" | "high" | "critical";
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}
