import React from 'react';
import { Card } from '../../components/ui/Card';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { StatCard } from '../../components/ui/StatCard';
import { Building2, Users, GraduationCap, TrendingUp, DollarSign } from 'lucide-react';

export const GlobalAnalytics: React.FC = () => {
  const topSchools = [
    { name: 'Lincoln High School', students: 1245, growth: 8, revenue: 5000 },
    { name: 'Jefferson Institute', students: 1567, growth: 12, revenue: 5000 },
    { name: 'Washington Academy', students: 890, growth: 5, revenue: 2500 },
    { name: 'Roosevelt School', students: 756, growth: 3, revenue: 2500 },
    { name: 'Madison Academy', students: 1120, growth: 10, revenue: 5000 },
  ];

  const performanceMetrics = [
    { metric: 'Average Attendance Rate', value: '91.5%', trend: '+2.3%' },
    { metric: 'Student Satisfaction', value: '4.5/5', trend: '+0.3' },
    { metric: 'Teacher Retention', value: '94%', trend: '+1.2%' },
    { metric: 'Parent Engagement', value: '87%', trend: '+5.1%' },
  ];

  const revenueData = [
    { month: 'Apr', amount: 98000 },
    { month: 'May', amount: 105000 },
    { month: 'Jun', amount: 112000 },
    { month: 'Jul', amount: 118000 },
    { month: 'Aug', amount: 122000 },
    { month: 'Sep', amount: 125000 },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Global Analytics' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Global Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <StatCard
          title="Total Schools"
          value="24"
          icon={Building2}
          iconColor="bg-indigo-600"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Total Students"
          value="32,450"
          icon={Users}
          iconColor="bg-green-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Teachers"
          value="2,145"
          icon={GraduationCap}
          iconColor="bg-blue-600"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Avg Performance"
          value="88%"
          icon={TrendingUp}
          iconColor="bg-purple-600"
          trend={{ value: 3, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value="$125K"
          icon={DollarSign}
          iconColor="bg-amber-500"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Top Performing Schools
          </h2>
          <div className="space-y-3">
            {topSchools.map((school, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{school.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {school.students} students
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-green-600">+{school.growth}%</p>
                  <p className="text-xs text-gray-500">${school.revenue}/mo</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Performance Metrics
          </h2>
          <div className="space-y-4">
            {performanceMetrics.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {item.metric}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.value}
                    </span>
                    <span className="text-sm text-green-600">{item.trend}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: item.value }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Monthly Revenue Trend
        </h2>
        <div className="flex items-end justify-between h-64 space-x-2">
          {revenueData.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full flex items-end justify-center h-48">
                <div
                  className="w-full bg-indigo-600 rounded-t-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                  style={{
                    height: `${(item.amount / 125000) * 100}%`,
                  }}
                  title={`$${item.amount.toLocaleString()}`}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-xs text-gray-600 dark:text-gray-400">{item.month}</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  ${(item.amount / 1000).toFixed(0)}K
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Student Distribution
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Elementary</span>
              <span className="font-semibold text-gray-900 dark:text-white">12,450</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Middle School</span>
              <span className="font-semibold text-gray-900 dark:text-white">10,200</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">High School</span>
              <span className="font-semibold text-gray-900 dark:text-white">9,800</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Subscription Plans
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Basic</span>
              <span className="font-semibold text-gray-900 dark:text-white">8 schools</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Premium</span>
              <span className="font-semibold text-gray-900 dark:text-white">14 schools</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Enterprise</span>
              <span className="font-semibold text-gray-900 dark:text-white">2 schools</span>
            </div>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
            Regional Distribution
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">North</span>
              <span className="font-semibold text-gray-900 dark:text-white">8 schools</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">South</span>
              <span className="font-semibold text-gray-900 dark:text-white">6 schools</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">East & West</span>
              <span className="font-semibold text-gray-900 dark:text-white">10 schools</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};