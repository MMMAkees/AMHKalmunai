import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from '../utils/helpers.js';

export function signToken(payload) {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

export function authMiddleware(req, _res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError('Authentication required', 401));
  }
  try {
    req.user = jwt.verify(header.slice(7), env.jwt.secret);
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
}

export function authorize(...roles) {
  return (req, _res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError('Access denied', 403));
    }
    next();
  };
}
