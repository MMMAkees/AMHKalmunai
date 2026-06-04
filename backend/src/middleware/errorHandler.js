import { AppError } from '../utils/helpers.js';

export function errorHandler(err, _req, res, _next) {
  const statusCode = err.statusCode || 500;
  const message = err.isOperational ? err.message : 'Internal server error';

  if (process.env.NODE_ENV !== 'production') {
    console.error('[API Error]', err);
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== 'production' && err.stack ? { stack: err.stack } : {}),
  });
}

export function notFoundHandler(_req, _res, next) {
  next(new AppError('Route not found', 404));
}
