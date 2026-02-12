'use client';

import { useEffect, useState } from 'react';
import './pdf-modal.css';

interface PDFModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfBasePath: string; // e.g., '/pdfs'
  title?: string;
}

export function PDFModal({ isOpen, onClose, pdfBasePath, title = 'Document Viewer' }: PDFModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'nepali' | 'tibetian'>('english');

  useEffect(() => {
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const pdfUrl = `${pdfBasePath}/${selectedLanguage}.pdf`;

  return (
    <div className="pdf-modal-overlay" onClick={onClose}>
      <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="pdf-modal-header">
          <h2 className="pdf-modal-title">{title}</h2>

          {/* Language Selector */}
          <div className="pdf-language-selector">
            <button
              className={`language-btn ${selectedLanguage === 'english' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('english')}
            >
              🇬🇧 English
            </button>
            <button
              className={`language-btn ${selectedLanguage === 'nepali' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('nepali')}
            >
              🇳🇵 नेपाली
            </button>
            <button
              className={`language-btn ${selectedLanguage === 'tibetian' ? 'active' : ''}`}
              onClick={() => setSelectedLanguage('tibetian')}
            >
              🏔️ བོད་ཡིག
            </button>
          </div>

          <button className="pdf-modal-close" onClick={onClose} aria-label="Close modal">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* PDF Viewer */}
        <div className="pdf-modal-content">
          <iframe
            src={pdfUrl}
            className="pdf-viewer"
            title={`${title} - ${selectedLanguage}`}
          />
        </div>
      </div>
    </div>
  );
}
