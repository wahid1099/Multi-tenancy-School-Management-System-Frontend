import React from 'react';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Badge } from '../../components/ui/Badge';

export const Attendance: React.FC = () => {
  const monthlyAttendance = [
    { month: 'September', present: 20, absent: 1, late: 1, total: 22, percentage: 91 },
    { month: 'August', present: 22, absent: 0, late: 0, total: 22, percentage: 100 },
    { month: 'July', present: 19, absent: 2, late: 1, total: 22, percentage: 86 },
  ];

  const recentAttendance = [
    { date: '2025-09-28', status: 'present' },
    { date: '2025-09-27', status: 'present' },
    { date: '2025-09-26', status: 'late' },
    { date: '2025-09-25', status: 'present' },
    { date: '2025-09-24', status: 'absent' },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'danger'> = {
      present: 'success',
      late: 'warning',
      absent: 'danger',
    };
    return <Badge variant={variants[status]}>{status}</Badge>;
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Attendance' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Attendance</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Overall</p>
            <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">92%</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Present</p>
            <p className="text-3xl font-bold text-green-600">61</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Absent</p>
            <p className="text-3xl font-bold text-red-600">3</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Late</p>
            <p className="text-3xl font-bold text-amber-500">2</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Summary</h2>
          <div className="space-y-3">
            {monthlyAttendance.map((item, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">{item.month}</p>
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {item.percentage}%
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Present: {item.present}</span>
                  <span>Absent: {item.absent}</span>
                  <span>Late: {item.late}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Attendance</h2>
          <div className="space-y-3">
            {recentAttendance.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <p className="text-gray-900 dark:text-white">{item.date}</p>
                {getStatusBadge(item.status)}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};