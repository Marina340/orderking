const bcrypt = require('bcryptjs');
const { query } = require('../config/database');
const { generateToken } = require('../utils/jwt');
const { ApiError, asyncHandler } = require('../utils/errorHandler');
const supabase = require('../config/supabase');

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await query('SELECT id FROM users WHERE email = $1', [
    email,
  ]);

  if (existingUser.rows.length > 0) {
    throw new ApiError('User already exists with this email', 400);
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // Create user
  const result = await query(
    'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role, created_at',
    [name, email, passwordHash, 'user']
  );

  const user = result.rows[0];

  // Generate token
  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
      token,
    },
  });
});

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const result = await query(
    'SELECT id, name, email, password_hash, role, is_active FROM users WHERE email = $1',
    [email]
  );

  if (result.rows.length === 0) {
    throw new ApiError('Invalid credentials', 401);
  }

  const user = result.rows[0];

  // Check if user is active
  if (!user.is_active) {
    throw new ApiError('Your account has been deactivated', 401);
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new ApiError('Invalid credentials', 401);
  }

  // Generate token
  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  res.status(200).json({
    success: true,
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    },
  });
});

/**
 * @desc    Forgot password - trigger password reset email
 * @route   POST /api/auth/forgotpassword
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError('Please provide an email address', 400);
  }

  // Check if user exists
  const result = await query('SELECT id, email FROM users WHERE email = $1', [
    email,
  ]);

  if (result.rows.length === 0) {
    // Don't reveal if user exists or not for security
    return res.status(200).json({
      success: true,
      message: 'If an account exists with this email, a password reset link has been sent',
    });
  }

  const user = result.rows[0];

  // Use Supabase for password reset if configured
  if (supabase) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password`,
      });

      if (error) {
        console.error('Supabase password reset error:', error);
        throw new ApiError('Failed to send password reset email', 500);
      }

      res.status(200).json({
        success: true,
        message: 'Password reset email sent successfully',
      });
    } catch (error) {
      console.error('Password reset error:', error);
      throw new ApiError('Failed to send password reset email', 500);
    }
  } else {
    // Fallback: Generate reset token and store in database
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 3600000); // 1 hour

    await query(
      'INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES ($1, $2, $3)',
      [user.id, resetToken, expiresAt]
    );

    // In production, send email with reset link
    // For now, just return success message
    console.log(`Password reset token for ${email}: ${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'Password reset email sent successfully',
      // Remove this in production
      ...(process.env.NODE_ENV === 'development' && { resetToken }),
    });
  }
});

/**
 * @desc    Get current logged in user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  // User is already attached to req by protect middleware
  const result = await query(
    'SELECT id, name, email, role, is_active, created_at, updated_at FROM users WHERE id = $1',
    [req.user.id]
  );

  if (result.rows.length === 0) {
    throw new ApiError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    data: result.rows[0],
  });
});

module.exports = {
  register,
  login,
  forgotPassword,
  getMe,
};
