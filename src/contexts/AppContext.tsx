import React, { createContext, useContext, useReducer, ReactNode } from "react";
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
  DashboardStats,
} from "../types";

// State interface
interface AppState {
  // Loading states
  loading: {
    users: boolean;
    tenants: boolean;
    subjects: boolean;
    classes: boolean;
    students: boolean;
    attendance: boolean;
    exams: boolean;
    grades: boolean;
    timetables: boolean;
    fees: boolean;
    dashboard: boolean;
  };

  // Data
  users: User[];
  tenants: Tenant[];
  subjects: Subject[];
  classes: Class[];
  students: Student[];
  attendance: Attendance[];
  exams: Exam[];
  grades: Grade[];
  timetables: Timetable[];
  fees: Fee[];
  dashboardStats: DashboardStats | null;

  // Pagination
  pagination: {
    users: { page: number; limit: number; total: number; pages: number };
    tenants: { page: number; limit: number; total: number; pages: number };
    subjects: { page: number; limit: number; total: number; pages: number };
    classes: { page: number; limit: number; total: number; pages: number };
    students: { page: number; limit: number; total: number; pages: number };
    attendance: { page: number; limit: number; total: number; pages: number };
    exams: { page: number; limit: number; total: number; pages: number };
    grades: { page: number; limit: number; total: number; pages: number };
    timetables: { page: number; limit: number; total: number; pages: number };
    fees: { page: number; limit: number; total: number; pages: number };
  };

  // UI state
  selectedTenant: string | null;
  sidebarOpen: boolean;
  notifications: Notification[];
}

interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  timestamp: Date;
}

// Action types
type AppAction =
  | {
      type: "SET_LOADING";
      payload: { key: keyof AppState["loading"]; value: boolean };
    }
  | { type: "SET_USERS"; payload: { users: User[]; pagination: any } }
  | { type: "SET_TENANTS"; payload: { tenants: Tenant[]; pagination: any } }
  | { type: "SET_SUBJECTS"; payload: { subjects: Subject[]; pagination: any } }
  | { type: "SET_CLASSES"; payload: { classes: Class[]; pagination: any } }
  | { type: "SET_STUDENTS"; payload: { students: Student[]; pagination: any } }
  | {
      type: "SET_ATTENDANCE";
      payload: { attendance: Attendance[]; pagination: any };
    }
  | { type: "SET_EXAMS"; payload: { exams: Exam[]; pagination: any } }
  | { type: "SET_GRADES"; payload: { grades: Grade[]; pagination: any } }
  | {
      type: "SET_TIMETABLES";
      payload: { timetables: Timetable[]; pagination: any };
    }
  | { type: "SET_FEES"; payload: { fees: Fee[]; pagination: any } }
  | { type: "SET_DASHBOARD_STATS"; payload: DashboardStats }
  | { type: "ADD_USER"; payload: User }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string }
  | { type: "ADD_SUBJECT"; payload: Subject }
  | { type: "UPDATE_SUBJECT"; payload: Subject }
  | { type: "DELETE_SUBJECT"; payload: string }
  | { type: "ADD_CLASS"; payload: Class }
  | { type: "UPDATE_CLASS"; payload: Class }
  | { type: "DELETE_CLASS"; payload: string }
  | { type: "ADD_STUDENT"; payload: Student }
  | { type: "UPDATE_STUDENT"; payload: Student }
  | { type: "DELETE_STUDENT"; payload: string }
  | { type: "ADD_EXAM"; payload: Exam }
  | { type: "UPDATE_EXAM"; payload: Exam }
  | { type: "DELETE_EXAM"; payload: string }
  | { type: "SET_SELECTED_TENANT"; payload: string | null }
  | { type: "TOGGLE_SIDEBAR" }
  | {
      type: "ADD_NOTIFICATION";
      payload: Omit<Notification, "id" | "timestamp">;
    }
  | { type: "REMOVE_NOTIFICATION"; payload: string };

