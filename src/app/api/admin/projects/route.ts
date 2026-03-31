import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { getProjects, Project } from '@/lib/projects';
import { commitProjectsToGitHub } from '@/lib/github';

async function checkAuth(req: NextRequest, res: NextResponse): Promise<boolean> {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  return session.isAdmin === true;
}

// GET all projects (admin view)
export async function GET(req: NextRequest) {
  const res = NextResponse.json([]);
  if (!(await checkAuth(req, res))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json(getProjects());
}

// POST — create new project
export async function POST(req: NextRequest) {
  const res = NextResponse.json({});
  if (!(await checkAuth(req, res))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const projects = getProjects();
  const newProject: Project = {
    id: body.id || Date.now().toString(),
    title: body.title,
    description: body.description,
    tools: body.tools,
    outcome: body.outcome,
    link: body.link || '',
    featured: body.featured ?? false,
    order: body.order ?? projects.length + 1,
    category: body.category || 'Other',
    metric: body.metric || '',
    highlight: body.highlight || '',
  };
  const updated = [...projects, newProject];

  try {
    await commitProjectsToGitHub(updated);
    return NextResponse.json(newProject, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('GitHub commit failed (POST):', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PUT — update existing project
export async function PUT(req: NextRequest) {
  const res = NextResponse.json({});
  if (!(await checkAuth(req, res))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const projects = getProjects();
  const idx = projects.findIndex((p) => p.id === body.id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  projects[idx] = { ...projects[idx], ...body };

  try {
    await commitProjectsToGitHub(projects);
    return NextResponse.json(projects[idx]);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('GitHub commit failed (PUT):', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE — remove a project
export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({});
  if (!(await checkAuth(req, res))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { id } = await req.json();
  const projects = getProjects().filter((p) => p.id !== id);

  try {
    await commitProjectsToGitHub(projects);
    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('GitHub commit failed (DELETE):', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
