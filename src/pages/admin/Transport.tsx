import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Plus, Bus } from 'lucide-react';

export const Transport: React.FC = () => {
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);

  const routes = [
    {
      id: 1,
      routeNumber: 'Route 1',
      driver: 'David Williams',
      busNumber: 'BUS-001',
      area: 'North Zone',
      students: 45,
      status: 'active',
    },
    {
      id: 2,
      routeNumber: 'Route 2',
      driver: 'Lisa Anderson',
      busNumber: 'BUS-002',
      area: 'South Zone',
      students: 38,
      status: 'active',
    },
    {
      id: 3,
      routeNumber: 'Route 3',
      driver: 'Robert Taylor',
      busNumber: 'BUS-003',
      area: 'East Zone',
      students: 42,
      status: 'maintenance',
    },
  ];

  const stops = [
    { name: 'Main Street', time: '7:30 AM' },
    { name: 'Park Avenue', time: '7:40 AM' },
    { name: 'Central Square', time: '7:50 AM' },
    { name: 'School Gate', time: '8:00 AM' },
  ];

  const columns = [
    { key: 'routeNumber', header: 'Route' },
    { key: 'driver', header: 'Driver' },
    { key: 'busNumber', header: 'Bus Number' },
    { key: 'area', header: 'Area' },
    {
      key: 'students',
      header: 'Students',
      render: (value: number) => `${value} students`,
    },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            View
          </Button>
          <Button size="sm" variant="outline">
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Transport' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Transport Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div className="flex items-center space-x-3">
            <Bus className="text-indigo-600" size={32} />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Buses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
            </div>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Routes</p>
            <p className="text-2xl font-bold text-green-600">10</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
            <p className="text-2xl font-bold text-indigo-600">485</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
            <p className="text-2xl font-bold text-amber-500">2</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2" padding={false}>
          <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Bus Routes</h2>
            <Button onClick={() => setShowAddRouteModal(true)}>
              <Plus size={18} className="mr-2" />
              Add Route
            </Button>
          </div>
          <Table columns={columns} data={routes} />
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Route 1 - Schedule
          </h2>
          <div className="space-y-3">
            {stops.map((stop, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{stop.name}</p>
                </div>
                <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {stop.time}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showAddRouteModal}
        onClose={() => setShowAddRouteModal(false)}
        title="Add New Route"
        size="lg"
      >
        <div className="space-y-4">
          <Input label="Route Number" placeholder="e.g., Route 4" />
          <Input label="Area Coverage" placeholder="e.g., West Zone" />

          <div className="grid grid-cols-2 gap-4">
            <Input label="Bus Number" placeholder="e.g., BUS-004" />
            <Input label="Capacity" type="number" placeholder="50" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Assign Driver
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
              <option>David Williams</option>
              <option>Lisa Anderson</option>
              <option>Robert Taylor</option>
            </select>
          </div>

          <Input label="Driver Contact" placeholder="Enter phone number" />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Route Stops
            </label>
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Stop name" />
                <Input type="time" placeholder="Time" />
              </div>
              <Button variant="outline" size="sm" className="w-full">
                + Add Stop
              </Button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddRouteModal(false)}>
              Cancel
            </Button>
            <Button>Add Route</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};