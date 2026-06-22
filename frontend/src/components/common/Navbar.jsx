import { useState } from 'react';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav id="navbar" className="fixed top-0 left-0 right-0 z-50 bg-surface-900/95 backdrop-blur-sm border-b border-surface-600/40">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <a href="/" id="navbar-brand" className="flex items-center gap-3 group">
          <img src={logo} alt="SecureExam logo" className="w-9 h-9 rounded-lg" />
          <span className="text-lg font-semibold text-text-primary tracking-tight">
            Secure<span className="text-accent">Exam</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">Features</a>
          <a href="#roles" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">Roles</a>
          <a href="#about" className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-200">About</a>
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="/login" id="navbar-login" className="text-sm text-text-secondary hover:text-text-primary px-4 py-2 transition-colors duration-200">
            Log in
          </a>
          <a href="/register" id="navbar-signup" className="text-sm font-medium bg-accent hover:bg-accent-dim text-white px-5 py-2 rounded-lg transition-colors duration-200">
            Get Started
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          id="navbar-mobile-toggle"
          className="md:hidden text-text-secondary hover:text-text-primary p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-surface-800 border-t border-surface-600/40 px-6 py-4 space-y-3">
          <a href="#features" className="block text-sm text-text-secondary hover:text-text-primary transition-colors">Features</a>
          <a href="#roles" className="block text-sm text-text-secondary hover:text-text-primary transition-colors">Roles</a>
          <a href="#about" className="block text-sm text-text-secondary hover:text-text-primary transition-colors">About</a>
          <hr className="border-surface-600/40" />
          <a href="/login" className="block text-sm text-text-secondary hover:text-text-primary transition-colors">Log in</a>
          <a href="/register" className="block text-sm font-medium text-accent">Get Started</a>
        </div>
      )}
    </nav>
  );
}
