import { useAuthStore } from '../../../store/authStore';
import { usePrograms, useDeleteProgram } from '../api/usePrograms';
import './AdminDashboard.css';
import deleteIcon from '../../../assets/delete.svg';

interface Program {
  id: string;
  title: string;
  status: string;
  volunteersNeeded: number;
}

export const AdminDashboard = () => {
  const userEmail = useAuthStore((state) => state.userEmail);
  const logout = useAuthStore((state) => state.logout);
  const { data: programs, isLoading, isError, error } = usePrograms();
  const deleteMutation = useDeleteProgram();

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar__logo">U-Voluntapp</div>
        <nav className="dashboard-sidebar__nav">
          <a href="#" className="dashboard-sidebar__link dashboard-sidebar__link--active">
            Programas
          </a>
          <a href="#" className="dashboard-sidebar__link">
            Voluntarios
          </a>
          <a href="#" className="dashboard-sidebar__link">
            Reportes
          </a>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ color: '#6b7280', fontSize: '13px' }}>Admin: {userEmail}</span>
          <button
            onClick={logout}
            className="dashboard-sidebar__link"
            style={{
              background: 'transparent',
              border: '1px solid #6b7280',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-header__title">Panel de Control</h1>
            <p className="dashboard-header__subtitle">Gestión de programas de voluntariado</p>
          </div>
          <button className="dashboard-header__btn-primary">+ Nuevo Programa</button>
        </header>

        <div className="dashboard-grid">
          <section className="dashboard-card">
            <h2 className="dashboard-card__title">Programas Activos</h2>

            <div className="activity-list">
              {isLoading && (
                <>
                  {[1, 2, 3].map((index) => (
                    <div key={`skeleton-${index}`} className="activity-item">
                      <div style={{ width: '100%' }}>
                        <div className="skeleton-box skeleton-title"></div>
                        <div className="skeleton-box skeleton-text"></div>
                      </div>
                      <div className="skeleton-box skeleton-badge"></div>
                    </div>
                  ))}
                </>
              )}

              {isError && (
                <p style={{ color: '#c1121f' }}>
                  Error:{' '}
                  {error instanceof Error
                    ? error.message
                    : 'Error al conectar con la base de datos'}
                </p>
              )}

              {!isLoading &&
                !isError &&
                programs &&
                programs.map((program: Program) => (
                  <div key={program.id} className="activity-item">
                    <div>
                      <h3 className="activity-item__title">{program.title}</h3>
                      <span className="activity-item__date">
                        Voluntarios necesarios: {program.volunteersNeeded}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span
                        className="activity-item__badge"
                        style={
                          program.status === 'Completado'
                            ? { backgroundColor: '#e1fbf4', color: '#0d9488' }
                            : {}
                        }
                      >
                        {program.status}
                      </span>

                      <button
                        className="btn-delete-program"
                        onClick={() => deleteMutation.mutate(program.id)}
                        disabled={deleteMutation.isPending}
                        title="Eliminar programa"
                      >
                        {deleteMutation.isPending ? (
                          '...'
                        ) : (
                          <img
                            src={deleteIcon}
                            alt="Eliminar"
                            className="btn-delete-program__icon"
                          />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          <section className="dashboard-card">
            <h2 className="dashboard-card__title">Calendario</h2>
            <div className="mock-calendar__header">Marzo 2026</div>
            <div className="mock-calendar__grid">
              <div className="mock-calendar__day-name">Lu</div>
              <div className="mock-calendar__day-name">Ma</div>
              <div className="mock-calendar__day-name">Mi</div>
              <div className="mock-calendar__day-name">Ju</div>
              <div className="mock-calendar__day-name">Vi</div>
              <div className="mock-calendar__day-name">Sa</div>
              <div className="mock-calendar__day-name">Do</div>
              <div className="mock-calendar__day">9</div>
              <div className="mock-calendar__day">10</div>
              <div className="mock-calendar__day mock-calendar__day--active">11</div>
              <div className="mock-calendar__day">12</div>
              <div className="mock-calendar__day">13</div>
              <div className="mock-calendar__day">14</div>
              <div className="mock-calendar__day">15</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
