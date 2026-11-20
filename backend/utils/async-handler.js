// Express 4 does not catch errors thrown inside async route handlers. Without
// this wrapper a single failed database call becomes an unhandled promise
// rejection, which terminates the whole Node process (the API, and every image
// served from /uploads, goes down until someone restarts it).
export const asyncHandler = (handler) => (req, res, next) =>
  Promise.resolve(handler(req, res, next)).catch(next);
