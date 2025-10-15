import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus, Search } from 'lucide-react';

export const SchoolManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const schools = [
    {
      id: 1,
      name: 'Lincoln High School',
      email: 'admin@lincoln.edu',
      students: 1245,
      teachers: 85,
      plan: 'Premium',
      status: 'active',
    },
    {
      id: 2,
      name: 'Washington Academy',
      email: 'admin@washington.edu',
      students: 890,
      teachers: 62,
      plan: 'Basic',
      status: 'active',
    },
    {
      id: 3,
      name: 'Jefferson Institute',
      email: 'admin@jefferson.edu',
      students: 1567,
      teachers: 102,
      plan: 'Premium',
      status: 'active',
    },
  ];

  const columns = [
    { key: 'name', header: 'School Name' },
    { key: 'email', header: 'Contact Email' },
    {
      key: 'users',
      header: 'Users',
      render: (_: any, row: any) => `${row.students + row.teachers}`,
    },
    {
      key: 'plan',
      header: 'Plan',
      render: (value: string) => (
        <Badge variant={value === 'Premium' ? 'success' : 'info'}>
          {value}
        </Badge>
      ),
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
            View
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Schools' }]} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">School Management</h1>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search schools..."
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300"
            />
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={18} className="mr-2" />
            Add School
          </Button>
        </div>
      </div>

      <Card padding={false}>
        <Table columns={columns} data={schools} />
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New School"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="School Name" placeholder="Enter school name" />
          <Input label="Email" type="email" placeholder="admin@school.edu" />
          <Input label="Phone" placeholder="Enter phone number" />
          <Input label="Address" placeholder="Enter address" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subscription Plan
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>Basic - $2,500/month</option>
              <option>Premium - $5,000/month</option>
              <option>Enterprise - Custom</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Add School</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};