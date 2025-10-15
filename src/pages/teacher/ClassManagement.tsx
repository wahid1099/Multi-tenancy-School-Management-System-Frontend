import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Users, Clock } from 'lucide-react';

export const ClassManagement: React.FC = () => {
  const classes = [
    {
      name: 'Mathematics - Grade 10A',
      students: 32,
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Room 301',
    },
    {
      name: 'Mathematics - Grade 10B',
      students: 30,
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      room: 'Room 301',
    },
    {
      name: 'Calculus - Grade 12',
      students: 28,
      schedule: 'Tue, Thu - 4:00 PM',
      room: 'Room 305',
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Class Management' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem, index) => (
          <Card key={index}>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {classItem.name}
            </h3>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Users size={16} className="mr-2" />
                <span className="text-sm">{classItem.students} Students</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">{classItem.schedule}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">{classItem.room}</p>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              View Students
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};