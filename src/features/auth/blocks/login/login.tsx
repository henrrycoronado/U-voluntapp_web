import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import './login.css';
import { useAuthStore } from '../../../../store/authStore';
import type { UserRole } from '../../../../store/authStore';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login, isAuthenticated, role } = useAuthStore();

  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to={role === 'Volunteer' ? '/volunteer' : '/dashboard'} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      let assignedRole: UserRole = 'Volunteer';

      if (email.toLowerCase().includes('admin')) {
        assignedRole = 'Admin';
      } else if (email.toLowerCase().includes('colab')) {
        assignedRole = 'Coordinator';
      }

      login(email, assignedRole);

      if (assignedRole === 'Volunteer') {
        navigate('/volunteer');
      } else {
        navigate('/dashboard');
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-layout">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__header">
          <h2 className="login-form__title">U-Voluntapp</h2>
          <p className="login-form__subtitle">Inicia sesión en tu cuenta</p>
        </div>

        {error && <div className="login-form__error">{error}</div>}

        <div className="login-form__group">
          <label htmlFor="email" className="login-form__label">
            Correo Electrónico
          </label>
          <input
            id="email"
            name="email"
            autoComplete="email"
            type="email"
            className="login-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ejemplo@ucb.edu.bo"
            required
          />
        </div>

        <div className="login-form__group" style={{ marginBottom: '1.5rem' }}>
          <label className="login-form__label">Contraseña</label>
          <input
            type="password"
            className="login-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className={`login-form__button ${isLoading ? 'login-form__button--loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
        </button>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link
            to="/register"
            style={{
              color: '#0d9488',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ¿No tienes cuenta? Solicita tu acceso aquí
          </Link>
        </div>
      </form>
    </div>
  );
};
