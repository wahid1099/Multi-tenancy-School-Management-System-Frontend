import {
  User,
  Tenant,
  Subject,
  Class,
  Student,
  Attendance,
  Exam,
  Grade,
  Timetable,
  Fee,
  ApiResponse,
  PaginatedResponse,
  LoginForm,
  RegisterForm,
} from "../types";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://multi-tenancy-school-management-sys.vercel.app/api/v1";
class ApiService {
  private getHeaders(): HeadersInit {
    const token = localStorage.getItem("token");
    const tenant = localStorage.getItem("tenant");

    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...(tenant && { "X-Tenant-ID": tenant }),
    };
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: this.getHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "API request failed");
      }

      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Authentication
  async login(
    credentials: LoginForm
  ): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> {
    return this.request("/users/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(
    userData: RegisterForm
  ): Promise<ApiResponse<{ user: User; token: string; refreshToken: string }>> {
    return this.request("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async logout(): Promise<ApiResponse<null>> {
    return this.request("/users/logout", {
      method: "POST",
    });
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.request("/users/me");
  }

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<ApiResponse<null>> {
    return this.request("/users/change-password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }

  // Users
  async getUsers(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<User>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/users${queryString}`) as Promise<
      PaginatedResponse<User>
    >;
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`);
  }

  async updateUser(
    id: string,
    userData: Partial<User>
  ): Promise<ApiResponse<User>> {
    return this.request(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    return this.request(`/users/${id}`, {
      method: "DELETE",
    });
  }

  // Tenants
  async getTenants(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Tenant>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/tenants${queryString}`) as Promise<
      PaginatedResponse<Tenant>
    >;
  }

  async createTenant(
    tenantData: Partial<Tenant>
  ): Promise<ApiResponse<Tenant>> {
    return this.request("/tenants", {
      method: "POST",
      body: JSON.stringify(tenantData),
    });
  }

  async updateTenant(
    id: string,
    tenantData: Partial<Tenant>
  ): Promise<ApiResponse<Tenant>> {
    return this.request(`/tenants/${id}`, {
      method: "PATCH",
      body: JSON.stringify(tenantData),
    });
  }

  // Subjects
  async getSubjects(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Subject>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/subjects${queryString}`) as Promise<
      PaginatedResponse<Subject>
    >;
  }

  async createSubject(
    subjectData: Partial<Subject>
  ): Promise<ApiResponse<Subject>> {
    return this.request("/subjects", {
      method: "POST",
      body: JSON.stringify(subjectData),
    });
  }

  async updateSubject(
    id: string,
    subjectData: Partial<Subject>
  ): Promise<ApiResponse<Subject>> {
    return this.request(`/subjects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(subjectData),
    });
  }

  async deleteSubject(id: string): Promise<ApiResponse<null>> {
    return this.request(`/subjects/${id}`, {
      method: "DELETE",
    });
  }

  // Classes
  async getClasses(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Class>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/classes${queryString}`) as Promise<
      PaginatedResponse<Class>
    >;
  }

  async createClass(classData: Partial<Class>): Promise<ApiResponse<Class>> {
    return this.request("/classes", {
      method: "POST",
      body: JSON.stringify(classData),
    });
  }

  async updateClass(
    id: string,
    classData: Partial<Class>
  ): Promise<ApiResponse<Class>> {
    return this.request(`/classes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(classData),
    });
  }

  async deleteClass(id: string): Promise<ApiResponse<null>> {
    return this.request(`/classes/${id}`, {
      method: "DELETE",
    });
  }

  // Students
  async getStudents(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Student>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/students${queryString}`) as Promise<
      PaginatedResponse<Student>
    >;
  }

  async createStudent(
    studentData: Partial<Student>
  ): Promise<ApiResponse<Student>> {
    return this.request("/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(
    id: string,
    studentData: Partial<Student>
  ): Promise<ApiResponse<Student>> {
    return this.request(`/students/${id}`, {
      method: "PATCH",
      body: JSON.stringify(studentData),
    });
  }

  async deleteStudent(id: string): Promise<ApiResponse<null>> {
    return this.request(`/students/${id}`, {
      method: "DELETE",
    });
  }

  // Attendance
  async getAttendance(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Attendance>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/attendance${queryString}`) as Promise<
      PaginatedResponse<Attendance>
    >;
  }

  async createAttendance(
    attendanceData: Partial<Attendance>
  ): Promise<ApiResponse<Attendance>> {
    return this.request("/attendance", {
      method: "POST",
      body: JSON.stringify(attendanceData),
    });
  }

  async updateAttendance(
    id: string,
    attendanceData: Partial<Attendance>
  ): Promise<ApiResponse<Attendance>> {
    return this.request(`/attendance/${id}`, {
      method: "PATCH",
      body: JSON.stringify(attendanceData),
    });
  }

  // Exams
  async getExams(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Exam>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/exams${queryString}`) as Promise<
      PaginatedResponse<Exam>
    >;
  }

  async createExam(examData: Partial<Exam>): Promise<ApiResponse<Exam>> {
    return this.request("/exams", {
      method: "POST",
      body: JSON.stringify(examData),
    });
  }

  async updateExam(
    id: string,
    examData: Partial<Exam>
  ): Promise<ApiResponse<Exam>> {
    return this.request(`/exams/${id}`, {
      method: "PATCH",
      body: JSON.stringify(examData),
    });
  }

  async deleteExam(id: string): Promise<ApiResponse<null>> {
    return this.request(`/exams/${id}`, {
      method: "DELETE",
    });
  }

  // Grades
  async getGrades(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Grade>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/grades${queryString}`) as Promise<
      PaginatedResponse<Grade>
    >;
  }

  async createGrade(gradeData: Partial<Grade>): Promise<ApiResponse<Grade>> {
    return this.request("/grades", {
      method: "POST",
      body: JSON.stringify(gradeData),
    });
  }

  async updateGrade(
    id: string,
    gradeData: Partial<Grade>
  ): Promise<ApiResponse<Grade>> {
    return this.request(`/grades/${id}`, {
      method: "PATCH",
      body: JSON.stringify(gradeData),
    });
  }

  // Timetables
  async getTimetables(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Timetable>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/timetables${queryString}`) as Promise<
      PaginatedResponse<Timetable>
    >;
  }

  async createTimetable(
    timetableData: Partial<Timetable>
  ): Promise<ApiResponse<Timetable>> {
    return this.request("/timetables", {
      method: "POST",
      body: JSON.stringify(timetableData),
    });
  }

  async updateTimetable(
    id: string,
    timetableData: Partial<Timetable>
  ): Promise<ApiResponse<Timetable>> {
    return this.request(`/timetables/${id}`, {
      method: "PATCH",
      body: JSON.stringify(timetableData),
    });
  }

  async deleteTimetable(id: string): Promise<ApiResponse<null>> {
    return this.request(`/timetables/${id}`, {
      method: "DELETE",
    });
  }

  // Fees
  async getFees(
    params?: Record<string, string>
  ): Promise<PaginatedResponse<Fee>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/fees${queryString}`) as Promise<
      PaginatedResponse<Fee>
    >;
  }

  async createFee(feeData: Partial<Fee>): Promise<ApiResponse<Fee>> {
    return this.request("/fees", {
      method: "POST",
      body: JSON.stringify(feeData),
    });
  }

  async updateFee(
    id: string,
    feeData: Partial<Fee>
  ): Promise<ApiResponse<Fee>> {
    return this.request(`/fees/${id}`, {
      method: "PATCH",
      body: JSON.stringify(feeData),
    });
  }

  // Dashboard
  async getDashboard(): Promise<ApiResponse<unknown>> {
    return this.request("/dashboard");
  }

  // Role Management
  async getAvailableRoles(): Promise<ApiResponse<{ roles: string[] }>> {
    return this.request("/users/available-roles");
  }

  async getMyCreatedUsers(): Promise<ApiResponse<User[]>> {
    return this.request("/users/my-created-users");
  }

  async getRoleHierarchy(): Promise<ApiResponse<unknown>> {
    return this.request("/users/role-hierarchy");
  }

  async bulkCreateUsers(users: unknown[]): Promise<ApiResponse<unknown>> {
    return this.request("/users/bulk-create", {
      method: "POST",
      body: JSON.stringify({ users }),
    });
  }

  async updateUserRole(
    userId: string,
    role: string
  ): Promise<ApiResponse<User>> {
    return this.request(`/users/${userId}/role`, {
      method: "PATCH",
      body: JSON.stringify({ role }),
    });
  }

  // Audit Management
  async getAuditLogs(
    params?: Record<string, string>
  ): Promise<ApiResponse<unknown>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/audit/logs${queryString}`);
  }

  async getAuditStats(
    params?: Record<string, string>
  ): Promise<ApiResponse<unknown>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/audit/stats${queryString}`);
  }

  async exportAuditLogs(params?: Record<string, string>): Promise<unknown> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/audit/export${queryString}`, {
      method: "GET",
    });
  }

  async getCriticalEvents(
    params?: Record<string, string>
  ): Promise<ApiResponse<unknown>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/audit/critical${queryString}`);
  }

  async getUserActivity(
    userId: string,
    params?: Record<string, string>
  ): Promise<ApiResponse<unknown>> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`/audit/user-activity/${userId}${queryString}`);
  }

  // Generic API methods
  async get(
    endpoint: string,
    params?: Record<string, string>
  ): Promise<unknown> {
    const queryString = params
      ? `?${new URLSearchParams(params).toString()}`
      : "";
    return this.request(`${endpoint}${queryString}`);
  }

  async post(endpoint: string, data?: unknown): Promise<unknown> {
    return this.request(endpoint, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch(endpoint: string, data?: unknown): Promise<unknown> {
    return this.request(endpoint, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete(endpoint: string): Promise<unknown> {
    return this.request(endpoint, {
      method: "DELETE",
    });
  }
}

export const apiService = new ApiService();
export default apiService;
