import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { getProjects } from '@/lib/projects';
import { commitProjectsToGitHub } from '@/lib/github';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'projects.json');

export async function POST(req: NextRequest) {
  const res = NextResponse.json({ ok: true });
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  if (!session.isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { orderedIds } = await req.json();
  const projects = getProjects();

  const reordered = orderedIds.map((id: string, idx: number) => {
    const p = projects.find((p) => p.id === id)!;
    return { ...p, order: idx + 1 };
  });

  fs.writeFileSync(DATA_PATH, JSON.stringify(reordered, null, 2));

  if (process.env.GITHUB_TOKEN) {
    await commitProjectsToGitHub(reordered);
  }

  return res;
}
