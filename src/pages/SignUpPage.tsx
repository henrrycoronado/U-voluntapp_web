import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import type { RegisterRequest } from '../types/auth';
import { Card, Button, Input, Alert } from '../components';
import { useForm } from '../hooks/useForm';
import { authApi } from '../api/auth';
import { validateForm, validators } from '../utils/validators';
import { Moon, Sun } from 'lucide-react';

export default function SignUpPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { theme, toggleTheme } = useThemeStore();

  const { values, errors, isSubmitting, submitError, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '', firstName: '', lastName: '', phone: '' },
    validate: (vals: Record<string, string>) =>
      validateForm(vals, {
        firstName: [[validators.required, 'El nombre es requerido']],
        lastName: [[validators.required, 'El apellido es requerido']],
        email: [[validators.email, 'Email inválido']],
        password: [[validators.password, 'Mínimo 8 caracteres y un dígito']],
        phone: [[validators.phone, 'Teléfono inválido']],
      }),
    onSubmit: async (vals: Record<string, string>) => {
      const response = await authApi.register(vals as unknown as RegisterRequest);
      if (response.success) {
        setAuth(response.data);
        navigate('/volunteer');
      } else {
        throw new Error(response.message || 'Error al crear cuenta');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 dark:from-gray-900 dark:to-gray-800 transition-colors p-4">
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
        >
          {theme === 'light' ? (
            <Moon size={20} className="text-gray-600" />
          ) : (
            <Sun size={20} className="text-yellow-400" />
          )}
        </button>
      </div>

      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          U-Voluntapp
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Crea tu cuenta</p>

        {submitError && <Alert type="error" message={submitError} />}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Nombre"
              type="text"
              name="firstName"
              placeholder="Juan"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />
            <Input
              label="Apellido"
              type="text"
              name="lastName"
              placeholder="Pérez"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            placeholder="tu@email.com"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Teléfono"
            type="tel"
            name="phone"
            placeholder="+591 712345**"
            value={values.phone || ''}
            onChange={handleChange}
            error={errors.phone}
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Crear cuenta
          </Button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          ¿Ya tienes cuenta?{' '}
          <a
            href="/login"
            className="text-brand-blue dark:text-brand-blue hover:underline font-medium"
          >
            Inicia sesión aquí
          </a>
        </p>
      </Card>
    </div>
  );
}
