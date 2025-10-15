import React, { useState } from 'react';
import { useAuth, UserRole } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { GraduationCap } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, password);
    navigate('/dashboard');
  };

  const handleDemoLogin = (role: UserRole) => {
    switchRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-600 p-3 rounded-full mb-4">
            <GraduationCap className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">SchoolHub</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>

        <div className="mt-6">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mb-3">Demo Logins</p>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin('student')}
            >
              Student Demo
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin('teacher')}
            >
              Teacher Demo
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin('admin')}
            >
              Admin Demo
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleDemoLogin('super_admin')}
            >
              Super Admin Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};