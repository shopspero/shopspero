import { auth } from '@/lib/auth';
import { hasPermission } from '@/lib/permissions';
import { getPaginatedOrders } from '@/lib/finances';
import { NextRequest, NextResponse } from 'next/server';

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!hasPermission(session, 'general')) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  const pageParam = Number(req.nextUrl.searchParams.get('page') ?? '1');
  const page = Number.isFinite(pageParam) && pageParam > 0 ? Math.floor(pageParam) : 1;
  const result = await getPaginatedOrders(page, PAGE_SIZE);
  return NextResponse.json(result);
}
