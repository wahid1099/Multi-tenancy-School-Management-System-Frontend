import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus, Search } from 'lucide-react';

export const AdminAccounts: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const admins = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@lincoln.edu',
      school: 'Lincoln High School',
      role: 'School Admin',
      status: 'active',
      lastLogin: '2025-09-28',
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@washington.edu',
      school: 'Washington Academy',
      role: 'School Admin',
      status: 'active',
      lastLogin: '2025-09-27',
    },
    {
      id: 3,
      name: 'Michael Brown',
      email: 'michael.b@jefferson.edu',
      school: 'Jefferson Institute',
      role: 'School Admin',
      status: 'active',
      lastLogin: '2025-09-28',
    },
  ];

  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'school', header: 'School' },
    { key: 'role', header: 'Role' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'danger'}>
          {value}
        </Badge>
      ),
    },
    { key: 'lastLogin', header: 'Last Login' },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm" variant="danger">
            Suspend
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Admin Accounts' }]} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Account Management</h1>

        <div className="flex items-center space-x-3">
          <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search admins..."
              className="bg-transparent border-none outline-none text-gray-700 dark:text-gray-300"
            />
          </div>
          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={18} className="mr-2" />
            Add Admin
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Admins</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p className="text-2xl font-bold text-green-600">22</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Suspended</p>
            <p className="text-2xl font-bold text-red-600">2</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">New This Month</p>
            <p className="text-2xl font-bold text-indigo-600">3</p>
          </div>
        </Card>
      </div>

      <Card padding={false}>
        <Table columns={columns} data={admins} />
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Admin"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" placeholder="Enter first name" />
            <Input label="Last Name" placeholder="Enter last name" />
          </div>

          <Input label="Email" type="email" placeholder="admin@school.edu" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assign School
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>Lincoln High School</option>
              <option>Washington Academy</option>
              <option>Jefferson Institute</option>
            </select>
          </div>

          <Input label="Phone" placeholder="Enter phone number" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Permissions
            </label>
            <div className="space-y-2 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Manage Students
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Manage Teachers
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" defaultChecked />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Manage Finances
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  System Settings
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Add Admin</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};