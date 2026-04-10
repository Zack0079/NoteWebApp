import type { Request, Response, NextFunction } from 'express';

export const protect = (req: Request, res: Response, next: NextFunction) => {
  // Simple example: checking for a custom header or token
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    // In a real app, verify the JWT here
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};