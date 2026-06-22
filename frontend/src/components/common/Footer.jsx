export default function Footer() {
  return (
    <footer id="footer" className="bg-surface-800 border-t border-surface-600/40">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} SecureExam. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted hover:text-text-primary transition-colors duration-200">Privacy</a>
            <a href="#" className="text-sm text-muted hover:text-text-primary transition-colors duration-200">Terms</a>
            <a href="#" className="text-sm text-muted hover:text-text-primary transition-colors duration-200">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
