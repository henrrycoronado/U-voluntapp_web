import { mockActivities } from '../../../auth/api/mockDashboard';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  return (
    <div className="dashboard-layout">
      {/* Barra Lateral (Sidebar) */}
      <aside className="dashboard-sidebar">
        <h2 className="dashboard-sidebar__logo">U-Voluntapp</h2>
        <nav className="dashboard-sidebar__nav">
          <a href="#" className="dashboard-sidebar__link dashboard-sidebar__link--active">
            Inicio
          </a>
          <a href="#" className="dashboard-sidebar__link">
            Programas
          </a>
          <a href="#" className="dashboard-sidebar__link">
            Reportes
          </a>
        </nav>
      </aside>

      {/* Contenido Principal */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-header__title">Bienvenido, Admin Staff</h1>
            <p className="dashboard-header__subtitle">
              Panel de control de programas y actividades
            </p>
          </div>
          <button className="dashboard-header__btn-primary">+ Nueva Actividad</button>
        </header>

        <section className="dashboard-grid">
          {/* Bloque: resumen y actividades */}
          <div className="dashboard-card">
            <h3 className="dashboard-card__title">Próximas Actividades</h3>
            <div className="activity-list">
              {mockActivities.map((activity: (typeof mockActivities)[number]) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-item__info">
                    <h4 className="activity-item__title">{activity.title}</h4>
                    <span className="activity-item__date">
                      📅 {activity.date} - 🕒 {activity.time}
                    </span>
                  </div>
                  <span className="activity-item__badge">{activity.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque: Calendario mockeado */}
          <div className="dashboard-card">
            <h3 className="dashboard-card__title">Calendario Institucional</h3>
            <div className="mock-calendar">
              <div className="mock-calendar__header">Marzo 2026</div>
              <div className="mock-calendar__grid">
                {/* Días de la semana */}
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day) => (
                  <div key={day} className="mock-calendar__day-name">
                    {day}
                  </div>
                ))}
                {/* Algunos números de relleno */}
                {Array.from({ length: 31 }, (_, i) => (
                  <div
                    key={i}
                    className={`mock-calendar__day ${i + 1 === 28 ? 'mock-calendar__day--active' : ''}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
