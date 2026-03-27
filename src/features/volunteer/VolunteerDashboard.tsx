import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usePrograms } from '../dashboard/api/usePrograms';
import '../dashboard/AdminDashboard/AdminDashboard.css';
import './VolunteerDashboard.css';

import {
  LayoutDashboard,
  FileText,
  Award,
  Clock,
  User,
  Settings,
  LogOut,
  Compass,
} from 'lucide-react';

interface Program {
  id: string | number;
  title: string;
  status: string;
  volunteersNeeded: number;
}

interface Props {
  moduleName?: string;
}

export const VolunteerDashboard = ({ moduleName = 'Programas' }: Props) => {
  const { userEmail, logout } = useAuthStore();
  const { data: programs, isLoading } = usePrograms();

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar__logo">U-Voluntapp</div>

        <nav className="dashboard-sidebar__nav-list">
          <Link
            to="/volunteer"
            className={`dashboard-sidebar__link ${moduleName === 'Programas' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Compass size={20} /> Programas
          </Link>
          <Link
            to="/mi-dashboard"
            className={`dashboard-sidebar__link ${moduleName === 'Dashboard' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link
            to="/mis-reportes"
            className={`dashboard-sidebar__link ${moduleName === 'Reportes' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <FileText size={20} /> Reportes
          </Link>
          <Link
            to="/historial"
            className={`dashboard-sidebar__link ${moduleName === 'Historial' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Clock size={20} /> Historial
          </Link>
          <Link
            to="/mis-becas"
            className={`dashboard-sidebar__link ${moduleName === 'Becas' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Award size={20} /> Becas
          </Link>
          <Link
            to="/perfil"
            className={`dashboard-sidebar__link ${moduleName === 'Perfil' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <User size={20} /> Perfil
          </Link>
          <Link
            to="/configuracion"
            className={`dashboard-sidebar__link ${moduleName === 'Configuración' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>

        <div className="dashboard-sidebar__footer">
          <span className="dashboard-sidebar__user-label">Voluntario: {userEmail}</span>
          <button onClick={logout} className="dashboard-sidebar__logout">
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main volunteer-main">
        {moduleName === 'Programas' ? (
          <>
            <header className="volunteer-header">
              <h1 className="volunteer-header__title">Descubre Oportunidades</h1>
              <p className="volunteer-header__subtitle">
                Encuentra el programa de voluntariado perfecto para ti.
              </p>
            </header>

            {isLoading && <p>Cargando programas increíbles...</p>}

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
                        Se necesitan {program.volunteersNeeded} voluntarios para hacer la diferencia
                        en esta actividad.
                      </p>
                    </div>
                    <button className="volunteer-card__button">Ver Detalles e Inscribirse</button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <div>Página de {moduleName}</div>
        )}
      </main>
    </div>
  );
};
