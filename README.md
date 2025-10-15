# 🎓 School Management System Frontend

A comprehensive **multi-tenant school management system frontend** built with React, TypeScript, and Tailwind CSS. This production-ready frontend provides complete academic, administrative, and financial management capabilities for educational institutions.

## 🌟 **Key Features**

### 🏢 **Multi-Tenant Architecture**

- **Complete Tenant Isolation**: Each school operates independently
- **Role-Based Access Control**: Admin, Tenant Admin, Teacher, Student, Parent roles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🔐 **Authentication & Security**

- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Demo Mode**: Try different user roles without backend setup
- **Protected Routes**: Role-based route protection

### 📚 **Complete Academic Management**

- **Student Management**: Complete student lifecycle management
- **Subject Management**: Subject creation with prerequisites and categories
- **Class Management**: Class creation and student enrollment
- **Attendance System**: Daily tracking and reporting
- **Examination System**: Exam scheduling and management
- **Grade Management**: Grade recording and reporting
- **Timetable System**: Schedule management

### 💰 **Financial Management**

- **Fee Management**: Fee structure and payment tracking
- **Payment Processing**: Multiple payment method support
- **Financial Reports**: Collection analytics and reporting

### 📊 **Analytics & Reporting**

- **Role-Based Dashboards**: Customized views for each user type
- **Real-Time Statistics**: Live metrics and performance data
- **Comprehensive Reports**: Academic and financial summaries

## 🚀 **Quick Start**

### **Prerequisites**

- **Node.js** v18 or higher
- **npm** or **yarn**

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd Multi-tenancy-School-Management-System-Frontend-test

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### **Demo Mode**

The frontend includes a demo mode that allows you to test all features without a backend:

1. Start the development server
2. Navigate to the login page
3. Click "Demo Mode"
4. Select any role to explore the system

## 🏗️ **System Architecture**

### **Project Structure**

```
src/
├── components/           # Reusable UI components
│   ├── Layout/          # Layout components (Sidebar, Header, etc.)
│   └── UI/              # Basic UI components (Button, Input, etc.)
├── contexts/            # React contexts for state management
│   ├── AuthContext.tsx  # Authentication state
│   ├── AppContext.tsx   # Global application state
│   └── ThemeContext.tsx # Theme management
├── hooks/               # Custom React hooks
│   └── useApi.ts        # API integration hooks
├── pages/               # Page components
│   ├── Dashboard.tsx    # Main dashboard
│   ├── Students/        # Student management pages
│   ├── Subjects/        # Subject management pages
│   └── Login.tsx        # Authentication page
├── services/            # API services
│   └── api.ts           # API service layer
├── types/               # TypeScript type definitions
│   └── index.ts         # All type definitions
└── routes/              # Routing configuration
    └── index.tsx        # Main routing setup
```

## 🎯 **Features by Role**

### **System Admin**

- Multi-tenant management
- Global system oversight
- Subscription management
- System-wide analytics

### **School Admin (Tenant Admin)**

- User management within school
- Academic structure setup
- Financial management
- School-specific reports

### **Teacher**

- Class management
- Attendance tracking
- Exam creation and grading
- Student progress monitoring

### **Student**

- Personal dashboard
- Schedule viewing
- Grade checking
- Assignment submission

### **Parent**

- Child's academic progress
- Fee payment
- Communication with teachers
- Event notifications

## 🔧 **Technical Stack**

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with dark mode support
- **Routing**: React Router v6
- **State Management**: React Context + useReducer
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Code Quality**: ESLint + TypeScript

## 🎨 **UI/UX Features**

- **Dark/Light Mode**: Toggle between themes
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant components
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Notifications**: Toast notifications for user feedback

## 🔗 **API Integration**

The frontend is designed to work with the School Management System Backend:

- **Base URL**: `http://localhost:3000/api/v1`
- **Authentication**: JWT tokens with automatic refresh
- **Multi-tenant**: Automatic tenant header injection
- **Error Handling**: Centralized error management

### **API Service Structure**

```typescript
// Authentication
await apiService.login(credentials);
await apiService.logout();

// Students
await apiService.getStudents(params);
await apiService.createStudent(data);
await apiService.updateStudent(id, data);

// Subjects
await apiService.getSubjects(params);
await apiService.createSubject(data);

// And more...
```

## 🚀 **Deployment**

### **Build for Production**

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### **Environment Variables**

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME=School Management System
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 **Support**

- **Issues**: Create an issue on GitHub
- **Documentation**: Check the inline code documentation
- **Community**: Join our Discord server

---

## 🎉 **Ready to Get Started?**

```bash
# Quick start
npm install
npm run dev

# Open http://localhost:5173 and try the demo mode!
```

**Built with ❤️ for educational institutions worldwide** 🌍
"# Multi-tenancy-School-Management-System-Frontend" 
