const { query } = require('../config/database');
const { ApiError, asyncHandler } = require('../utils/errorHandler');

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const result = await query(
    'SELECT id, name, slug, description, created_at FROM categories ORDER BY name'
  );

  res.status(200).json({
    success: true,
    data: result.rows,
  });
});

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await query(
    'SELECT id, name, slug, description, created_at FROM categories WHERE id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    throw new ApiError('Category not found', 404);
  }

  res.status(200).json({
    success: true,
    data: result.rows[0],
  });
});

module.exports = {
  getCategories,
  getCategory,
};
