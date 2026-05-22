import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { useLogin } from '../service/hooks/useAuth';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error: loginError } = useLogin();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(formData);
      navigate('/programs');
    } catch {
      // Error is already handled in the hook, but we can set local error if needed or use the hook's error
    }
  };

  const displayError = loginError || error;

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center font-sans text-white">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 rounded-md">
          <span className="text-black font-bold text-lg">U</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">
          U-Volunt<span className="text-yellow-500">App</span>
        </span>
      </div>

      <div className="bg-[#18181b] p-8 rounded-2xl border border-zinc-800/80 w-full max-w-[400px] shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold mb-1">Sign In</h1>
          <p className="text-xs text-zinc-400">Enter your account to continue helping.</p>
        </div>

        {displayError && (
          <Alert variant="error" className="mb-6 bg-red-950 border-red-900 text-red-400">
            {displayError}
          </Alert>
        )}

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin@ucb.edu.bo"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <div className="mt-2">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center text-xs text-zinc-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-yellow-500 hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
