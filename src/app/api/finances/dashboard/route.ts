import { auth } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { getFinancesDashboard } from '@/lib/finances';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const dashboard = await getFinancesDashboard();
  return NextResponse.json(dashboard);
}
