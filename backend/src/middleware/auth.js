const { verifyToken } = require('../utils/jwt');
const { query } = require('../config/database');
const { ApiError, asyncHandler } = require('../utils/errorHandler');

/**
 * Protect routes - verify JWT token
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  // Make sure token exists
  if (!token) {
    throw new ApiError('Not authorized to access this route', 401);
  }

  try {
    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const result = await query(
      'SELECT id, name, email, role, is_active FROM users WHERE id = $1',
      [decoded.id]
    );

    if (result.rows.length === 0) {
      throw new ApiError('User not found', 404);
    }

    const user = result.rows[0];

    // Check if user is active
    if (!user.is_active) {
      throw new ApiError('User account is deactivated', 401);
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError('Not authorized to access this route', 401);
  }
});

/**
 * Grant access to specific roles
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(
        `User role '${req.user.role}' is not authorized to access this route`,
        403
      );
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
};