// Initial state
const initialState: AppState = {
  loading: {
    users: false,
    tenants: false,
    subjects: false,
    classes: false,
    students: false,
    attendance: false,
    exams: false,
    grades: false,
    timetables: false,
    fees: false,
    dashboard: false,
  },
  users: [],
  tenants: [],
  subjects: [],
  classes: [],
  students: [],
  attendance: [],
  exams: [],
  grades: [],
  timetables: [],
  fees: [],
  dashboardStats: null,
  pagination: {
    users: { page: 1, limit: 10, total: 0, pages: 0 },
    tenants: { page: 1, limit: 10, total: 0, pages: 0 },
    subjects: { page: 1, limit: 10, total: 0, pages: 0 },
    classes: { page: 1, limit: 10, total: 0, pages: 0 },
    students: { page: 1, limit: 10, total: 0, pages: 0 },
    attendance: { page: 1, limit: 10, total: 0, pages: 0 },
    exams: { page: 1, limit: 10, total: 0, pages: 0 },
    grades: { page: 1, limit: 10, total: 0, pages: 0 },
    timetables: { page: 1, limit: 10, total: 0, pages: 0 },
    fees: { page: 1, limit: 10, total: 0, pages: 0 },
  },
  selectedTenant: null,
  sidebarOpen: true,
  notifications: [],
};

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: {
          ...state.loading,
          [action.payload.key]: action.payload.value,
        },
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.payload.users,
        pagination: {
          ...state.pagination,
          users: action.payload.pagination,
        },
      };

    case "SET_TENANTS":
      return {
        ...state,
        tenants: action.payload.tenants,
        pagination: {
          ...state.pagination,
          tenants: action.payload.pagination,
        },
      };

    case "SET_SUBJECTS":
      return {
        ...state,
        subjects: action.payload.subjects,
        pagination: {
          ...state.pagination,
          subjects: action.payload.pagination,
        },
      };

    case "SET_CLASSES":
      return {
        ...state,
        classes: action.payload.classes,
        pagination: {
          ...state.pagination,
          classes: action.payload.pagination,
        },
      };

    case "SET_STUDENTS":
      return {
        ...state,
        students: action.payload.students,
        pagination: {
          ...state.pagination,
          students: action.payload.pagination,
        },
      };

    case "SET_ATTENDANCE":
      return {
        ...state,
        attendance: action.payload.attendance,
        pagination: {
          ...state.pagination,
          attendance: action.payload.pagination,
        },
      };

    case "SET_EXAMS":
      return {
        ...state,
        exams: action.payload.exams,
        pagination: {
          ...state.pagination,
          exams: action.payload.pagination,
        },
      };

    case "SET_GRADES":
      return {
        ...state,
        grades: action.payload.grades,
        pagination: {
          ...state.pagination,
          grades: action.payload.pagination,
        },
      };

    case "SET_TIMETABLES":
      return {
        ...state,
        timetables: action.payload.timetables,
        pagination: {
          ...state.pagination,
          timetables: action.payload.pagination,
        },
      };

    case "SET_FEES":
      return {
        ...state,
        fees: action.payload.fees,
        pagination: {
          ...state.pagination,
          fees: action.payload.pagination,
        },
      };

    case "SET_DASHBOARD_STATS":
      return {
        ...state,
        dashboardStats: action.payload,
      };

    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };

    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };

    case "ADD_SUBJECT":
      return {
        ...state,
        subjects: [...state.subjects, action.payload],
      };

    case "UPDATE_SUBJECT":
      return {
        ...state,
        subjects: state.subjects.map((subject) =>
          subject._id === action.payload._id ? action.payload : subject
        ),
      };

    case "DELETE_SUBJECT":
      return {
        ...state,
        subjects: state.subjects.filter(
          (subject) => subject._id !== action.payload
        ),
      };

    case "ADD_CLASS":
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };

    case "UPDATE_CLASS":
      return {
        ...state,
        classes: state.classes.map((cls) =>
          cls._id === action.payload._id ? action.payload : cls
        ),
      };

    case "DELETE_CLASS":
      return {
        ...state,
        classes: state.classes.filter((cls) => cls._id !== action.payload),
      };

    case "ADD_STUDENT":
      return {
        ...state,
        students: [...state.students, action.payload],
      };

    case "UPDATE_STUDENT":
      return {
        ...state,
        students: state.students.map((student) =>
          student._id === action.payload._id ? action.payload : student
        ),
      };

    case "DELETE_STUDENT":
      return {
        ...state,
        students: state.students.filter(
          (student) => student._id !== action.payload
        ),
      };

    case "ADD_EXAM":
      return {
        ...state,
        exams: [...state.exams, action.payload],
      };

    case "UPDATE_EXAM":
      return {
        ...state,
        exams: state.exams.map((exam) =>
          exam._id === action.payload._id ? action.payload : exam
        ),
      };

    case "DELETE_EXAM":
      return {
        ...state,
        exams: state.exams.filter((exam) => exam._id !== action.payload),
      };

    case "SET_SELECTED_TENANT":
      return {
        ...state,
        selectedTenant: action.payload,
      };

    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen,
      };

    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...action.payload,
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        ],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (n) => n.id !== action.payload
        ),
      };

    default:
      return state;
  }
}

// Context
interface AppContextType {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
