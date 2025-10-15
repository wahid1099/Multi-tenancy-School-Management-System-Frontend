import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { CreditCard } from 'lucide-react';

export const Fees: React.FC = () => {
  const fees = [
    { id: 1, type: 'Tuition Fee', amount: 5000, dueDate: '2025-10-15', status: 'pending' },
    { id: 2, type: 'Lab Fee', amount: 500, dueDate: '2025-10-15', status: 'pending' },
    { id: 3, type: 'Library Fee', amount: 200, dueDate: '2025-09-01', status: 'paid', paidDate: '2025-08-28' },
    { id: 4, type: 'Sports Fee', amount: 300, dueDate: '2025-09-01', status: 'paid', paidDate: '2025-08-28' },
  ];

  const columns = [
    { key: 'type', header: 'Fee Type' },
    {
      key: 'amount',
      header: 'Amount',
      render: (value: number) => `$${value}`,
    },
    { key: 'dueDate', header: 'Due Date' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'paid' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (_: any, row: any) =>
        row.status === 'pending' ? (
          <Button size="sm">
            <CreditCard size={16} className="mr-2" />
            Pay Now
          </Button>
        ) : (
          <span className="text-sm text-gray-500">Paid on {row.paidDate}</span>
        ),
    },
  ];

  const totalPending = fees
    .filter((fee) => fee.status === 'pending')
    .reduce((sum, fee) => sum + fee.amount, 0);

  const totalPaid = fees
    .filter((fee) => fee.status === 'paid')
    .reduce((sum, fee) => sum + fee.amount, 0);

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Fee Management' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fee Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Pending</p>
            <p className="text-3xl font-bold text-amber-500">${totalPending}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Paid</p>
            <p className="text-3xl font-bold text-green-600">${totalPaid}</p>
          </div>
        </Card>

        <Card>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Payment Status</p>
            <p className="text-3xl font-bold text-indigo-600">
              {fees.filter((f) => f.status === 'paid').length}/{fees.length}
            </p>
          </div>
        </Card>
      </div>

      <Card padding={false}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Fee Details</h2>
        </div>
        <Table columns={columns} data={fees} />
      </Card>
    </div>
  );
};