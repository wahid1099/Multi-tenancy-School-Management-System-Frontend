import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Plus } from 'lucide-react';

export const Timetable: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('Grade 10A');

  const classes = ['Grade 10A', 'Grade 10B', 'Grade 11', 'Grade 12'];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 - 9:00 AM',
    '9:00 - 10:00 AM',
    '10:00 - 11:00 AM',
    '11:00 - 12:00 PM',
    '12:00 - 1:00 PM',
    '2:00 - 3:00 PM',
    '3:00 - 4:00 PM',
  ];

  const timetable: Record<string, Record<string, string>> = {
    Monday: {
      '8:00 - 9:00 AM': 'Mathematics',
      '9:00 - 10:00 AM': 'Physics',
      '10:00 - 11:00 AM': 'Chemistry',
      '11:00 - 12:00 PM': 'English',
      '12:00 - 1:00 PM': 'Lunch Break',
      '2:00 - 3:00 PM': 'History',
      '3:00 - 4:00 PM': 'Physical Education',
    },
    Tuesday: {
      '8:00 - 9:00 AM': 'Physics',
      '9:00 - 10:00 AM': 'Mathematics',
      '10:00 - 11:00 AM': 'English',
      '11:00 - 12:00 PM': 'Chemistry',
      '12:00 - 1:00 PM': 'Lunch Break',
      '2:00 - 3:00 PM': 'Computer Science',
      '3:00 - 4:00 PM': 'Art',
    },
    Wednesday: {
      '8:00 - 9:00 AM': 'Chemistry',
      '9:00 - 10:00 AM': 'English',
      '10:00 - 11:00 AM': 'Mathematics',
      '11:00 - 12:00 PM': 'Physics',
      '12:00 - 1:00 PM': 'Lunch Break',
      '2:00 - 3:00 PM': 'Biology',
      '3:00 - 4:00 PM': 'Music',
    },
    Thursday: {
      '8:00 - 9:00 AM': 'English',
      '9:00 - 10:00 AM': 'Chemistry',
      '10:00 - 11:00 AM': 'Physics',
      '11:00 - 12:00 PM': 'Mathematics',
      '12:00 - 1:00 PM': 'Lunch Break',
      '2:00 - 3:00 PM': 'Geography',
      '3:00 - 4:00 PM': 'Library',
    },
    Friday: {
      '8:00 - 9:00 AM': 'Mathematics',
      '9:00 - 10:00 AM': 'Physics',
      '10:00 - 11:00 AM': 'English',
      '11:00 - 12:00 PM': 'Lab Session',
      '12:00 - 1:00 PM': 'Lunch Break',
      '2:00 - 3:00 PM': 'Project Work',
      '3:00 - 4:00 PM': 'Sports',
    },
  };

  const getSubjectColor = (subject: string) => {
    if (subject === 'Lunch Break') return 'bg-gray-200 dark:bg-gray-700';
    if (subject.includes('Physical') || subject.includes('Sports')) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
    if (subject.includes('Lab') || subject.includes('Project')) return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200';
    return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200';
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Timetable' }]} />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Timetable Management</h1>

        <div className="flex items-center space-x-3">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
          >
            {classes.map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>

          <Button onClick={() => setShowAddModal(true)}>
            <Plus size={18} className="mr-2" />
            Add Slot
          </Button>
        </div>
      </div>

      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                {days.map((day) => (
                  <th
                    key={day}
                    className="px-4 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {timeSlots.map((slot) => (
                <tr key={slot}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {slot}
                  </td>
                  {days.map((day) => {
                    const subject = timetable[day]?.[slot] || '-';
                    return (
                      <td
                        key={day}
                        className="px-4 py-3 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <div
                          className={`px-3 py-2 rounded-lg text-sm font-medium ${getSubjectColor(
                            subject
                          )}`}
                        >
                          {subject}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Timetable Slot"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Day
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              {days.map((day) => (
                <option key={day}>{day}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input label="Start Time" type="time" />
            <Input label="End Time" type="time" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>Mathematics</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>English</option>
              <option>History</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Teacher
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>Dr. Sarah Johnson</option>
              <option>Prof. Michael Brown</option>
              <option>Dr. Emily Davis</option>
            </select>
          </div>

          <Input label="Room Number" placeholder="e.g., Room 301" />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button>Add Slot</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};