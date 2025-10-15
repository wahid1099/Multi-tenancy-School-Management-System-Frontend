import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { BookOpen, ClipboardList, Calendar, TrendingUp } from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const upcomingExams = [
    { subject: 'Mathematics', date: '2025-10-05', time: '10:00 AM' },
    { subject: 'Physics', date: '2025-10-08', time: '2:00 PM' },
    { subject: 'Chemistry', date: '2025-10-12', time: '10:00 AM' },
  ];

  const dueAssignments = [
    { title: 'Math Assignment 3', subject: 'Mathematics', dueDate: '2025-10-02' },
    { title: 'Lab Report', subject: 'Physics', dueDate: '2025-10-04' },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Attendance"
          value="92%"
          icon={Calendar}
          iconColor="bg-green-600"
          trend={{ value: 2, isPositive: true }}
        />
        <StatCard
          title="Current GPA"
          value="3.8"
          icon={TrendingUp}
          iconColor="bg-indigo-600"
          trend={{ value: 0.2, isPositive: true }}
        />
        <StatCard
          title="Upcoming Exams"
          value={upcomingExams.length}
          icon={ClipboardList}
          iconColor="bg-amber-500"
        />
        <StatCard
          title="Due Assignments"
          value={dueAssignments.length}
          icon={BookOpen}
          iconColor="bg-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Exams</h2>
          <div className="space-y-3">
            {upcomingExams.map((exam, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{exam.subject}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{exam.time}</p>
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{exam.date}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Due Assignments</h2>
          <div className="space-y-3">
            {dueAssignments.map((assignment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{assignment.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.subject}</p>
                </div>
                <p className="text-sm font-medium text-red-600">{assignment.dueDate}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};