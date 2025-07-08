import { Request } from 'express';

// Extend the Request type to include the user property
export interface UserRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Export all types from this file
export * from '@prisma/client';

