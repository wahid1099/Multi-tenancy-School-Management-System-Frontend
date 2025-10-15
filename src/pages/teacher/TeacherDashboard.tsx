import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { BookOpen, ClipboardList, Calendar, Users } from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const upcomingClasses = [
    { subject: 'Mathematics - Grade 10A', time: '10:00 AM', room: 'Room 301' },
    { subject: 'Mathematics - Grade 10B', time: '2:00 PM', room: 'Room 301' },
    { subject: 'Calculus - Grade 12', time: '4:00 PM', room: 'Room 305' },
  ];

  const pendingGrading = [
    { assignment: 'Calculus Assignment 5', class: 'Grade 12', submissions: 28 },
    { assignment: 'Math Quiz 3', class: 'Grade 10A', submissions: 32 },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Teacher Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Classes"
          value="5"
          icon={BookOpen}
          iconColor="bg-indigo-600"
        />
        <StatCard
          title="Total Students"
          value="156"
          icon={Users}
          iconColor="bg-green-600"
        />
        <StatCard
          title="Pending Grading"
          value="60"
          icon={ClipboardList}
          iconColor="bg-amber-500"
        />
        <StatCard
          title="Today's Classes"
          value="3"
          icon={Calendar}
          iconColor="bg-red-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Schedule</h2>
          <div className="space-y-3">
            {upcomingClasses.map((classItem, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{classItem.subject}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{classItem.room}</p>
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{classItem.time}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Grading</h2>
          <div className="space-y-3">
            {pendingGrading.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.assignment}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.class}</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 rounded-full text-sm font-medium">
                  {item.submissions}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};