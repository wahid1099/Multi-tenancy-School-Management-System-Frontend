import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Download, FileText, Users, TrendingUp, DollarSign } from 'lucide-react';

export const Reports: React.FC = () => {
  const reportTypes = [
    {
      title: 'Student Performance Report',
      description: 'Comprehensive analysis of student academic performance',
      icon: TrendingUp,
      color: 'bg-indigo-600',
    },
    {
      title: 'Attendance Report',
      description: 'Detailed attendance records for all classes',
      icon: Users,
      color: 'bg-green-600',
    },
    {
      title: 'Fee Collection Report',
      description: 'Summary of fee collection and pending payments',
      icon: DollarSign,
      color: 'bg-amber-500',
    },
    {
      title: 'Teacher Performance Report',
      description: 'Analysis of teacher effectiveness and student outcomes',
      icon: FileText,
      color: 'bg-blue-600',
    },
    {
      title: 'Examination Report',
      description: 'Detailed exam results and grade analysis',
      icon: FileText,
      color: 'bg-purple-600',
    },
    {
      title: 'Class-wise Report',
      description: 'Comparative analysis across all classes',
      icon: Users,
      color: 'bg-pink-600',
    },
  ];

  const recentReports = [
    {
      name: 'Monthly Attendance - September 2025',
      date: '2025-09-28',
      type: 'Attendance',
      size: '2.4 MB',
    },
    {
      name: 'Fee Collection - Q3 2025',
      date: '2025-09-25',
      type: 'Financial',
      size: '1.8 MB',
    },
    {
      name: 'Mid-term Exam Results',
      date: '2025-09-20',
      type: 'Academic',
      size: '3.2 MB',
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Reports' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Reports & Analytics
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {reportTypes.map((report, index) => {
          const Icon = report.icon;
          return (
            <Card key={index}>
              <div className="flex items-start space-x-4">
                <div className={`${report.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {report.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {report.description}
                  </p>
                  <Button size="sm" variant="outline">
                    Generate Report
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Recent Reports
        </h2>
        <div className="space-y-3">
          {recentReports.map((report, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <FileText className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{report.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {report.type} • {report.size} • {report.date}
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Statistics
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Average Attendance</span>
              <span className="text-xl font-bold text-green-600">92%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Pass Percentage</span>
              <span className="text-xl font-bold text-indigo-600">88%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="text-gray-700 dark:text-gray-300">Fee Collection Rate</span>
              <span className="text-xl font-bold text-amber-500">85%</span>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Custom Report
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Report Type
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white">
                <option>Attendance</option>
                <option>Academic Performance</option>
                <option>Fee Collection</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <Button className="w-full">Generate Custom Report</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};