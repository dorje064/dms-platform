import { Navbar } from '../../../components/navbar';
import { Footer } from '../../../components/footer';
import StudentRegisterForm from './StudentRegisterForm';
import Link from 'next/link';

export const metadata = {
  title: 'Register as Student | Degyal Memorial Society',
  description:
    'Apply for educational support from the Degyal Memorial Society. Fill in your details and our team will review your application.',
};

export default function StudentRegisterPage() {
  return (
    <div className="page-wrapper">
      <Navbar />

      {/* Page Header */}
      <header className="page-header">
        <div className="container text-center">
          <p className="subtitle" style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '0.5rem' }}>
            Educational Support
          </p>
          <h1 className="hero-title text-white">Student Registration</h1>
          <p className="text-white" style={{ opacity: 0.8, maxWidth: '540px', margin: '0 auto' }}>
            Apply for a scholarship or educational support grant from the Degyal Memorial Society.
            All applications are reviewed by our committee.
          </p>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
          {' / '}
          <Link href="/students" style={{ color: 'var(--text-muted)' }}>Students</Link>
          {' / '}
          <span style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Register</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container" style={{ paddingBottom: '4rem' }}>
        <div className="register-page-layout">
          {/* Left — Info Card */}
          <aside className="register-info-card">
            <h3>Who Can Apply?</h3>
            <ul className="register-info-list">
              <li>🎓 Students from the Degyal lineage community regions</li>
              <li>📚 Currently enrolled in school, college, or university</li>
              <li>🌏 Based in Nepal or abroad</li>
            </ul>

            <h3 style={{ marginTop: '1.5rem' }}>What Happens Next?</h3>
            <ol className="register-steps-list">
              <li>
                <span className="step-num">1</span>
                Submit your registration below
              </li>
              <li>
                <span className="step-num">2</span>
                Committee reviews your application
              </li>
              <li>
                <span className="step-num">3</span>
                You will be contacted for follow-up
              </li>
              <li>
                <span className="step-num">4</span>
                Approval & support disbursement
              </li>
            </ol>

            <div className="register-contact-note">
              <p>Need help? Contact us at</p>
              <a href="mailto:info@dms.org" className="register-contact-email">
                info@dms.org
              </a>
            </div>
          </aside>

          {/* Right — Form */}
          <div className="register-form-card">
            <div className="register-form-header">
              <h2 className="register-form-title">Application Form</h2>
              <p className="register-form-subtitle">
                Fields marked with <span className="required">*</span> are required.
              </p>
            </div>
            <StudentRegisterForm />
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        /* ── Page header uses existing .page-header class ── */
        .page-header {
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-dark));
          padding: 5rem 0 4rem;
        }

        /* ── Two-column layout ── */
        .register-page-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 2rem;
          align-items: start;
          padding-top: 2rem;
        }
        @media (max-width: 768px) {
          .register-page-layout {
            grid-template-columns: 1fr;
          }
        }

        /* ── Info sidebar ── */
        .register-info-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e8eef5;
          padding: 1.75rem;
          box-shadow: 0 4px 12px rgba(15, 61, 104, 0.07);
          position: sticky;
          top: 90px;
        }
        .register-info-card h3 {
          font-size: 1rem;
          color: var(--primary-blue);
          margin-bottom: 0.85rem;
        }
        .register-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .register-info-list li {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.5;
        }
        .register-steps-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .register-steps-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.875rem;
          color: var(--text-muted);
        }
        .step-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--primary-blue);
          color: white;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .register-contact-note {
          margin-top: 1.5rem;
          padding: 1rem;
          background: #f1f5fb;
          border-radius: 10px;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }
        .register-contact-email {
          display: block;
          color: var(--primary-blue);
          font-weight: 600;
          margin-top: 0.3rem;
          font-size: 0.95rem;
        }

        /* ── Form card ── */
        .register-form-card {
          background: white;
          border-radius: 16px;
          border: 1px solid #e8eef5;
          box-shadow: 0 4px 12px rgba(15, 61, 104, 0.07);
          overflow: hidden;
        }
        .register-form-header {
          padding: 1.5rem 1.75rem 1.25rem;
          border-bottom: 1px solid #f0f4f8;
        }
        .register-form-title {
          font-size: 1.25rem;
          color: var(--primary-blue);
          margin: 0 0 0.2rem;
        }
        .register-form-subtitle {
          font-size: 0.85rem;
          color: var(--text-muted);
          margin: 0;
        }
        .required { color: #dc2626; font-weight: 700; }
        .optional { color: #999; font-size: 0.8rem; font-weight: 400; }

        /* ── Form internals ── */
        .register-form {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 560px) {
          .form-row-2 { grid-template-columns: 1fr; }
        }
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .form-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-main);
        }
        .form-input {
          padding: 0.65rem 0.875rem;
          border: 1.5px solid #d1d5db;
          border-radius: 8px;
          font-size: 0.9rem;
          color: var(--text-main);
          background: #fafafa;
          font-family: var(--font-body);
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          width: 100%;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary-blue);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(15, 61, 104, 0.1);
        }
        .form-input.input-error {
          border-color: #dc2626;
          background: #fff5f5;
        }
        .form-textarea { resize: vertical; min-height: 100px; }
        .input-error-msg {
          font-size: 0.78rem;
          color: #dc2626;
        }
        .form-server-error {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-left: 4px solid #dc2626;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          color: #dc2626;
          font-size: 0.9rem;
        }
        .form-info-note {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          font-size: 0.85rem;
          color: var(--text-muted);
          background: #f1f5fb;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          border-left: 3px solid var(--primary-blue);
          line-height: 1.5;
        }
        .info-icon {
          flex-shrink: 0;
          color: var(--primary-blue);
          font-size: 1rem;
          margin-top: 0.05rem;
        }
        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid #f0f4f8;
          flex-wrap: wrap;
        }

        /* ── Success state ── */
        .register-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 3rem 2rem;
          gap: 1.25rem;
        }
        .success-icon-wrap {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-light));
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 24px rgba(15, 61, 104, 0.3);
        }
        .success-checkmark {
          font-size: 2rem;
          color: white;
          font-weight: 700;
        }
        .success-heading {
          font-size: 1.5rem;
          color: var(--primary-blue);
          margin: 0;
        }
        .success-body {
          color: var(--text-muted);
          max-width: 420px;
          line-height: 1.7;
          margin: 0;
        }
        .success-actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 0.5rem;
        }
      `}</style>
    </div>
  );
}
