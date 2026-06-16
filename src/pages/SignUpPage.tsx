import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Alert } from '../components/Alert';
import { useRegister } from '../service/hooks/useAuth';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error: registerError } = useRegister();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        ...formData,
        phone: '77777777',
      };

      await register(payload);
      navigate('/programs');
    } catch {
      // Error is already handled in the hook
    }
  };

  const displayError = registerError || error;

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center font-sans text-white py-10">
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
          <h1 className="text-xl font-bold mb-1">Create your account</h1>
          <p className="text-xs text-zinc-400">Enter your basic information to join.</p>
        </div>

        {displayError && (
          <Alert variant="error" className="mb-6 bg-red-950 border-red-900 text-red-400">
            {displayError}
          </Alert>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Daniel"
              required
            />
            <Input
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Irigoyen"
              required
            />
          </div>

          <Input
            label="Institutional Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="daniel@ucb.edu.bo"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 characters"
            required
          />

          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="text-xs text-zinc-400 hover:text-white transition-colors">
              I already have an account
            </Link>
            <Button variant="primary" type="submit" className="!w-auto px-6" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Sign Up'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
