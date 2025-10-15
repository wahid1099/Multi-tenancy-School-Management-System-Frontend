import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { useAuth } from '../../contexts/AuthContext';
import { Plus, AlertCircle } from 'lucide-react';

export const Notices: React.FC = () => {
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const isAdmin = user?.role === 'admin';

  const notices = [
    {
      id: 1,
      title: 'Annual Sports Day - October 15th',
      content: 'All students are requested to participate in the annual sports day. Registration closes on October 10th.',
      priority: 'high',
      date: '2025-09-28',
      author: 'Admin Office',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      content: 'Parent-teacher meeting scheduled for October 10th. Parents are requested to attend.',
      priority: 'normal',
      date: '2025-09-25',
      author: 'Principal',
    },
    {
      id: 3,
      title: 'Holiday Notice - Gandhi Jayanti',
      content: 'School will remain closed on October 2nd for Gandhi Jayanti.',
      priority: 'normal',
      date: '2025-09-20',
      author: 'Admin Office',
    },
    {
      id: 4,
      title: 'Library Timings Updated',
      content: 'Library will now be open from 8:00 AM to 6:00 PM on all working days.',
      priority: 'low',
      date: '2025-09-18',
      author: 'Librarian',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'danger';
      case 'normal':
        return 'info';
      case 'low':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Notices' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notices & Announcements</h1>
        {isAdmin && (
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus size={18} className="mr-2" />
            Create Notice
          </Button>
        )}
      </div>

      <div className="space-y-4">
        {notices.map((notice) => (
          <Card key={notice.id}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                {notice.priority === 'high' && (
                  <AlertCircle className="text-red-600" size={20} />
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {notice.title}
                </h3>
              </div>
              <Badge variant={getPriorityColor(notice.priority) as any}>
                {notice.priority}
              </Badge>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4">{notice.content}</p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 pt-3 border-t border-gray-200 dark:border-gray-700">
              <span>Posted by: {notice.author}</span>
              <span>{notice.date}</span>
            </div>
          </Card>
        ))}
      </div>

      {isAdmin && (
        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Notice"
          size="lg"
        >
          <div className="space-y-4">
            <Input label="Title" placeholder="Enter notice title" />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Content
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                rows={5}
                placeholder="Enter notice content"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Priority
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Target Audience
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                  <option>All</option>
                  <option>Students</option>
                  <option>Teachers</option>
                  <option>Parents</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button>Publish Notice</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};