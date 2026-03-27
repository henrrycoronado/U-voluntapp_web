import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import '../login/login.css';
import { useAuthStore } from '../../../../store/authStore';

export const Register = () => {
  const [isVolunteer, setIsVolunteer] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, role } = useAuthStore();

  if (isAuthenticated) {
    return <Navigate to={role === 'Volunteer' ? '/volunteer' : '/dashboard'} replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isVolunteer) {
      alert('Registro de voluntario exitoso. Ya puedes iniciar sesión.');
    } else {
      alert('Solicitud de colaborador enviada. Un administrador revisará tu petición.');
    }
    navigate('/login');
  };

  return (
    <div className="login-layout">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form__header">
          <h2 className="login-form__title">U-Voluntapp</h2>
          <p className="login-form__subtitle">
            {isVolunteer ? 'Registro de Voluntario' : 'Solicitud de Colaborador'}
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '20px',
            backgroundColor: '#f3f4f6',
            padding: '5px',
            borderRadius: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => setIsVolunteer(false)}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: !isVolunteer ? '#0d9488' : 'transparent',
              color: !isVolunteer ? 'white' : '#4b5563',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Colaborador
          </button>
          <button
            type="button"
            onClick={() => setIsVolunteer(true)}
            style={{
              flex: 1,
              padding: '8px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: isVolunteer ? '#0d9488' : 'transparent',
              color: isVolunteer ? 'white' : '#4b5563',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}
          >
            Voluntario
          </button>
        </div>

        <div className="login-form__group">
          <label className="login-form__label">Correo Electrónico</label>
          <input
            type="email"
            className="login-form__input"
            placeholder="correo@ucb.edu.bo"
            required
          />
        </div>

        {isVolunteer ? (
          <>
            <div className="login-form__group">
              <label className="login-form__label">Nombre Completo</label>
              <input type="text" className="login-form__input" placeholder="Juan Pérez" required />
            </div>
            <div className="login-form__group" style={{ marginBottom: '1.5rem' }}>
              <label className="login-form__label">Contraseña</label>
              <input
                type="password"
                className="login-form__input"
                placeholder="••••••••"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div className="login-form__group">
              <label className="login-form__label">Motivo de la solicitud</label>
              <textarea
                className="login-form__input"
                rows={3}
                placeholder="¿Por qué deseas ser colaborador?"
                required
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>
            <div className="login-form__group" style={{ marginBottom: '1.5rem' }}>
              <label className="login-form__label">Tiempo estimado (meses)</label>
              <input
                type="number"
                className="login-form__input"
                min="1"
                placeholder="Ej. 6"
                required
              />
            </div>
          </>
        )}

        <button type="submit" className="login-form__button">
          {isVolunteer ? 'Registrarme' : 'Enviar Solicitud'}
        </button>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link
            to="/login"
            style={{
              color: '#0d9488',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
            }}
          >
            ¿Ya tienes cuenta? Inicia Sesión
          </Link>
        </div>
      </form>
    </div>
  );
};
