import { NextRequest, NextResponse } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';
import { getProjects, Project } from '@/lib/projects';
import { commitProjectsToGitHub } from '@/lib/github';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'data', 'projects.json');

async function checkAuth(req: NextRequest, res: NextResponse): Promise<boolean> {
  const session = await getIronSession<SessionData>(req, res, sessionOptions);
  return session.isAdmin === true;
}

function saveLocally(projects: Project[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(projects, null, 2));
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
  saveLocally(updated);

  // Only commit to GitHub if token is configured
  if (process.env.GITHUB_TOKEN) {
    await commitProjectsToGitHub(updated);
  }

  return NextResponse.json(newProject, { status: 201 });
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
  saveLocally(projects);

  if (process.env.GITHUB_TOKEN) {
    await commitProjectsToGitHub(projects);
  }

  return NextResponse.json(projects[idx]);
}

// DELETE — remove a project
export async function DELETE(req: NextRequest) {
  const res = NextResponse.json({});
  if (!(await checkAuth(req, res))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await req.json();
  const projects = getProjects().filter((p) => p.id !== id);
  saveLocally(projects);

  if (process.env.GITHUB_TOKEN) {
    await commitProjectsToGitHub(projects);
  }

  return NextResponse.json({ ok: true });
}
