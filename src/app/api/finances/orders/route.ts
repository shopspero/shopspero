import { auth } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { getPaginatedOrders } from '@/lib/finances';
import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/discordLogger';

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const pageParam = Math.floor(Number(req.nextUrl.searchParams.get('page') ?? '1'));
  const page = Number.isSafeInteger(pageParam) && pageParam > 0 ? pageParam : 1;
  try {
    const result = await getPaginatedOrders(page, PAGE_SIZE);
    return NextResponse.json(result);
  } catch (error) {
    logger.error('Failed to load drop orders', error);
    return NextResponse.json({ error: 'Unable to load drop orders' }, { status: 503 });
  }
}
