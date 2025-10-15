import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus, Search, BookOpen } from 'lucide-react';

export const Library: React.FC = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);

  const books = [
    {
      id: 1,
      title: 'Advanced Mathematics',
      author: 'John Smith',
      isbn: '978-3-16-148410-0',
      category: 'Mathematics',
      copies: 5,
      available: 3,
      status: 'available',
    },
    {
      id: 2,
      title: 'Physics Fundamentals',
      author: 'Sarah Johnson',
      isbn: '978-0-12-345678-9',
      category: 'Physics',
      copies: 4,
      available: 1,
      status: 'available',
    },
    {
      id: 3,
      title: 'Chemistry Basics',
      author: 'Michael Brown',
      isbn: '978-1-23-456789-0',
      category: 'Chemistry',
      copies: 3,
      available: 0,
      status: 'unavailable',
    },
  ];

  const issuedBooks = [
    {
      id: 1,
      bookTitle: 'Advanced Mathematics',
      studentName: 'John Doe',
      issueDate: '2025-09-20',
      dueDate: '2025-10-05',
      status: 'issued',
    },
    {
      id: 2,
      bookTitle: 'Physics Fundamentals',
      studentName: 'Jane Smith',
      issueDate: '2025-09-15',
      dueDate: '2025-09-30',
      status: 'overdue',
    },
  ];

  const bookColumns = [
    { key: 'title', header: 'Title' },
    { key: 'author', header: 'Author' },
    { key: 'category', header: 'Category' },
    {
      key: 'availability',
      header: 'Availability',
      render: (_: any, row: any) => `${row.available}/${row.copies}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'available' ? 'success' : 'danger'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            disabled={row.available === 0}
            onClick={() => setShowIssueModal(true)}
          >
            Issue
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  const issuedColumns = [
    { key: 'bookTitle', header: 'Book Title' },
    { key: 'studentName', header: 'Student' },
    { key: 'issueDate', header: 'Issue Date' },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'overdue' ? 'danger' : 'success'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => <Button size="sm">Return</Button>,
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Library' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Library Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="flex items-center space-x-3">
            <BookOpen className="text-indigo-600" size={32} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Books</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,245</p>
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Available</p>
            <p className="text-2xl font-bold text-green-600">892</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Issued</p>
            <p className="text-2xl font-bold text-amber-500">353</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Overdue</p>
            <p className="text-2xl font-bold text-red-600">12</p>
          </div>
        </Card>
      </div>

      <Card padding={false} className="mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Book Collection</h2>

          <div className="flex items-center space-x-3">
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-lg px-3 py-2">
              <Search size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search books..."
                className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300"
              />
            </div>
            <Button onClick={() => setShowAddBookModal(true)}>
              <Plus size={18} className="mr-2" />
              Add Book
            </Button>
          </div>
        </div>
        <Table columns={bookColumns} data={books} />
      </Card>

      <Card padding={false}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Issued Books</h2>
        </div>
        <Table columns={issuedColumns} data={issuedBooks} />
      </Card>

      <Modal
        isOpen={showAddBookModal}
        onClose={() => setShowAddBookModal(false)}
        title="Add New Book"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="Book Title" placeholder="Enter book title" />
          <Input label="Author" placeholder="Enter author name" />
          <Input label="ISBN" placeholder="978-X-XX-XXXXXX-X" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>English</option>
                <option>Fiction</option>
              </select>
            </div>
            <Input label="Number of Copies" type="number" placeholder="5" />
          </div>

          <Input label="Publisher" placeholder="Enter publisher name" />
          <Input label="Publication Year" type="number" placeholder="2025" />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddBookModal(false)}>
              Cancel
            </Button>
            <Button>Add Book</Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showIssueModal}
        onClose={() => setShowIssueModal(false)}
        title="Issue Book"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Student
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>John Doe - Grade 10A</option>
              <option>Jane Smith - Grade 10B</option>
              <option>Mike Johnson - Grade 12</option>
            </select>
          </div>

          <Input label="Issue Date" type="date" defaultValue={new Date().toISOString().split('T')[0]} />
          <Input label="Due Date" type="date" />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowIssueModal(false)}>
              Cancel
            </Button>
            <Button>Issue Book</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};