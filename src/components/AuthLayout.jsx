import { Link } from 'react-router-dom';

export default function AuthLayout({
  title,
  subtitle,
  alternatePrompt,
  alternateLinkText,
  alternateLinkTo,
  children,
}) {
  return (
    <div className="page-shell">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <section className="auth-card">
        <div className="brand-block">
          <span className="brand-badge">Calmimind</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        {children}

        <p className="alternate-link">
          {alternatePrompt} <Link to={alternateLinkTo}>{alternateLinkText}</Link>
        </p>
      </section>
    </div>
  );
}
