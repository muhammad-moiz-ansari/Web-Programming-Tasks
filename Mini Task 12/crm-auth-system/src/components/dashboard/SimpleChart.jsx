'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SimpleChart({ data = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <h3 className="text-slate-700 font-semibold text-sm mb-1">Leads vs Conversions</h3>
      <p className="text-slate-400 text-xs mb-5">Monthly overview</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1e293b',
              border: 'none',
              borderRadius: '10px',
              color: '#f8fafc',
              fontSize: '12px',
            }}
            itemStyle={{ color: '#cbd5e1' }}
            cursor={{ fill: '#f1f5f9' }}
          />
          <Legend
            wrapperStyle={{ fontSize: '12px', color: '#64748b', paddingTop: '16px' }}
          />
          <Bar dataKey="leads" fill="#6366f1" radius={[6, 6, 0, 0]} name="Total Leads" />
          <Bar dataKey="converted" fill="#10b981" radius={[6, 6, 0, 0]} name="Converted" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
