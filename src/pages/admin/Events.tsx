import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Plus, Calendar, MapPin, Clock } from 'lucide-react';

export const Events: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  const events = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: '2025-10-15',
      time: '9:00 AM',
      location: 'School Stadium',
      type: 'Sports',
      description: 'Annual inter-class sports competition with various events.',
      participants: 450,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: '2025-10-10',
      time: '2:00 PM',
      location: 'School Auditorium',
      type: 'Academic',
      description: 'Quarterly parent-teacher meeting to discuss student progress.',
      participants: 300,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Science Fair',
      date: '2025-10-20',
      time: '10:00 AM',
      location: 'Science Labs',
      type: 'Academic',
      description: 'Students showcase their science projects and experiments.',
      participants: 200,
      status: 'upcoming',
    },
    {
      id: 4,
      title: 'Cultural Festival',
      date: '2025-09-25',
      time: '6:00 PM',
      location: 'School Auditorium',
      type: 'Cultural',
      description: 'Annual cultural program featuring music, dance, and drama.',
      participants: 500,
      status: 'completed',
    },
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'Sports':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200';
      case 'Academic':
        return 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-200';
      case 'Cultural':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Events' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Events Management</h1>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus size={18} className="mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${getEventColor(event.type)}`}>
                    {event.type}
                  </div>
                </div>
                <Badge variant={event.status === 'upcoming' ? 'info' : 'success'}>
                  {event.status}
                </Badge>
              </div>

              <p className="text-gray-600 dark:text-gray-400 mb-4">{event.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">{event.date}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <Clock size={16} className="mr-2" />
                  <span className="text-sm">{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                  <MapPin size={16} className="mr-2" />
                  <span className="text-sm">{event.location}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {event.participants} participants
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  {event.status === 'upcoming' && (
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Event Calendar</h3>
            <div className="space-y-2">
              {events
                .filter((e) => e.status === 'upcoming')
                .map((event) => (
                  <div
                    key={event.id}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {event.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {event.date} • {event.time}
                    </p>
                  </div>
                ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Events</span>
                <span className="text-lg font-bold text-indigo-600">{events.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Upcoming</span>
                <span className="text-lg font-bold text-green-600">
                  {events.filter((e) => e.status === 'upcoming').length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">This Month</span>
                <span className="text-lg font-bold text-amber-500">3</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Event"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="Event Title" placeholder="Enter event title" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
              rows={3}
              placeholder="Enter event description"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Event Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Academic</option>
                <option>Sports</option>
                <option>Cultural</option>
                <option>Other</option>
              </select>
            </div>
            <Input label="Location" placeholder="Enter location" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input label="Date" type="date" />
            <Input label="Start Time" type="time" />
            <Input label="End Time" type="time" />
          </div>

          <Input
            label="Expected Participants"
            type="number"
            placeholder="Enter number"
          />

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button>Create Event</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};