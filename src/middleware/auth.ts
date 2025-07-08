import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from '../db';
import { JWT_SECRET } from '../config';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}

/**
 * Middleware to authenticate users via JWT
 */
export const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log('--- Authenticating user ---');
  try {
    const authHeader = req.headers.authorization;
    console.log('Auth Header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No token provided or invalid format');
      return res.status(401).json({ error: 'Unauthorized - No token provided' });
    }

    const token = authHeader.split(' ')[1];
    console.log('Token received:', token);
    console.log('Verifying token with secret:', JWT_SECRET ? 'Exists' : 'MISSING!');

    // Verify token and attach user to request
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    console.log('Decoded token:', decoded);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });
    console.log('User found:', !!user);

    if (!user) {
      console.error('Invalid user from token');
      return res.status(401).json({ error: 'Unauthorized - Invalid user' });
    }

    req.user = user;
    console.log('--- Authentication successful ---');
    next();
  } catch (error) {
    console.error('--- Authentication failed ---');
    console.error('JWT verification error:', error);
    // Catches errors from jwt.verify (e.g., expired, invalid signature)
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
