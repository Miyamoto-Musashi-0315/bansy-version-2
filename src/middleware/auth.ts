import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { config } from '../config';
import { prisma } from '../prismaClient';

export interface UserRequest extends Request {
  user?: {
    id: string;
    email?: string;
    username?: string;
    role: string;
  };
}

export const authenticateUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'Invalid token format' });
    }
    
    const decoded = verify(token, config.jwtSecret) as any;
    
    // Handle both regular users and developer users
    if (decoded.role === 'DEVELOPER') {
      // For developer users, we don't need to check the database
      req.user = {
        id: decoded.userId,
        username: decoded.username,
        role: decoded.role
      };
      return next();
    }
    
    // For regular users, verify they exist in the database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true },
    });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

export const requireRole = (role: string) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    if (req.user.role !== role) {
      return res.status(403).json({ error: `Access denied. ${role} role required.` });
    }
    
    next();
  };
};

export const requireDeveloper = (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  if (req.user.role !== 'DEVELOPER') {
    return res.status(403).json({ error: 'Access denied. Developer role required.' });
  }
  
  next();
};