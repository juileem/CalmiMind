import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(location.state?.message || '');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }

    setSubmitting(true);
    const result = await login(formData.email.trim(), formData.password);
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate('/checkin', { replace: true });
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in with the email and password you used when you created your Calmimind account."
      alternatePrompt="Don't have an account?"
      alternateLinkText="Sign up"
      alternateLinkTo="/signup"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="input-group">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>

        <label className="input-group">
          <span>Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            placeholder="Enter your password"
          />
        </label>

        {error ? <div className="form-message error-message">{error}</div> : null}

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Login'}
        </button>

        <p className="helper-text">
          Need an account? <Link to="/signup">Sign up with a username, email, and password.</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
