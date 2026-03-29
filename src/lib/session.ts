import { SessionOptions } from 'iron-session';

export interface SessionData {
  isAdmin?: boolean;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_SECRET || 'complex-password-at-least-32-characters-long-here',
  cookieName: 'temmy-admin-session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 60 * 60 * 8, // 8 hours
  },
};
