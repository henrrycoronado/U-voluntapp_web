import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../store/authStore';
import { usePrograms, useDeleteProgram, useCreateProgram } from '../api/usePrograms';
import './AdminDashboard.css';
import deleteIcon from '../../../assets/delete.svg';
import { SkeletonList } from '../../../components/Skeleton/SkeletonList';

import {
  LayoutDashboard,
  FileText,
  Award,
  Activity,
  ClipboardList,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

interface Program {
  id: string;
  title: string;
  status: string;
  volunteersNeeded: number;
}

interface Props {
  moduleName?: string;
}

export const AdminDashboard = ({ moduleName = 'Programas' }: Props) => {
  const userEmail = useAuthStore((state) => state.userEmail);
  const logout = useAuthStore((state) => state.logout);

  const { data: programs, isLoading, isError, error } = usePrograms();
  const deleteMutation = useDeleteProgram();
  const { mutate: addProgram, isPending: isCreating } = useCreateProgram();

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Activo');
  const [volunteersNeeded, setVolunteersNeeded] = useState<number | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !volunteersNeeded) return;
    addProgram({ title, status, volunteersNeeded: Number(volunteersNeeded) });
    setTitle('');
    setStatus('Activo');
    setVolunteersNeeded('');
    setShowForm(false);
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="dashboard-sidebar__logo">U-Voluntapp</div>

        <nav className="dashboard-sidebar__nav-list">
          <Link
            to="/dashboard"
            className={`dashboard-sidebar__link ${moduleName === 'Programas' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <LayoutDashboard size={20} /> Programas
          </Link>
          <Link
            to="/reportes"
            className={`dashboard-sidebar__link ${moduleName === 'Reportes' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <FileText size={20} /> Reportes
          </Link>
          <Link
            to="/becas"
            className={`dashboard-sidebar__link ${moduleName === 'Becas' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Award size={20} /> Becas
          </Link>
          <Link
            to="/seguimientos"
            className={`dashboard-sidebar__link ${moduleName === 'Seguimientos' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Activity size={20} /> Seguimientos
          </Link>
          <Link
            to="/solicitudes"
            className={`dashboard-sidebar__link ${moduleName === 'Solicitudes' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <ClipboardList size={20} /> Solicitudes
          </Link>
          <Link
            to="/perfil-admin"
            className={`dashboard-sidebar__link ${moduleName === 'Perfil' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <User size={20} /> Perfil
          </Link>
          <Link
            to="/configuracion-admin"
            className={`dashboard-sidebar__link ${moduleName === 'Configuración' ? 'dashboard-sidebar__link--active' : ''}`}
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>

        <div className="dashboard-sidebar__footer">
          <span className="dashboard-sidebar__user-label">Admin: {userEmail}</span>
          <button onClick={logout} className="dashboard-sidebar__logout">
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        {moduleName === 'Programas' ? (
          <>
            <header className="dashboard-header">
              <div>
                <h1 className="dashboard-header__title">Panel de Control</h1>
                <p className="dashboard-header__subtitle">Gestión de programas de voluntariado</p>
              </div>
              <button
                className="dashboard-header__btn-primary"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Cancelar' : '+ Nuevo Programa'}
              </button>
            </header>

            <div className="dashboard-grid">
              <section className="dashboard-card">
                <h2 className="dashboard-card__title">Programas Activos</h2>

                {showForm && (
                  <form onSubmit={handleSubmit} className="program-form">
                    <div className="program-form__group">
                      <input
                        type="text"
                        placeholder="Título (ej. Reforestación)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="program-form__input program-form__input--flex"
                      />
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="program-form__input"
                      >
                        <option value="Activo">Activo</option>
                        <option value="Completado">Completado</option>
                        <option value="Pausado">Pausado</option>
                      </select>
                      <input
                        type="number"
                        placeholder="Voluntarios req."
                        value={volunteersNeeded}
                        onChange={(e) => setVolunteersNeeded(Number(e.target.value))}
                        required
                        min="1"
                        className="program-form__input program-form__input--small"
                      />
                    </div>
                    <button type="submit" disabled={isCreating} className="program-form__submit">
                      {isCreating ? 'Guardando...' : 'Guardar Programa'}
                    </button>
                  </form>
                )}

                <div className="activity-list">
                  {isLoading && <SkeletonList count={3} />}

                  {isError && (
                    <p style={{ color: '#c1121f' }}>
                      Error: {error instanceof Error ? error.message : 'Error al conectar'}
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
            </div>
          </>
        ) : (
          <div>Página de {moduleName}</div>
        )}
      </main>
    </div>
  );
};
