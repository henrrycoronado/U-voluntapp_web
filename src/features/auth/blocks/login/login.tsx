import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginMock } from '../../api/mockAuth';
import './login.css';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const user = await loginMock(email, password);
      console.log('¡Usuario logueado con éxito!', user);

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-layout">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__header">
          <h2 className="login-form__title">U-Voluntapp</h2>
          <p className="login-form__subtitle">Portal de Administración</p>
        </div>

        {error && <div className="login-form__error">{error}</div>}

        <div className="login-form__group">
          <label className="login-form__label">Correo Electrónico</label>
          <input
            type="email"
            className="login-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@ucb.edu.bo"
            required
          />
        </div>

        <div className="login-form__group">
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
      </form>
    </div>
  );
};
