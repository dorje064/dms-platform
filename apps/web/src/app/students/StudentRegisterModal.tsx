'use client';

import { useState, useEffect } from 'react';

interface FormFields {
  name: string;
  grade: string;
  school: string;
  region: string;
  email: string;
  phone: string;
  notes: string;
}

interface Props {
  onClose: () => void;
}

const INITIAL: FormFields = {
  name: '',
  grade: '',
  school: '',
  region: '',
  email: '',
  phone: '',
  notes: '',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333/api';

export default function StudentRegisterModal({ onClose }: Props) {
  const [form, setForm] = useState<FormFields>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormFields>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const validate = (): boolean => {
    const errs: Partial<FormFields> = {};
    if (!form.name.trim()) errs.name = 'Full name is required';
    if (!form.grade.trim()) errs.grade = 'Grade / class is required';
    if (!form.school.trim()) errs.school = 'School or institution is required';
    if (!form.region.trim()) errs.region = 'Region is required';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = 'Enter a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear field error on change
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setServerError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setServerError('');

    try {
      const res = await fetch(`${API_BASE}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          grade: form.grade.trim(),
          school: form.school.trim(),
          region: form.region.trim(),
          email: form.email.trim() || undefined,
          phone: form.phone.trim() || undefined,
          notes: form.notes.trim() || undefined,
          status: 'Pending',
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = Array.isArray(data.message) ? data.message.join(', ') : data.message;
        setServerError(msg ?? 'Registration failed. Please try again.');
        return;
      }

      setSuccess(true);
    } catch {
      setServerError('Unable to connect to the server. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="modal-backdrop" onClick={onClose} />

      {/* Modal */}
      <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">Register as Student</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {success ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Registration Submitted!</h3>
            <p>
              Thank you, <strong>{form.name}</strong>. Your registration has been received and is
              currently <strong>pending review</strong>. We'll be in touch soon.
            </p>
            <button className="btn btn-sm" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form className="modal-form" onSubmit={handleSubmit} noValidate>
            {serverError && (
              <div className="form-server-error">{serverError}</div>
            )}

            {/* Name + Grade */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-name">Full Name *</label>
                <input
                  id="reg-name"
                  name="name"
                  type="text"
                  className={`form-input${errors.name ? ' input-error' : ''}`}
                  placeholder="e.g. Tenzin Dorjee"
                  value={form.name}
                  onChange={handleChange}
                  autoFocus
                />
                {errors.name && <span className="input-error-msg">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-grade">Grade / Class *</label>
                <input
                  id="reg-grade"
                  name="grade"
                  type="text"
                  className={`form-input${errors.grade ? ' input-error' : ''}`}
                  placeholder="e.g. Grade 11"
                  value={form.grade}
                  onChange={handleChange}
                />
                {errors.grade && <span className="input-error-msg">{errors.grade}</span>}
              </div>
            </div>

            {/* School + Region */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-school">School / Institution *</label>
                <input
                  id="reg-school"
                  name="school"
                  type="text"
                  className={`form-input${errors.school ? ' input-error' : ''}`}
                  placeholder="e.g. Namkha Khyung Dzong School"
                  value={form.school}
                  onChange={handleChange}
                />
                {errors.school && <span className="input-error-msg">{errors.school}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-region">Region *</label>
                <input
                  id="reg-region"
                  name="region"
                  type="text"
                  className={`form-input${errors.region ? ' input-error' : ''}`}
                  placeholder="e.g. Yultsho Dhun"
                  value={form.region}
                  onChange={handleChange}
                />
                {errors.region && <span className="input-error-msg">{errors.region}</span>}
              </div>
            </div>

            {/* Email + Phone */}
            <div className="form-row-2">
              <div className="form-group">
                <label className="form-label" htmlFor="reg-email">Email <span className="optional">(optional)</span></label>
                <input
                  id="reg-email"
                  name="email"
                  type="email"
                  className={`form-input${errors.email ? ' input-error' : ''}`}
                  placeholder="student@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="input-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="reg-phone">Phone <span className="optional">(optional)</span></label>
                <input
                  id="reg-phone"
                  name="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+977 9800000000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label" htmlFor="reg-notes">Additional Notes <span className="optional">(optional)</span></label>
              <textarea
                id="reg-notes"
                name="notes"
                rows={3}
                className="form-input form-textarea"
                placeholder="Any additional information about your situation or needs…"
                value={form.notes}
                onChange={handleChange}
              />
            </div>

            {/* Info note */}
            <p className="form-info-note">
              Your application will be reviewed by our team. Status will be marked as <strong>Pending</strong> until approved.
            </p>

            {/* Actions */}
            <div className="form-actions">
              <button type="button" className="btn btn-outline btn-sm" onClick={onClose} disabled={submitting}>
                Cancel
              </button>
              <button type="submit" className="btn btn-sm" disabled={submitting}>
                {submitting ? 'Submitting…' : 'Submit Registration'}
              </button>
            </div>
          </form>
        )}
      </div>

      <style>{`
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(8, 37, 66, 0.6);
          backdrop-filter: blur(4px);
          z-index: 1100;
        }
        .modal-container {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1101;
          background: #ffffff;
          border-radius: 20px;
          box-shadow: 0 25px 60px rgba(8, 37, 66, 0.25);
          width: min(680px, calc(100vw - 2rem));
          max-height: calc(100vh - 3rem);
          overflow-y: auto;
          animation: modalIn 0.2s ease;
        }
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -46%); }
          to   { opacity: 1; transform: translate(-50%, -50%); }
        }
        .modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem 1.75rem 1rem;
          border-bottom: 1px solid #e8eef5;
        }
        .modal-title {
          font-size: 1.3rem;
          color: var(--primary-blue);
          margin: 0;
        }
        .modal-close {
          background: none;
          border: none;
          font-size: 1.1rem;
          color: #888;
          cursor: pointer;
          padding: 0.3rem 0.5rem;
          border-radius: 6px;
          transition: background 0.2s, color 0.2s;
        }
        .modal-close:hover { background: #f1f5f9; color: var(--primary-blue); }

        .modal-form {
          padding: 1.5rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
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
        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 520px) {
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
        .optional {
          font-weight: 400;
          color: #999;
          font-size: 0.8rem;
        }
        .form-input {
          padding: 0.6rem 0.85rem;
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
        .form-textarea { resize: vertical; min-height: 80px; }
        .input-error-msg {
          font-size: 0.78rem;
          color: #dc2626;
          margin-top: 0.1rem;
        }
        .form-info-note {
          font-size: 0.82rem;
          color: var(--text-muted);
          background: #f1f5fb;
          padding: 0.65rem 0.9rem;
          border-radius: 8px;
          border-left: 3px solid var(--primary-blue);
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          padding-top: 0.5rem;
          border-top: 1px solid #f0f0f0;
        }

        /* Success state */
        .modal-success {
          padding: 2.5rem 1.75rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }
        .success-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary-blue), var(--primary-light));
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(15, 61, 104, 0.3);
        }
        .modal-success h3 {
          font-size: 1.3rem;
          color: var(--primary-blue);
          margin: 0;
        }
        .modal-success p {
          color: var(--text-muted);
          max-width: 380px;
          font-size: 0.95rem;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
