import { Project } from './projects';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER!;
const GITHUB_REPO = process.env.GITHUB_REPO!;
const FILE_PATH = 'data/projects.json';

async function getFileSha(): Promise<string> {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    }
  );
  const data = await res.json();
  return data.sha;
}

export async function commitProjectsToGitHub(projects: Project[]): Promise<void> {
  const sha = await getFileSha();
  const content = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${FILE_PATH}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `chore: update projects.json via admin panel [${new Date().toISOString()}]`,
        content,
        sha,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(`GitHub API error: ${err.message}`);
  }
}
