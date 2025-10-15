import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { useApi } from "../../hooks/useApi";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Table } from "../../components/UI/Table";
import { Modal } from "../../components/UI/Modal";
import { Student } from "../../types";

export const Students: React.FC = () => {
  const { state } = useApp();
  const { fetchStudents, createStudent, updateStudent, deleteStudent } =
    useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [classFilter, setClassFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    phone: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    class: "",
    status: "active",
  });

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
      } else {
        await createStudent(formData);
      }
      setShowModal(false);
      resetForm();
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      dateOfBirth: new Date(student.dateOfBirth).toISOString().split("T")[0],
      gender: student.gender,
      address: student.address,
      phone: student.phone,
      guardianName: student.guardianName,
      guardianPhone: student.guardianPhone,
      guardianEmail: student.guardianEmail,
      class: student.class,
      status: student.status,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingStudent(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      phone: "",
      guardianName: "",
      guardianPhone: "",
      guardianEmail: "",
      class: "",
      status: "active",
    });
  };

  const filteredStudents = state.students.filter((student) => {
    const matchesSearch =
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = !statusFilter || student.status === statusFilter;
    const matchesClass = !classFilter || student.class === classFilter;

    return matchesSearch && matchesStatus && matchesClass;
  });

  const columns = [
    {
      key: "studentId",
      label: "Student ID",
      sortable: true,
    },
    {
      key: "name",
      label: "Name",
      render: (_: any, student: Student) => (
        <div>
          <p className="font-medium">
            {student.firstName} {student.lastName}
          </p>
          <p className="text-sm text-gray-500">{student.email}</p>
        </div>
      ),
    },
    {
      key: "class",
      label: "Class",
      render: (classId: string) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
          {state.classes.find((c) => c._id === classId)?.name || classId}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "inactive"
              ? "bg-gray-100 text-gray-800"
              : status === "transferred"
              ? "bg-yellow-100 text-yellow-800"
              : status === "graduated"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      ),
    },
    {
      key: "guardianName",
      label: "Guardian",
      render: (_: any, student: Student) => (
        <div>
          <p className="font-medium">{student.guardianName}</p>
          <p className="text-sm text-gray-500">{student.guardianPhone}</p>
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, student: Student) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(student)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(student._id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "transferred", label: "Transferred" },
    { value: "graduated", label: "Graduated" },
    { value: "dropped", label: "Dropped" },
  ];

  const classOptions = [
    { value: "", label: "All Classes" },
    ...state.classes.map((cls) => ({
      value: cls._id,
      label: `${cls.name} - ${cls.section}`,
    })),
  ];

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Students
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage student records and information
          </p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="Filter by status"
          />
          <Select
            options={classOptions}
            value={classFilter}
            onChange={(e) => setClassFilter(e.target.value)}
            placeholder="Filter by class"
          />
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>

      {/* Students Table */}
      <Table
        columns={columns}
        data={filteredStudents}
        loading={state.loading.students}
        pagination={state.pagination.students}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingStudent ? "Edit Student" : "Add New Student"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, firstName: e.target.value }))
              }
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, lastName: e.target.value }))
              }
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
              required
            />
            <Select
              label="Gender"
              options={genderOptions}
              value={formData.gender}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, gender: e.target.value }))
              }
              required
            />
          </div>

          <Input
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            required
          />

          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, phone: e.target.value }))
            }
            required
          />

          <div className="border-t pt-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Guardian Information
            </h4>
            <div className="space-y-4">
              <Input
                label="Guardian Name"
                value={formData.guardianName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    guardianName: e.target.value,
                  }))
                }
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Guardian Phone"
                  value={formData.guardianPhone}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      guardianPhone: e.target.value,
                    }))
                  }
                  required
                />
                <Input
                  label="Guardian Email"
                  type="email"
                  value={formData.guardianEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      guardianEmail: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Class"
              options={classOptions.filter((opt) => opt.value !== "")}
              value={formData.class}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, class: e.target.value }))
              }
              required
            />
            <Select
              label="Status"
              options={statusOptions.filter((opt) => opt.value !== "")}
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingStudent ? "Update Student" : "Add Student"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
