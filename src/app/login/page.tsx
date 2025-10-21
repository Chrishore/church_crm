'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cooldownMessage, setCooldownMessage] = useState<string | null>(null);
  const [isOnCooldown, setIsOnCooldown] = useState(false);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if session cookie exists by making a request to a protected route
        const response = await fetch('/api/auth/check', { credentials: 'include' });
        if (response.ok) {
          // User is authenticated, redirect to dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        // Not authenticated, stay on login page
        console.log('Not authenticated');
      }
    };

    checkAuth();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setCooldownMessage(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login
        toast.success('Login successful!');
        router.push('/dashboard');
      } else if (response.status === 401) {
        // Invalid credentials
        setError('Invalid username or password');
        toast.error('Invalid username or password');
      } else if (response.status === 429) {
        // Rate limited
        setCooldownMessage(data.error);
        setIsOnCooldown(true);
        toast.error(data.error);
      } else {
        // Other errors
        setError('An error occurred. Please try again.');
        toast.error('An error occurred');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      toast.error('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0f172a]">
        <div className="max-w-md w-full bg-white dark:bg-surface rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6 text-textPrimary dark:text-[#f1f5f9]">
            Church CRM Login
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-textSecondary dark:text-[#cbd5e1] mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#c7d2fe] dark:border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-[#1e293b] text-textPrimary dark:text-[#f1f5f9]"
                disabled={isOnCooldown}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-textSecondary dark:text-[#cbd5e1] mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#c7d2fe] dark:border-[#334155] rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-[#1e293b] text-textPrimary dark:text-[#f1f5f9]"
                disabled={isOnCooldown}
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isOnCooldown}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-secondary disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {isOnCooldown && cooldownMessage && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-md">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">{cooldownMessage}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
