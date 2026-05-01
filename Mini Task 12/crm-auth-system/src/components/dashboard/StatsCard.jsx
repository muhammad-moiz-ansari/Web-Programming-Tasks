export default function StatsCard({ title, value, icon, color = 'indigo' }) {
  const colorMap = {
    indigo: {
      bg: 'bg-indigo-50',
      icon: 'bg-indigo-100 text-indigo-600',
      value: 'text-indigo-700',
      border: 'border-indigo-100',
    },
    emerald: {
      bg: 'bg-emerald-50',
      icon: 'bg-emerald-100 text-emerald-600',
      value: 'text-emerald-700',
      border: 'border-emerald-100',
    },
    amber: {
      bg: 'bg-amber-50',
      icon: 'bg-amber-100 text-amber-600',
      value: 'text-amber-700',
      border: 'border-amber-100',
    },
    rose: {
      bg: 'bg-rose-50',
      icon: 'bg-rose-100 text-rose-600',
      value: 'text-rose-700',
      border: 'border-rose-100',
    },
  };

  const c = colorMap[color] ?? colorMap.indigo;

  return (
    <div
      className={`
        bg-white rounded-2xl border ${c.border} p-5
        shadow-sm hover:shadow-md transition-shadow duration-200
        flex items-center gap-4
      `}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${c.icon}`}>
        <span className="text-xl">{icon}</span>
      </div>

      {/* Text */}
      <div className="min-w-0">
        <p className="text-slate-500 text-xs font-medium uppercase tracking-wide truncate">
          {title}
        </p>
        <p className={`text-2xl font-bold mt-0.5 ${c.value}`}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
}
