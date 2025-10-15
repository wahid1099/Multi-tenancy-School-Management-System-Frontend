import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Users, GraduationCap, DollarSign, Calendar, TrendingUp } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const recentEvents = [
    { title: 'Annual Sports Day', date: '2025-10-15', type: 'Sports' },
    { title: 'Parent-Teacher Meeting', date: '2025-10-10', type: 'Academic' },
    { title: 'Science Fair', date: '2025-10-20', type: 'Academic' },
  ];

  const feeCollection = [
    { month: 'September', collected: 85000, pending: 15000 },
    { month: 'August', collected: 90000, pending: 10000 },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <StatCard
          title="Total Students"
          value="1,245"
          icon={Users}
          iconColor="bg-indigo-600"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Teachers"
          value="85"
          icon={GraduationCap}
          iconColor="bg-green-600"
        />
        <StatCard
          title="Fee Collection"
          value="$85K"
          icon={DollarSign}
          iconColor="bg-amber-500"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Avg Attendance"
          value="92%"
          icon={Calendar}
          iconColor="bg-blue-600"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Active Classes"
          value="45"
          icon={TrendingUp}
          iconColor="bg-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {recentEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{event.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{event.type}</p>
                </div>
                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{event.date}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Fee Collection Summary</h2>
          <div className="space-y-3">
            {feeCollection.map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-gray-900 dark:text-white">{item.month}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600">Collected</span>
                    <span className="font-medium text-gray-900 dark:text-white">${item.collected.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-amber-500">Pending</span>
                    <span className="font-medium text-gray-900 dark:text-white">${item.pending.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};