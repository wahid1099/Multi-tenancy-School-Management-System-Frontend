import React from 'react';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Badge } from '../../components/ui/Badge';
import { Clock, User } from 'lucide-react';

export const MyClasses: React.FC = () => {
  const classes = [
    {
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      schedule: 'Mon, Wed, Fri - 10:00 AM',
      room: 'Room 301',
      status: 'active',
    },
    {
      subject: 'Physics',
      teacher: 'Prof. Michael Brown',
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'Lab 201',
      status: 'active',
    },
    {
      subject: 'Chemistry',
      teacher: 'Dr. Emily Davis',
      schedule: 'Mon, Wed - 1:00 PM',
      room: 'Lab 202',
      status: 'active',
    },
    {
      subject: 'English Literature',
      teacher: 'Ms. Jennifer Wilson',
      schedule: 'Tue, Thu, Fri - 11:00 AM',
      room: 'Room 105',
      status: 'active',
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'My Classes' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">My Classes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem, index) => (
          <Card key={index}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{classItem.subject}</h3>
              <Badge variant="success">{classItem.status}</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <User size={16} className="mr-2" />
                <span className="text-sm">{classItem.teacher}</span>
              </div>

              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <Clock size={16} className="mr-2" />
                <span className="text-sm">{classItem.schedule}</span>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">{classItem.room}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};