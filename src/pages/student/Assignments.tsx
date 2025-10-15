import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { FileText, Upload } from 'lucide-react';

export const Assignments: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  const assignments = [
    {
      id: 1,
      title: 'Calculus Problem Set 3',
      subject: 'Mathematics',
      dueDate: '2025-10-02',
      status: 'pending',
      totalMarks: 100,
    },
    {
      id: 2,
      title: 'Lab Report - Mechanics',
      subject: 'Physics',
      dueDate: '2025-10-04',
      status: 'pending',
      totalMarks: 50,
    },
    {
      id: 3,
      title: 'Chemical Reactions Essay',
      subject: 'Chemistry',
      dueDate: '2025-09-28',
      status: 'submitted',
      totalMarks: 100,
      marksObtained: 85,
    },
  ];

  const columns = [
    { key: 'title', header: 'Assignment' },
    { key: 'subject', header: 'Subject' },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'submitted' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'marks',
      header: 'Marks',
      render: (_: any, row: any) =>
        row.status === 'submitted' && row.marksObtained
          ? `${row.marksObtained}/${row.totalMarks}`
          : `${row.totalMarks}`,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) => (
        <Button
          size="sm"
          onClick={() => {
            setSelectedAssignment(row);
            setShowSubmitModal(true);
          }}
          disabled={row.status === 'submitted'}
        >
          {row.status === 'submitted' ? 'Submitted' : 'Submit'}
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Assignments' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assignments</h1>
      </div>

      <Card padding={false}>
        <Table columns={columns} data={assignments} />
      </Card>

      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Assignment"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {selectedAssignment?.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Subject: {selectedAssignment?.subject}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Due Date: {selectedAssignment?.dueDate}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Submission Text
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              placeholder="Enter your submission..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Upload File
            </label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
              <Upload className="mx-auto text-gray-400 mb-2" size={32} />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Click to upload or drag and drop
              </p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowSubmitModal(false)}>
              Cancel
            </Button>
            <Button>Submit Assignment</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};