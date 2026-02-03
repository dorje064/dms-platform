'use client';

import Image from 'next/image';
import { useState } from 'react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container nav-container">
        <div className="logo-group">
          <div className="logo-wrapper">
            <Image
              src="/images/logo.jpg"
              alt="DMS Logo"
              fill
              className="img-cover"
            />
          </div>
          <span className="brand-name">DMS</span>
        </div>

        {/* Desktop Navigation */}
        <div className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/#donor" onClick={closeMenu}>Donor</a>
          <a href="/about-us" onClick={closeMenu}>About Us</a>
          <a href="/students" onClick={closeMenu}>Students</a>
          <a href="/#contact" onClick={closeMenu}>Contact</a>

          {/* Mobile-only Donate button */}
          <a href="/#donate" className="btn btn-sm mobile-donate-btn" onClick={closeMenu}>Donate</a>
        </div>

        {/* Desktop Donate Button */}
        <a href="/#donate" className="btn btn-sm desktop-donate-btn">Donate</a>

        {/* Hamburger Menu */}
        <button
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};
