export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-surface-700 border border-surface-600/50 rounded-xl p-6 hover:border-accent/30 transition-colors duration-300 group">
      <div className="w-10 h-10 rounded-lg bg-surface-600 flex items-center justify-center text-accent mb-4 group-hover:bg-accent/10 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-secondary leading-relaxed">{description}</p>
    </div>
  );
}
