import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../shared/components/Input';
import { Button } from '../shared/components/Button';
import { Alert } from '../shared/components/Alert';
import { authApi } from '../service/api/auth';
import { useAuthStore } from '../app/store/authStore';

export const SignUpPage = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
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
      // INYECTAMOS EL BYPASS AQUÍ MISMO:
      const payload = {
        ...formData,
        phone: '77777777', // El backend detectará esto como un "cambio" y te dejará pasar
      };

      const response = await authApi.register(payload);
      // El backend devuelve Token, User, Roles, etc. Lo guardamos en Zustand.
      setAuth(response.data);
      navigate('/programas');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al crear la cuenta. Verifica tus datos.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col items-center justify-center font-sans text-white py-10">
      <div className="mb-8 flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center bg-yellow-500 rounded-md">
           <span className="text-black font-bold text-lg">U</span>
        </div>
        <span className="text-2xl font-bold tracking-tight">U-Volunt<span className="text-yellow-500">App</span></span>
      </div>
      
      <div className="bg-[#18181b] p-8 rounded-2xl border border-zinc-800/80 w-full max-w-[400px] shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold mb-1">Crea tu cuenta</h1>
          <p className="text-xs text-zinc-400">Ingresa tus datos básicos para unirte.</p>
        </div>

        {error && (
          <Alert variant="error" className="mb-6 bg-red-950 border-red-900 text-red-400">
            {error}
          </Alert>
        )}
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Nombre" 
              type="text" 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Daniel" 
              required
            />
            <Input 
              label="Apellido" 
              type="text" 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Irigoyen" 
              required
            />
          </div>
          
          <Input 
            label="Correo Institucional" 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="daniel @ucb.edu.bo" 
            required
          />
          <Input 
            label="Contraseña" 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Min. 8 caracteres" 
            required
          />
          
          <div className="mt-6 flex items-center justify-between">
            <Link to="/login" className="text-xs text-zinc-400 hover:text-white transition-colors">
              Ya tengo una cuenta
            </Link>
            <Button variant="primary" type="submit" className="!w-auto px-6" disabled={isLoading}>
              {isLoading ? 'Creando...' : 'Registrarme'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
