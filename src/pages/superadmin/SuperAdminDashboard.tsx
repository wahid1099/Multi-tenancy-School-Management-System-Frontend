import React from 'react';
import { StatCard } from '../../components/ui/StatCard';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Building2, Users, DollarSign, TrendingUp } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export const SuperAdminDashboard: React.FC = () => {
  const schools = [
    { name: 'Lincoln High School', students: 1245, status: 'active', plan: 'Premium' },
    { name: 'Washington Academy', students: 890, status: 'active', plan: 'Basic' },
    { name: 'Jefferson Institute', students: 1567, status: 'active', plan: 'Premium' },
  ];

  const recentSubscriptions = [
    { school: 'Lincoln High School', amount: 5000, date: '2025-09-28', status: 'paid' },
    { school: 'Washington Academy', amount: 2500, date: '2025-09-25', status: 'paid' },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Super Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Schools"
          value="24"
          icon={Building2}
          iconColor="bg-indigo-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Users"
          value="32,450"
          icon={Users}
          iconColor="bg-green-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Monthly Revenue"
          value="$125K"
          icon={DollarSign}
          iconColor="bg-amber-500"
          trend={{ value: 15, isPositive: true }}
        />
        <StatCard
          title="Active Subscriptions"
          value="22"
          icon={TrendingUp}
          iconColor="bg-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Schools</h2>
          <div className="space-y-3">
            {schools.map((school, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{school.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{school.students} Students</p>
                </div>
                <Badge variant={school.plan === 'Premium' ? 'success' : 'info'}>
                  {school.plan}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Payments</h2>
          <div className="space-y-3">
            {recentSubscriptions.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.school}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-green-600">${item.amount}</p>
                  <Badge variant="success" className="mt-1">
                    {item.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};