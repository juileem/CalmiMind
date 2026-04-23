import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="page-shell dashboard-shell">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <section className="dashboard-card">
        <span className="brand-badge">Calmimind</span>
        <h1>Welcome, {user?.displayName || 'friend'}</h1>
        <p>
          You are logged in. Your session is persisted in the browser until you log out.
        </p>

        <div className="dashboard-grid">
          <article className="dashboard-panel">
            <h2>Profile</h2>
            <p>Username: {user?.displayName || 'Not set'}</p>
          </article>

          <article className="dashboard-panel">
            <h2>Account email</h2>
            <p>{user?.email}</p>
          </article>
        </div>

        <button className="secondary-button" type="button" onClick={handleLogout}>
          Log out
        </button>
      </section>
    </div>
  );
}
