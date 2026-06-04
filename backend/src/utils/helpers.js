export class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export function sendSuccess(res, data, message = 'Success', statusCode = 200) {
  res.status(statusCode).json({ success: true, message, data });
}

export function sendError(res, message, statusCode = 500) {
  res.status(statusCode).json({ success: false, message });
}
