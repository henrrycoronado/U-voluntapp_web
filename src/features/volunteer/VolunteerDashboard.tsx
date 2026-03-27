import { useAuthStore } from '../../store/authStore';
import { usePrograms } from '../dashboard/api/usePrograms';
import '../dashboard/AdminDashboard/AdminDashboard.css';
import './VolunteerDashboard.css';

interface Program {
  id: string | number;
  title: string;
  status: string;
  volunteersNeeded: number;
}

export const VolunteerDashboard = () => {
  const { userEmail, logout } = useAuthStore();
  const { data: programs, isLoading } = usePrograms();

  return (
    <div className="dashboard-layout">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar__logo">U-Voluntapp</div>
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#6b7280', fontSize: '13px' }}>Voluntario: {userEmail}</span>
          <button onClick={logout} className="volunteer-sidebar-btn">
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="dashboard-main volunteer-main">
        <header className="volunteer-header">
          <h1 className="volunteer-header__title">Descubre Oportunidades</h1>
          <p className="volunteer-header__subtitle">
            Encuentra el programa de voluntariado perfecto para ti.
          </p>
        </header>

        {isLoading && <p>Cargando programas increíbles...</p>}

        {/* CATÁLOGO DE TARJETAS */}
        <div className="volunteer-grid">
          {programs &&
            programs.map((program: Program) => (
              <div key={program.id} className="volunteer-card">
                <div>
                  <div className="volunteer-card__header">
                    <h3 className="volunteer-card__title">{program.title}</h3>
                    <span
                      className={`volunteer-card__badge ${program.status === 'Activo' ? 'volunteer-card__badge--active' : 'volunteer-card__badge--default'}`}
                    >
                      {program.status}
                    </span>
                  </div>

                  <p className="volunteer-card__description">
                    Se necesitan {program.volunteersNeeded} voluntarios para hacer la diferencia en
                    esta actividad.
                  </p>
                </div>

                <button className="volunteer-card__button">Ver Detalles e Inscribirse</button>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};
