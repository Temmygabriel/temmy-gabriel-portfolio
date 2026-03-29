import fs from 'fs';
import path from 'path';

export interface Project {
  id: string;
  title: string;
  description: string;
  tools: string[];
  outcome: string;
  link?: string;
  featured: boolean;
  order: number;
  category: string;
  metric: string;
  highlight: string;
}

const DATA_PATH = path.join(process.cwd(), 'data', 'projects.json');

export function getProjects(): Project[] {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  const projects: Project[] = JSON.parse(raw);
  return projects.sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectById(id: string): Project | undefined {
  return getProjects().find((p) => p.id === id);
}
