import { NextResponse } from 'next/server';

// Middleware already guards this route — no need to re-check session here
// This runs in Node.js runtime (not Edge), so no Edge restrictions apply
export const runtime = 'nodejs';

export async function GET() {
  const analytics = {
    totalLeads: 1284,
    converted: 347,
    revenue: 248500,
    agents: 12,
    chartData: [
      { month: 'Jan', leads: 120, converted: 34 },
      { month: 'Feb', leads: 145, converted: 50 },
      { month: 'Mar', leads: 98,  converted: 27 },
      { month: 'Apr', leads: 210, converted: 75 },
      { month: 'May', leads: 175, converted: 60 },
      { month: 'Jun', leads: 190, converted: 72 },
      { month: 'Jul', leads: 160, converted: 55 },
      { month: 'Aug', leads: 186, converted: 74 },
    ],
  };

  return NextResponse.json(analytics, { status: 200 });
}
