import { useState, useCallback } from "react";
import { useApp } from "../contexts/AppContext";
import { apiService } from "../services/api";
import {
  User,
  Tenant,
  Subject,
  Class,
  Student,
  Exam,
  RegisterForm,
  DashboardStats,
} from "../types";

export const useApi = () => {
  const { dispatch } = useApp();
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback(
    (error: unknown) => {
      const message =
        error instanceof Error ? error.message : "An error occurred";
      setError(message);
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "error",
          message,
        },
      });
    },
    [dispatch]
  );

  const handleSuccess = useCallback(
    (message: string) => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          type: "success",
          message,
        },
      });
    },
    [dispatch]
  );

  // Users
  const fetchUsers = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "users", value: true },
        });
        const response = await apiService.getUsers(params);
        dispatch({
          type: "SET_USERS",
          payload: {
            users: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "users", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  const createUser = useCallback(
    async (userData: RegisterForm) => {
      try {
        const response = await apiService.register(userData);
        dispatch({ type: "ADD_USER", payload: response.data.user });
        handleSuccess("User created successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const updateUser = useCallback(
    async (id: string, userData: Partial<User>) => {
      try {
        const response = await apiService.updateUser(id, userData);
        dispatch({ type: "UPDATE_USER", payload: response.data });
        handleSuccess("User updated successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const deleteUser = useCallback(
    async (id: string) => {
      try {
        await apiService.deleteUser(id);
        dispatch({ type: "DELETE_USER", payload: id });
        handleSuccess("User deleted successfully");
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  // Tenants
  const fetchTenants = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "tenants", value: true },
        });
        const response = await apiService.getTenants(params);
        dispatch({
          type: "SET_TENANTS",
          payload: {
            tenants: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "tenants", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  const createTenant = useCallback(
    async (tenantData: Partial<Tenant>) => {
      try {
        const response = await apiService.createTenant(tenantData);
        handleSuccess("Tenant created successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [handleError, handleSuccess]
  );

  // Subjects
  const fetchSubjects = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "subjects", value: true },
        });
        const response = await apiService.getSubjects(params);
        dispatch({
          type: "SET_SUBJECTS",
          payload: {
            subjects: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "subjects", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  const createSubject = useCallback(
    async (subjectData: Partial<Subject>) => {
      try {
        const response = await apiService.createSubject(subjectData);
        dispatch({ type: "ADD_SUBJECT", payload: response.data });
        handleSuccess("Subject created successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const updateSubject = useCallback(
    async (id: string, subjectData: Partial<Subject>) => {
      try {
        const response = await apiService.updateSubject(id, subjectData);
        dispatch({ type: "UPDATE_SUBJECT", payload: response.data });
        handleSuccess("Subject updated successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const deleteSubject = useCallback(
    async (id: string) => {
      try {
        await apiService.deleteSubject(id);
        dispatch({ type: "DELETE_SUBJECT", payload: id });
        handleSuccess("Subject deleted successfully");
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  // Classes
  const fetchClasses = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "classes", value: true },
        });
        const response = await apiService.getClasses(params);
        dispatch({
          type: "SET_CLASSES",
          payload: {
            classes: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "classes", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  const createClass = useCallback(
    async (classData: Partial<Class>) => {
      try {
        const response = await apiService.createClass(classData);
        dispatch({ type: "ADD_CLASS", payload: response.data });
        handleSuccess("Class created successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const updateClass = useCallback(
    async (id: string, classData: Partial<Class>) => {
      try {
        const response = await apiService.updateClass(id, classData);
        dispatch({ type: "UPDATE_CLASS", payload: response.data });
        handleSuccess("Class updated successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const deleteClass = useCallback(
    async (id: string) => {
      try {
        await apiService.deleteClass(id);
        dispatch({ type: "DELETE_CLASS", payload: id });
        handleSuccess("Class deleted successfully");
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  // Students
  const fetchStudents = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "students", value: true },
        });
        const response = await apiService.getStudents(params);
        dispatch({
          type: "SET_STUDENTS",
          payload: {
            students: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "students", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  const createStudent = useCallback(
    async (studentData: Partial<Student>) => {
      try {
        const response = await apiService.createStudent(studentData);
        dispatch({ type: "ADD_STUDENT", payload: response.data });
        handleSuccess("Student created successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const updateStudent = useCallback(
    async (id: string, studentData: Partial<Student>) => {
      try {
        const response = await apiService.updateStudent(id, studentData);
        dispatch({ type: "UPDATE_STUDENT", payload: response.data });
        handleSuccess("Student updated successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const deleteStudent = useCallback(
    async (id: string) => {
      try {
        await apiService.deleteStudent(id);
        dispatch({ type: "DELETE_STUDENT", payload: id });
        handleSuccess("Student deleted successfully");
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  // Attendance
  const fetchAttendance = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "attendance", value: true },
        });
        const response = await apiService.getAttendance(params);
        dispatch({
          type: "SET_ATTENDANCE",
          payload: {
            attendance: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "attendance", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  // Exams
  const fetchExams = useCallback(
    async (params?: Record<string, string>) => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "exams", value: true },
        });
        const response = await apiService.getExams(params);
        dispatch({
          type: "SET_EXAMS",
          payload: {
            exams: response.data,
            pagination: response.pagination,
          },
        });
      } catch (error) {
        handleError(error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: { key: "exams", value: false },
        });
      }
    },
    [dispatch, handleError]
  );

  const createExam = useCallback(
    async (examData: Partial<Exam>) => {
      try {
        const response = await apiService.createExam(examData);
        dispatch({ type: "ADD_EXAM", payload: response.data });
        handleSuccess("Exam created successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const updateExam = useCallback(
    async (id: string, examData: Partial<Exam>) => {
      try {
        const response = await apiService.updateExam(id, examData);
        dispatch({ type: "UPDATE_EXAM", payload: response.data });
        handleSuccess("Exam updated successfully");
        return response.data;
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  const deleteExam = useCallback(
    async (id: string) => {
      try {
        await apiService.deleteExam(id);
        dispatch({ type: "DELETE_EXAM", payload: id });
        handleSuccess("Exam deleted successfully");
      } catch (error) {
        handleError(error);
        throw error;
      }
    },
    [dispatch, handleError, handleSuccess]
  );

  // Dashboard
  const fetchDashboard = useCallback(async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "dashboard", value: true },
      });
      const response = await apiService.getDashboard();
      dispatch({
        type: "SET_DASHBOARD_STATS",
        payload: response.data as DashboardStats,
      });
    } catch (error) {
      handleError(error);
    } finally {
      dispatch({
        type: "SET_LOADING",
        payload: { key: "dashboard", value: false },
      });
    }
  }, [dispatch, handleError]);

  return {
    error,
    setError,
    // Users
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    // Tenants
    fetchTenants,
    createTenant,
    // Subjects
    fetchSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
    // Classes
    fetchClasses,
    createClass,
    updateClass,
    deleteClass,
    // Students
    fetchStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    // Attendance
    fetchAttendance,
    // Exams
    fetchExams,
    createExam,
    updateExam,
    deleteExam,
    // Dashboard
    fetchDashboard,
  };
};
