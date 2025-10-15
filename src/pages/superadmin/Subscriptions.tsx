import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { Table } from '../../components/ui/Table';
import { Check } from 'lucide-react';

export const Subscriptions: React.FC = () => {
  const subscriptions = [
    {
      id: 1,
      school: 'Lincoln High School',
      plan: 'Premium',
      amount: 5000,
      billingDate: '2025-10-01',
      status: 'active',
      renewalDate: '2026-10-01',
    },
    {
      id: 2,
      school: 'Washington Academy',
      plan: 'Basic',
      amount: 2500,
      billingDate: '2025-10-05',
      status: 'active',
      renewalDate: '2026-10-05',
    },
    {
      id: 3,
      school: 'Jefferson Institute',
      plan: 'Premium',
      amount: 5000,
      billingDate: '2025-09-28',
      status: 'paid',
      renewalDate: '2026-09-28',
    },
  ];

  const plans = [
    {
      name: 'Basic',
      price: '$2,500',
      period: 'per month',
      features: [
        'Up to 500 students',
        'Basic reporting',
        '5 admin accounts',
        'Email support',
        'Mobile app access',
      ],
      color: 'border-gray-300',
    },
    {
      name: 'Premium',
      price: '$5,000',
      period: 'per month',
      features: [
        'Up to 2000 students',
        'Advanced analytics',
        'Unlimited admin accounts',
        'Priority support',
        'Mobile app access',
        'Custom branding',
        'API access',
      ],
      color: 'border-indigo-600',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      features: [
        'Unlimited students',
        'Custom features',
        'Dedicated account manager',
        '24/7 phone support',
        'On-premise deployment option',
        'Custom integrations',
        'SLA guarantee',
      ],
      color: 'border-amber-500',
    },
  ];

  const columns = [
    { key: 'school', header: 'School' },
    { key: 'plan', header: 'Plan' },
    {
      key: 'amount',
      header: 'Amount',
      render: (value: number) => `$${value.toLocaleString()}`,
    },
    { key: 'billingDate', header: 'Next Billing' },
    {
      key: 'status',
      header: 'Status',
      render: (value: string) => (
        <Badge variant={value === 'paid' || value === 'active' ? 'success' : 'warning'}>
          {value}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: () => (
        <Button size="sm" variant="outline">
          View Invoice
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Subscriptions' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Subscriptions & Billing
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</p>
            <p className="text-2xl font-bold text-green-600">$125,000</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Active Subscriptions</p>
            <p className="text-2xl font-bold text-indigo-600">22</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pending Payments</p>
            <p className="text-2xl font-bold text-amber-500">3</p>
          </div>
        </Card>

        <Card>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Churn Rate</p>
            <p className="text-2xl font-bold text-red-600">2.5%</p>
          </div>
        </Card>
      </div>

      <Card padding={false} className="mb-6">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Transactions
          </h2>
        </div>
        <Table columns={columns} data={subscriptions} />
      </Card>

      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Subscription Plans
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`border-2 ${plan.color} ${plan.popular ? 'relative' : ''}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white px-3 py-1 rounded-bl-lg rounded-tr-lg text-xs font-semibold">
                  POPULAR
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400 ml-2">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700 dark:text-gray-300">
                    <Check size={16} className="text-green-600 mr-2 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={plan.popular ? 'primary' : 'outline'}
              >
                Select Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};