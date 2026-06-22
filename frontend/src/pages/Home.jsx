import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import FeatureCard from '../components/common/FeatureCard';
import RoleCard from '../components/common/RoleCard';

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'AI Cheating Detection',
    description: 'Real-time behavioral analysis using computer vision to flag suspicious activity during exams.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    title: 'Face Recognition',
    description: 'Biometric identity verification at exam start ensures only registered students can participate.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Screen Monitoring',
    description: 'Tracks tab switches, copy-paste attempts, and window focus loss with instant violation logging.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: 'Live Proctoring',
    description: 'WebSocket-powered dashboard lets proctors monitor all candidates simultaneously in real time.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 3 21 3 21 8" />
        <line x1="4" y1="20" x2="21" y2="3" />
        <polyline points="21 16 21 21 16 21" />
        <line x1="15" y1="15" x2="21" y2="21" />
        <line x1="4" y1="4" x2="9" y2="9" />
      </svg>
    ),
    title: 'Randomized Questions',
    description: 'Unique question order and pool sampling per student session to prevent answer sharing.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
    title: 'Auto Grading',
    description: 'Instant scoring for objective questions with AI-assisted evaluation for short answers.',
  },
];

const roles = [
  {
    icon: '🎓',
    role: 'Student',
    points: ['Face-verified login', 'Take proctored exams', 'View results and feedback'],
  },
  {
    icon: '🛠️',
    role: 'Admin',
    points: ['Create and manage exams', 'Build question banks', 'View analytics and reports'],
  },
  {
    icon: '🔍',
    role: 'Proctor',
    points: ['Live candidate monitoring', 'Real-time violation alerts', 'Post-exam reports'],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-surface-900">
      <Navbar />

      {/* Hero */}
      <section id="hero" className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-surface-700 border border-surface-600/50 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-text-secondary font-medium">Open Source &middot; AI-Powered</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-5 tracking-tight">
            Secure Online Examination
            <br />
            <span className="text-accent">&amp; Proctoring System</span>
          </h1>

          <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
            Conduct tamper-resistant exams with AI-powered face recognition,
            real-time monitoring, and automated grading — all in one platform.
          </p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="/register"
              id="hero-cta-primary"
              className="bg-accent hover:bg-accent-dim text-white text-sm font-medium px-7 py-3 rounded-lg transition-colors duration-200"
            >
              Get Started
            </a>
            <a
              href="#features"
              id="hero-cta-secondary"
              className="bg-surface-700 hover:bg-surface-600 text-text-primary text-sm font-medium px-7 py-3 rounded-lg border border-surface-600/50 transition-colors duration-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Core Features</h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Everything you need to conduct fair, secure, and scalable online examinations.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="py-20 px-6 bg-surface-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">Three User Roles</h2>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Purpose-built interfaces for every participant in the examination process.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {roles.map((r, i) => (
              <RoleCard key={i} icon={r.icon} role={r.role} points={r.points} />
            ))}
          </div>
        </div>
      </section>

      {/* About / CTA */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">Built for Academic Integrity</h2>
          <p className="text-sm text-text-secondary leading-relaxed mb-8 max-w-lg mx-auto">
            SecureExam combines FastAPI, React, and computer vision into a single
            open-source platform — designed for institutions that take fair assessment seriously.
          </p>
          <a
            href="/register"
            id="about-cta"
            className="inline-block bg-accent hover:bg-accent-dim text-white text-sm font-medium px-7 py-3 rounded-lg transition-colors duration-200"
          >
            Start Using SecureExam
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
