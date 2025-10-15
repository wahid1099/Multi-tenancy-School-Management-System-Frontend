import React from 'react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Breadcrumb } from '../../components/layout/Breadcrumb';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div>
      <Breadcrumb items={[{ label: 'Dashboard', path: '/dashboard' }, { label: 'Settings' }]} />

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>

      <div className="space-y-6">
        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" defaultValue={user?.firstName} />
              <Input label="Last Name" defaultValue={user?.lastName} />
            </div>
            <Input label="Email" type="email" defaultValue={user?.email} disabled />
            <Input label="Phone" placeholder="Enter phone number" />
            <Button>Update Profile</Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Appearance</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Toggle between light and dark theme
              </p>
            </div>
            <Button onClick={toggleTheme}>
              {isDark ? 'Switch to Light' : 'Switch to Dark'}
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h2>
          <div className="space-y-4">
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
            <Button>Change Password</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};