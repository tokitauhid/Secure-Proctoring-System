export default function RoleCard({ icon, role, points }) {
  return (
    <div className="bg-surface-700 border border-surface-600/50 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-base font-semibold text-text-primary">{role}</h3>
      </div>
      <ul className="space-y-2">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="text-accent mt-0.5 text-xs">●</span>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
