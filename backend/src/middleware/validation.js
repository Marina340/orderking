const { ApiError } = require('../utils/errorHandler');

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
const isValidPassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6;
};

/**
 * Validate registration input
 */
const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError('Please provide name, email, and password', 400);
  }

  if (!isValidEmail(email)) {
    throw new ApiError('Please provide a valid email', 400);
  }

  if (!isValidPassword(password)) {
    throw new ApiError('Password must be at least 6 characters', 400);
  }

  next();
};

/**
 * Validate login input
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError('Please provide email and password', 400);
  }

  if (!isValidEmail(email)) {
    throw new ApiError('Please provide a valid email', 400);
  }

  next();
};

/**
 * Validate product input
 */
const validateProduct = (req, res, next) => {
  const { name, price } = req.body;

  if (!name) {
    throw new ApiError('Please provide product name', 400);
  }

  if (price !== undefined && (isNaN(price) || price < 0)) {
    throw new ApiError('Price must be a positive number', 400);
  }

  next();
};

/**
 * Validate order input
 */
const validateOrder = (req, res, next) => {
  const { items, shipping_address, phone } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new ApiError('Please provide order items', 400);
  }

  if (!shipping_address) {
    throw new ApiError('Please provide shipping address', 400);
  }

  if (!phone) {
    throw new ApiError('Please provide phone number', 400);
  }

  // Validate each item
  for (const item of items) {
    if (!item.product_id || !item.quantity) {
      throw new ApiError('Each item must have product_id and quantity', 400);
    }

    if (item.quantity <= 0) {
      throw new ApiError('Quantity must be greater than 0', 400);
    }
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProduct,
  validateOrder,
};
