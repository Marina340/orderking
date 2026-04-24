const { query, getClient } = require('../config/database');
const { ApiError, asyncHandler } = require('../utils/errorHandler');

/**
 * @desc    Get all active products with search and filter
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const { search, category, page = 1, limit = 10 } = req.query;

  // Build query
  let queryText = `
    SELECT p.id, p.name, p.description, p.price, p.stock_quantity, 
           p.image_url, p.is_active, p.created_at, p.updated_at,
           c.id as category_id, c.name as category_name, c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_deleted = false AND p.is_active = true
  `;

  const queryParams = [];
  let paramCount = 0;

  // Add search filter
  if (search) {
    paramCount++;
    queryText += ` AND (p.name ILIKE $${paramCount} OR p.description ILIKE $${paramCount})`;
    queryParams.push(`%${search}%`);
  }

  // Add category filter
  if (category) {
    paramCount++;
    queryText += ` AND c.slug = $${paramCount}`;
    queryParams.push(category);
  }

  // Add ordering
  queryText += ' ORDER BY p.created_at DESC';

  // Add pagination
  const offset = (page - 1) * limit;
  paramCount++;
  queryText += ` LIMIT $${paramCount}`;
  queryParams.push(limit);

  paramCount++;
  queryText += ` OFFSET $${paramCount}`;
  queryParams.push(offset);

  // Execute query
  const result = await query(queryText, queryParams);

  // Get total count for pagination
  let countQuery = `
    SELECT COUNT(*) 
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_deleted = false AND p.is_active = true
  `;

  const countParams = [];
  let countParamIndex = 0;

  if (search) {
    countParamIndex++;
    countQuery += ` AND (p.name ILIKE $${countParamIndex} OR p.description ILIKE $${countParamIndex})`;
    countParams.push(`%${search}%`);
  }

  if (category) {
    countParamIndex++;
    countQuery += ` AND c.slug = $${countParamIndex}`;
    countParams.push(category);
  }

  const countResult = await query(countQuery, countParams);
  const total = parseInt(countResult.rows[0].count);

  // Format response
  const products = result.rows.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    stock_quantity: row.stock_quantity,
    image_url: row.image_url,
    is_active: row.is_active,
    category: row.category_id ? {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
    } : null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));

  res.status(200).json({
    success: true,
    count: products.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: products,
  });
});

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await query(
    `SELECT p.id, p.name, p.description, p.price, p.stock_quantity, 
            p.image_url, p.is_active, p.created_at, p.updated_at,
            c.id as category_id, c.name as category_name, c.slug as category_slug
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     WHERE p.id = $1 AND p.is_deleted = false`,
    [id]
  );

  if (result.rows.length === 0) {
    throw new ApiError('Product not found', 404);
  }

  const row = result.rows[0];
  const product = {
    id: row.id,
    name: row.name,
    description: row.description,
    price: parseFloat(row.price),
    stock_quantity: row.stock_quantity,
    image_url: row.image_url,
    is_active: row.is_active,
    category: row.category_id ? {
      id: row.category_id,
      name: row.category_name,
      slug: row.category_slug,
    } : null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };

  res.status(200).json({
    success: true,
    data: product,
  });
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    price,
    category_id,
    stock_quantity = 0,
    image_url,
    is_active = true,
  } = req.body;

  // Validate category if provided
  if (category_id) {
    const categoryCheck = await query(
      'SELECT id FROM categories WHERE id = $1',
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      throw new ApiError('Category not found', 404);
    }
  }

  const result = await query(
    `INSERT INTO products (name, description, price, category_id, stock_quantity, image_url, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING id, name, description, price, category_id, stock_quantity, image_url, is_active, created_at`,
    [name, description, price, category_id, stock_quantity, image_url, is_active]
  );

  res.status(201).json({
    success: true,
    data: result.rows[0],
  });
});

/**
 * @desc    Update product
 * @route   PATCH /api/products/:id
 * @access  Private/Admin
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    price,
    category_id,
    stock_quantity,
    image_url,
    is_active,
  } = req.body;

  // Check if product exists
  const productCheck = await query(
    'SELECT id FROM products WHERE id = $1 AND is_deleted = false',
    [id]
  );

  if (productCheck.rows.length === 0) {
    throw new ApiError('Product not found', 404);
  }

  // Validate category if provided
  if (category_id) {
    const categoryCheck = await query(
      'SELECT id FROM categories WHERE id = $1',
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      throw new ApiError('Category not found', 404);
    }
  }

  // Build update query dynamically
  const updates = [];
  const values = [];
  let paramCount = 0;

  if (name !== undefined) {
    paramCount++;
    updates.push(`name = $${paramCount}`);
    values.push(name);
  }

  if (description !== undefined) {
    paramCount++;
    updates.push(`description = $${paramCount}`);
    values.push(description);
  }

  if (price !== undefined) {
    paramCount++;
    updates.push(`price = $${paramCount}`);
    values.push(price);
  }

  if (category_id !== undefined) {
    paramCount++;
    updates.push(`category_id = $${paramCount}`);
    values.push(category_id);
  }

  if (stock_quantity !== undefined) {
    paramCount++;
    updates.push(`stock_quantity = $${paramCount}`);
    values.push(stock_quantity);
  }

  if (image_url !== undefined) {
    paramCount++;
    updates.push(`image_url = $${paramCount}`);
    values.push(image_url);
  }

  if (is_active !== undefined) {
    paramCount++;
    updates.push(`is_active = $${paramCount}`);
    values.push(is_active);
  }

  if (updates.length === 0) {
    throw new ApiError('No fields to update', 400);
  }

  paramCount++;
  values.push(id);

  const result = await query(
    `UPDATE products SET ${updates.join(', ')} 
     WHERE id = $${paramCount} 
     RETURNING id, name, description, price, category_id, stock_quantity, image_url, is_active, updated_at`,
    values
  );

  res.status(200).json({
    success: true,
    data: result.rows[0],
  });
});

/**
 * @desc    Soft delete product
 * @route   DELETE /api/products/:id
 * @access  Private/Admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if product exists
  const productCheck = await query(
    'SELECT id FROM products WHERE id = $1 AND is_deleted = false',
    [id]
  );

  if (productCheck.rows.length === 0) {
    throw new ApiError('Product not found', 404);
  }

  // Soft delete
  await query(
    'UPDATE products SET is_deleted = true, deleted_at = CURRENT_TIMESTAMP WHERE id = $1',
    [id]
  );

  res.status(200).json({
    success: true,
    message: 'Product deleted successfully',
  });
});

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
