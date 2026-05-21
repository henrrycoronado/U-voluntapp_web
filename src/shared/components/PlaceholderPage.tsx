import { useNavigate } from 'react-router-dom';

export const PlaceholderPage = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f3f4f6',
        width: '100%',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937' }}>{title}</h1>
      <p style={{ color: '#6b7280', fontSize: '1.2rem', marginTop: '1rem' }}>
        Módulo en construcción para el próximo sprint.
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: '2rem',
          padding: '10px 20px',
          backgroundColor: '#0d9488',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Volver atrás
      </button>
    </div>
  );
};
