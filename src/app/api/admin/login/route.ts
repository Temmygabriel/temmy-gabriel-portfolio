import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const stored = process.env.ADMIN_PASSWORD;

    if (!stored) {
      console.error('ADMIN_PASSWORD_HASH is not set in environment variables');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // Support both bcrypt hashes and plain passwords
    let valid = false;
    if (stored.startsWith('$2a$') || stored.startsWith('$2b$')) {
      valid = await bcrypt.compare(password, stored);
    } else {
      valid = password === stored;
    }

    if (!valid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const res = NextResponse.json({ ok: true });
    const session = await getIronSession<SessionData>(req, res, sessionOptions);
    session.isAdmin = true;
    await session.save();

    return res;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
