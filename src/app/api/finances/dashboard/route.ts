import { auth } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { getFinancesDashboard } from '@/lib/finances';
import { NextResponse } from 'next/server';
import { logger } from '@/lib/discordLogger';

export async function GET() {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  try {
    const dashboard = await getFinancesDashboard();
    return NextResponse.json(dashboard);
  } catch (error) {
    logger.error('Failed to load finances dashboard', error);
    return NextResponse.json({ error: 'Unable to load finances dashboard' }, { status: 503 });
  }
}
