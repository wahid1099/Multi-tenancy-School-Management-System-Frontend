import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus, Search } from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@school.com',
      class: 'Grade 10A',
      status: 'active',
      attendance: '92%',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@school.com',
      class: 'Grade 10B',
      status: 'active',
      attendance: '95%',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike.j@school.com',
      class: 'Grade 12',
      status: 'active',
      attendance: '88%',
    },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'class', header: 'Class' },
    { key: 'attendance', header: 'Attendance' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'danger'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Students' }]} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h1>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search students..."
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300"
            />
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={18} className="mr-2" />
            Add Student
          </Button>
        </div>
      </div>

      <Card padding={false}>
        <Table columns={columns} data={students} />
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Student"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Enter first name" />
            <Input label="Last Name" placeholder="Enter last name" />
          </div>

          <Input label="Email" type="email" placeholder="student@school.com" />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Date of Birth" type="date" />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gender
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>Grade 10A</option>
              <option>Grade 10B</option>
              <option>Grade 11</option>
              <option>Grade 12</option>
            </select>
          </div>

          <Input label="Phone" placeholder="Enter phone number" />
          <Input label="Address" placeholder="Enter address" />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Add Student</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};