import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../shared/components/Input';
import { Button } from '../shared/components/Button';
import { Alert } from '../shared/components/Alert';
import { authApi } from '../service/api/auth';
import { useAuthStore } from '../app/store/authStore';

export const LoginPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await authApi.login(formData);
      // El backend devuelve Token, User, Roles, etc. Lo guardamos en Zustand.
      setAuth(response.data); 
      navigate('/programas');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciales inválidas o error de conexión.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center font-sans text-white">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 rounded-md">
           <span className="text-black font-bold text-lg">U</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">U-Volunt<span className="text-yellow-500">App</span></span>
      </div>
      
      <div className="bg-[#18181b] p-8 rounded-2xl border border-zinc-800/80 w-full max-w-[400px] shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold mb-1">Iniciar Sesión</h1>
          <p className="text-xs text-zinc-400">Ingresa a tu cuenta para continuar ayudando.</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6 bg-red-950 border-red-900 text-red-400">
            {error}
          </Alert>
        )}
        
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <Input 
            label="Correo Electrónico" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="admin @ucb.edu.bo" 
            required
          />
          <Input 
            label="Contraseña" 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••" 
            required
          />
          
          <div className="mt-2">
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Conectando...' : 'Entrar'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6 text-center text-xs text-zinc-400">
          ¿No tienes una cuenta? <Link to="/signup" className="text-yellow-500 hover:underline">Regístrate</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
