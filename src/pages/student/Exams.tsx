import React from 'react';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Download } from 'lucide-react';

export const Exams: React.FC = () => {
  const exams = [
    { subject: 'Mathematics', date: '2025-10-05', time: '10:00 AM', totalMarks: 100, obtained: null, status: 'upcoming' },
    { subject: 'Physics', date: '2025-10-08', time: '2:00 PM', totalMarks: 100, obtained: null, status: 'upcoming' },
    { subject: 'Chemistry', date: '2025-09-20', time: '10:00 AM', totalMarks: 100, obtained: 85, status: 'completed' },
    { subject: 'English', date: '2025-09-15', time: '11:00 AM', totalMarks: 100, obtained: 92, status: 'completed' },
  ];

  const columns = [
    { key: 'subject', header: 'Subject' },
    { key: 'date', header: 'Date' },
    { key: 'time', header: 'Time' },
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
      key: 'marks',
      header: 'Marks',
      render: (_: any, row: any) =>
        row.obtained !== null ? `${row.obtained}/${row.totalMarks}` : '-',
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Exams & Results' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Exams & Results</h1>
        <Button>
          <Download size={18} className="mr-2" />
          Download Report Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall GPA</p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">3.8</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Out of 4.0</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Average Score</p>
            <p className="text-3xl font-bold text-green-600">88.5%</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">This semester</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Class Rank</p>
            <p className="text-3xl font-bold text-amber-500">5th</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">Out of 120 students</p>
          </div>
        </Card>
      </div>

      <Card padding={false}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Exam Schedule & Results</h2>
        </div>
        <Table columns={columns} data={exams} />
      </Card>
    </div>
  );
};