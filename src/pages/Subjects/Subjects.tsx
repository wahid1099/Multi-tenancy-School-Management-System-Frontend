import React, { useState, useEffect } from "react";
import { Plus, Search, Filter, Edit, Trash2, BookOpen } from "lucide-react";
import { useApp } from "../../contexts/AppContext";
import { useApi } from "../../hooks/useApi";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Select } from "../../components/UI/Select";
import { Table } from "../../components/UI/Table";
import { Modal } from "../../components/UI/Modal";
import { Subject } from "../../types";

export const Subjects: React.FC = () => {
  const { state } = useApp();
  const { fetchSubjects, createSubject, updateSubject, deleteSubject } =
    useApi();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    category: "core",
    credits: 1,
    prerequisites: [] as string[],
  });

  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSubject) {
        await updateSubject(editingSubject._id, formData);
      } else {
        await createSubject(formData);
      }
      setShowModal(false);
      resetForm();
      fetchSubjects();
    } catch (error) {
      console.error("Error saving subject:", error);
    }
  };

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description,
      category: subject.category,
      credits: subject.credits,
      prerequisites: subject.prerequisites,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      try {
        await deleteSubject(id);
        fetchSubjects();
      } catch (error) {
        console.error("Error deleting subject:", error);
      }
    }
  };

  const resetForm = () => {
    setEditingSubject(null);
    setFormData({
      name: "",
      code: "",
      description: "",
      category: "core",
      credits: 1,
      prerequisites: [],
    });
  };

  const filteredSubjects = state.subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !categoryFilter || subject.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const columns = [
    {
      key: "code",
      label: "Code",
      sortable: true,
      render: (code: string) => (
        <span className="font-mono text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          {code}
        </span>
      ),
    },
    {
      key: "name",
      label: "Subject Name",
      sortable: true,
      render: (_: any, subject: Subject) => (
        <div>
          <p className="font-medium">{subject.name}</p>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            {subject.description}
          </p>
        </div>
      ),
    },
    {
      key: "category",
      label: "Category",
      render: (category: string) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            category === "core"
              ? "bg-blue-100 text-blue-800"
              : category === "elective"
              ? "bg-green-100 text-green-800"
              : "bg-purple-100 text-purple-800"
          }`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </span>
      ),
    },
    {
      key: "credits",
      label: "Credits",
      render: (credits: number) => (
        <span className="font-medium">{credits}</span>
      ),
    },
    {
      key: "prerequisites",
      label: "Prerequisites",
      render: (prerequisites: string[], subject: Subject) => (
        <div>
          {prerequisites.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {prerequisites.slice(0, 2).map((prereqId, index) => {
                const prereq = state.subjects.find((s) => s._id === prereqId);
                return (
                  <span
                    key={index}
                    className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                  >
                    {prereq?.code || prereqId}
                  </span>
                );
              })}
              {prerequisites.length > 2 && (
                <span className="text-xs text-gray-500">
                  +{prerequisites.length - 2} more
                </span>
              )}
            </div>
          ) : (
            <span className="text-sm text-gray-500">None</span>
          )}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_: any, subject: Subject) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEdit(subject)}
            className="p-1 text-blue-600 hover:text-blue-800"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDelete(subject._id)}
            className="p-1 text-red-600 hover:text-red-800"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "core", label: "Core" },
    { value: "elective", label: "Elective" },
    { value: "extracurricular", label: "Extracurricular" },
  ];

  const subjectOptions = state.subjects
    .filter((s) => (editingSubject ? s._id !== editingSubject._id : true))
    .map((subject) => ({
      value: subject._id,
      label: `${subject.code} - ${subject.name}`,
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Subjects
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage academic subjects and curriculum
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
          <span>Add Subject</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Subjects
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {state.subjects.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-semibold">C</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Core Subjects
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {state.subjects.filter((s) => s.category === "core").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-semibold">E</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Electives
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {state.subjects.filter((s) => s.category === "elective").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-semibold">A</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Activities
              </p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {
                  state.subjects.filter((s) => s.category === "extracurricular")
                    .length
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <Select
            options={categoryOptions}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            placeholder="Filter by category"
          />
          <Button variant="outline" className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>

      {/* Subjects Table */}
      <Table
        columns={columns}
        data={filteredSubjects}
        loading={state.loading.subjects}
        pagination={state.pagination.subjects}
      />

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          resetForm();
        }}
        title={editingSubject ? "Edit Subject" : "Add New Subject"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Subject Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
            <Input
              label="Subject Code"
              value={formData.code}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  code: e.target.value.toUpperCase(),
                }))
              }
              placeholder="e.g., MATH101"
              required
            />
          </div>

          <Input
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            placeholder="Brief description of the subject"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              options={categoryOptions.filter((opt) => opt.value !== "")}
              value={formData.category}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
              required
            />
            <Input
              label="Credits"
              type="number"
              min="1"
              max="10"
              value={formData.credits}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  credits: parseInt(e.target.value),
                }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prerequisites (Optional)
            </label>
            <div className="space-y-2">
              {subjectOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.prerequisites.includes(option.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          prerequisites: [...prev.prerequisites, option.value],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          prerequisites: prev.prerequisites.filter(
                            (id) => id !== option.value
                          ),
                        }));
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
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
              {editingSubject ? "Update Subject" : "Add Subject"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
