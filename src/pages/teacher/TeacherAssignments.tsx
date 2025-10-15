import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus } from 'lucide-react';

export const TeacherAssignments: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const assignments = [
    {
      id: 1,
      title: 'Calculus Assignment 5',
      class: 'Grade 12',
      dueDate: '2025-10-05',
      submissions: 28,
      total: 28,
      status: 'active',
    },
    {
      id: 2,
      title: 'Math Quiz 3',
      class: 'Grade 10A',
      dueDate: '2025-10-03',
      submissions: 25,
      total: 32,
      status: 'active',
    },
    {
      id: 3,
      title: 'Geometry Problem Set',
      class: 'Grade 10B',
      dueDate: '2025-09-28',
      submissions: 30,
      total: 30,
      status: 'completed',
    },
  ];

  const columns = [
    { key: 'title', header: 'Assignment' },
    { key: 'class', header: 'Class' },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'submissions',
      header: 'Submissions',
      render: (_: any, row: any) => `${row.submissions}/${row.total}`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'completed' ? 'success' : 'info'}>
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
            Grade
          </Button>
          <Button size="sm" variant="outline">
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Assignments' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={18} className="mr-2" />
          Create Assignment
        </Button>
      </div>

      <Card padding={false}>
        <Table columns={columns} data={assignments} />
      </Card>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create Assignment"
        size="md"
      >
        <div className="space-y-4">
          <Input label="Assignment Title" placeholder="Enter assignment title" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Class
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>Grade 10A - Mathematics</option>
              <option>Grade 10B - Mathematics</option>
              <option>Grade 12 - Calculus</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Enter assignment description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Due Date" type="date" />
            <Input label="Total Marks" type="number" placeholder="100" />
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button>Create Assignment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};