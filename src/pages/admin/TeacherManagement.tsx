import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus, Search } from 'lucide-react';

export const TeacherManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const teachers = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@school.com',
      subject: 'Mathematics',
      classes: 3,
      status: 'active',
    },
    {
      id: 2,
      name: 'Prof. Michael Brown',
      email: 'michael.b@school.com',
      subject: 'Physics',
      classes: 2,
      status: 'active',
    },
    {
      id: 3,
      name: 'Dr. Emily Davis',
      email: 'emily.d@school.com',
      subject: 'Chemistry',
      classes: 2,
      status: 'active',
    },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'subject', header: 'Subject' },
    {
      key: 'classes',
      header: 'Classes',
      render: (value: number) => `${value} classes`,
    },
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
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Teachers' }]} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Teacher Management</h1>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search teachers..."
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300"
            />
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={18} className="mr-2" />
            Add Teacher
          </Button>
        </div>
      </div>

      <Card padding={false}>
        <Table columns={columns} data={teachers} />
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Teacher"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Enter first name" />
            <Input label="Last Name" placeholder="Enter last name" />
          </div>

          <Input label="Email" type="email" placeholder="teacher@school.com" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Subject
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>English</option>
                <option>History</option>
              </select>
            </div>
            <Input label="Qualification" placeholder="e.g., Ph.D., M.Sc." />
          </div>

          <Input label="Phone" placeholder="Enter phone number" />
          <Input label="Address" placeholder="Enter address" />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Add Teacher</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};