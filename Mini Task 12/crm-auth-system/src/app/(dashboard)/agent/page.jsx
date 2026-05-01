import { auth } from '@/lib/auth';
import StatsCard from '@/components/dashboard/StatsCard';

export const metadata = {
  title: 'Agent Dashboard | CRM System',
};

export default async function AgentPage() {
  const session = await auth();
  const userName = session?.user?.name ?? 'Agent';

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl shrink-0">
            👋
          </div>
          <div>
            <h2 className="text-xl font-bold">Welcome back, {userName}!</h2>
            <p className="text-indigo-100 text-sm mt-1">
              Here&apos;s a snapshot of your activity today. Stay focused and keep
              converting!
            </p>
          </div>
        </div>
      </div>

      {/* Section heading */}
      <div>
        <h3 className="text-slate-700 font-semibold text-base">Your Activity</h3>
        <p className="text-slate-400 text-xs mt-0.5">
          Your personal performance metrics at a glance.
        </p>
      </div>

      {/* Placeholder Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatsCard
          title="My Open Leads"
          value={24}
          icon="📋"
          color="indigo"
        />
        <StatsCard
          title="Converted This Month"
          value={7}
          icon="🎯"
          color="emerald"
        />
      </div>

      {/* Tips card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
        <h4 className="text-slate-700 font-semibold text-sm mb-3 flex items-center gap-2">
          <span>💡</span> Quick Tips
        </h4>
        <ul className="space-y-2 text-slate-500 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">→</span>
            Follow up with leads within 24 hours for best results.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">→</span>
            Log every interaction to keep your pipeline accurate.
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-0.5">→</span>
            Check with your admin for updated conversion targets.
          </li>
        </ul>
      </div>
    </div>
  );
}
