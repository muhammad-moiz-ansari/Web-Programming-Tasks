import StatsCard from '@/components/dashboard/StatsCard';
import SimpleChart from '@/components/dashboard/SimpleChart';

async function getAnalytics() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/analytics`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const metadata = {
  title: 'Admin Dashboard | CRM System',
};

export default async function AdminPage() {
  const analytics = await getAnalytics();

  const stats = [
    {
      title: 'Total Leads',
      value: analytics?.totalLeads ?? 0,
      icon: '📊',
      color: 'indigo',
    },
    {
      title: 'Converted',
      value: analytics?.converted ?? 0,
      icon: '✅',
      color: 'emerald',
    },
    {
      title: 'Revenue',
      value: analytics?.revenue ? `$${analytics.revenue.toLocaleString()}` : '$0',
      icon: '💰',
      color: 'amber',
    },
    {
      title: 'Active Agents',
      value: analytics?.agents ?? 0,
      icon: '👥',
      color: 'rose',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Admin Dashboard</h2>
        <p className="text-slate-500 text-sm mt-1">
          Overview of your CRM pipeline and team performance.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>

      {/* Chart */}
      <SimpleChart data={analytics?.chartData ?? []} />

      {/* Conversion rate callout */}
      {analytics && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-lg shrink-0">
            📈
          </div>
          <div>
            <p className="text-indigo-900 font-semibold text-sm">Conversion Rate</p>
            <p className="text-indigo-700 text-xs mt-0.5">
              {((analytics.converted / analytics.totalLeads) * 100).toFixed(1)}% of leads converted
              this period — keep it up!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
