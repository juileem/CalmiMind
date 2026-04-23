import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

function validateSignupForm({ username, email, password, confirmPassword }) {
  if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
    return 'Please complete all fields.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    return 'Please enter a valid email address.';
  }

  if (password.length < 6) {
    return 'Password should be at least 6 characters.';
  }

  if (password !== confirmPassword) {
    return 'Passwords do not match.';
  }

  return '';
}

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationError = validateSignupForm(formData);
    setError(validationError);

    if (validationError) {
      return;
    }

    setSubmitting(true);
    const result = await signup(
      formData.username.trim(),
      formData.email.trim(),
      formData.password
    );
    setSubmitting(false);

    if (!result.success) {
      setError(result.message);
      return;
    }

    await logout();
    navigate('/login', {
      replace: true,
      state: { message: 'Account created successfully. Please log in with your email and password.' },
    });
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Choose a username, create your password, and start building a calmer daily rhythm."
      alternatePrompt="Already have an account?"
      alternateLinkText="Login"
      alternateLinkTo="/login"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="input-group">
          <span>Username</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            autoComplete="username"
            placeholder="Choose a username"
          />
        </label>

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
            autoComplete="new-password"
            placeholder="At least 6 characters"
          />
        </label>

        <label className="input-group">
          <span>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            placeholder="Repeat your password"
          />
        </label>

        {error ? <div className="form-message error-message">{error}</div> : null}

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Sign up'}
        </button>

        <p className="helper-text">
          Already registered? <Link to="/login">Login with your email and password.</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
