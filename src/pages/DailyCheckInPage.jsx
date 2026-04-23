import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DailyCheckInPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({
    sleep: '',
    stress: '',
    caffeine: '',
  });
  const [error, setError] = useState('');

  function setAnswer(key, value) {
    setAnswers((current) => ({ ...current, [key]: value }));
    setError('');
  }

  function handleContinue() {
    if (!answers.sleep || !answers.stress || !answers.caffeine) {
      setError('Please complete all check-in questions before continuing.');
      return;
    }

    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="page-shell dashboard-shell">
      <div className="background-orb orb-left" />
      <div className="background-orb orb-right" />

      <section className="dashboard-card">
        <span className="brand-badge">Calmimind</span>
        <h1>Daily Check-In</h1>
        <p>Take one quiet minute to notice how you are feeling today before entering your dashboard.</p>

        <div className="checkin-stack">
          <article className="dashboard-panel">
            <h2>Sleep</h2>
            <p>Did you sleep well last night?</p>
            <div className="choice-row">
              <button
                type="button"
                className={`choice-button ${answers.sleep === 'yes' ? 'choice-button-active' : ''}`}
                onClick={() => setAnswer('sleep', 'yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`choice-button ${answers.sleep === 'no' ? 'choice-button-active' : ''}`}
                onClick={() => setAnswer('sleep', 'no')}
              >
                No
              </button>
            </div>
          </article>

          <article className="dashboard-panel">
            <h2>Stress</h2>
            <p>Are you feeling stressed today?</p>
            <div className="choice-row">
              <button
                type="button"
                className={`choice-button ${answers.stress === 'yes' ? 'choice-button-active' : ''}`}
                onClick={() => setAnswer('stress', 'yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`choice-button ${answers.stress === 'no' ? 'choice-button-active' : ''}`}
                onClick={() => setAnswer('stress', 'no')}
              >
                No
              </button>
            </div>
          </article>

          <article className="dashboard-panel">
            <h2>Caffeine</h2>
            <p>Have you had caffeine today?</p>
            <div className="choice-row">
              <button
                type="button"
                className={`choice-button ${answers.caffeine === 'yes' ? 'choice-button-active' : ''}`}
                onClick={() => setAnswer('caffeine', 'yes')}
              >
                Yes
              </button>
              <button
                type="button"
                className={`choice-button ${answers.caffeine === 'no' ? 'choice-button-active' : ''}`}
                onClick={() => setAnswer('caffeine', 'no')}
              >
                No
              </button>
            </div>
          </article>
        </div>

        {error ? <div className="form-message error-message">{error}</div> : null}

        <button className="primary-button" type="button" onClick={handleContinue}>
          Continue to Dashboard
        </button>
      </section>
    </div>
  );
}
