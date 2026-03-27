import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useThemeStore } from '../store/themeStore';
import { Card, Button, Input, Alert } from '../components';
import { useForm } from '../hooks/useForm';
import { authApi } from '../api/auth';
import { validateForm, validators } from '../utils/validators';
import { Moon, Sun } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { theme, toggleTheme } = useThemeStore();

  const { values, errors, isSubmitting, submitError, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', password: '' },
    validate: (vals: Record<string, string>) =>
      validateForm(vals, {
        email: [[validators.email, 'Email inválido']],
        password: [[validators.required, 'La contraseña es requerida']],
      }),
    onSubmit: async (vals: Record<string, string>) => {
      const response = await authApi.login(vals);
      if (response.success) {
        setAuth(response.data);
        navigate('/volunteer');
      } else {
        throw new Error(response.message || 'Error al iniciar sesión');
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-blue/5 dark:from-gray-900 dark:to-gray-800 transition-colors">
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
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
          Inicia sesión en tu cuenta
        </p>

        {submitError && <Alert type="error" message={submitError} />}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            label="Contraseña"
            type="password"
            name="password"
            placeholder="••••••••"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Button type="submit" className="w-full" isLoading={isSubmitting}>
            Iniciar sesión
          </Button>
        </form>

        <p className="text-center text-gray-600 dark:text-gray-400 mt-6">
          ¿No tienes cuenta?{' '}
          <a
            href="/signup"
            className="text-brand-blue dark:text-brand-blue hover:underline font-medium"
          >
            Regístrate aquí
          </a>
        </p>
      </Card>
    </div>
  );
}
