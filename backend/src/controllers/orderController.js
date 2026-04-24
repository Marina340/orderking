const { query, getClient } = require('../config/database');
const { ApiError, asyncHandler } = require('../utils/errorHandler');

/**
 * @desc    Place new order
 * @route   POST /api/orders
 * @access  Private
 */
const createOrder = asyncHandler(async (req, res) => {
  const { items, shipping_address, phone, notes } = req.body;
  const userId = req.user.id;

  const client = await getClient();

  try {
    await client.query('BEGIN');

    // Calculate total and validate products
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      // Get product details and check stock
      const productResult = await client.query(
        'SELECT id, name, price, stock_quantity, is_active FROM products WHERE id = $1 AND is_deleted = false',
        [item.product_id]
      );

      if (productResult.rows.length === 0) {
        throw new ApiError(`Product with ID ${item.product_id} not found`, 404);
      }

      const product = productResult.rows[0];

      if (!product.is_active) {
        throw new ApiError(`Product "${product.name}" is not available`, 400);
      }

      if (product.stock_quantity < item.quantity) {
        throw new ApiError(
          `Insufficient stock for product "${product.name}". Available: ${product.stock_quantity}`,
          400
        );
      }

      const itemTotal = parseFloat(product.price) * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        product_id: product.id,
        quantity: item.quantity,
        price: product.price,
      });

      // Update stock
      await client.query(
        'UPDATE products SET stock_quantity = stock_quantity - $1 WHERE id = $2',
        [item.quantity, product.id]
      );
    }

    // Create order
    const orderResult = await client.query(
      `INSERT INTO orders (user_id, total_amount, shipping_address, phone, notes, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')
       RETURNING id, user_id, total_amount, shipping_address, phone, notes, status, created_at`,
      [userId, totalAmount, shipping_address, phone, notes || null]
    );

    const order = orderResult.rows[0];

    // Create order items
    for (const item of orderItems) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES ($1, $2, $3, $4)',
        [order.id, item.product_id, item.quantity, item.price]
      );
    }

    await client.query('COMMIT');

    // Fetch complete order details
    const completeOrder = await getOrderDetails(order.id);

    res.status(201).json({
      success: true,
      data: completeOrder,
    });
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
});

/**
 * @desc    Get current user's orders
 * @route   GET /api/orders/my
 * @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const { page = 1, limit = 10 } = req.query;

  const offset = (page - 1) * limit;

  // Get orders
  const result = await query(
    `SELECT o.id, o.total_amount, o.shipping_address, o.phone, o.notes, 
            o.status, o.created_at, o.updated_at,
            COUNT(oi.id) as item_count
     FROM orders o
     LEFT JOIN order_items oi ON o.id = oi.order_id
     WHERE o.user_id = $1
     GROUP BY o.id
     ORDER BY o.created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );

  // Get total count
  const countResult = await query(
    'SELECT COUNT(*) FROM orders WHERE user_id = $1',
    [userId]
  );

  const total = parseInt(countResult.rows[0].count);

  // Get items for each order
  const orders = await Promise.all(
    result.rows.map(async (order) => {
      const itemsResult = await query(
        `SELECT oi.id, oi.quantity, oi.price_at_purchase,
                p.id as product_id, p.name as product_name, p.image_url
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );

      return {
        id: order.id,
        total_amount: parseFloat(order.total_amount),
        shipping_address: order.shipping_address,
        phone: order.phone,
        notes: order.notes,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at,
        items: itemsResult.rows.map(item => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.product_name,
          image_url: item.image_url,
          quantity: item.quantity,
          price: parseFloat(item.price_at_purchase),
          subtotal: parseFloat(item.price_at_purchase) * item.quantity,
        })),
      };
    })
  );

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: orders,
  });
});

/**
 * @desc    Get all orders (admin)
 * @route   GET /api/orders
 * @access  Private/Admin
 */
const getAllOrders = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;

  const offset = (page - 1) * limit;

  // Build query
  let queryText = `
    SELECT o.id, o.user_id, o.total_amount, o.shipping_address, o.phone, 
           o.notes, o.status, o.created_at, o.updated_at,
           u.name as user_name, u.email as user_email,
           COUNT(oi.id) as item_count
    FROM orders o
    JOIN users u ON o.user_id = u.id
    LEFT JOIN order_items oi ON o.id = oi.order_id
  `;

  const queryParams = [];
  let paramCount = 0;

  if (status) {
    paramCount++;
    queryText += ` WHERE o.status = $${paramCount}`;
    queryParams.push(status);
  }

  queryText += ' GROUP BY o.id, u.name, u.email ORDER BY o.created_at DESC';

  paramCount++;
  queryText += ` LIMIT $${paramCount}`;
  queryParams.push(limit);

  paramCount++;
  queryText += ` OFFSET $${paramCount}`;
  queryParams.push(offset);

  const result = await query(queryText, queryParams);

  // Get total count
  let countQuery = 'SELECT COUNT(*) FROM orders';
  const countParams = [];

  if (status) {
    countQuery += ' WHERE status = $1';
    countParams.push(status);
  }

  const countResult = await query(countQuery, countParams);
  const total = parseInt(countResult.rows[0].count);

  // Get items for each order
  const orders = await Promise.all(
    result.rows.map(async (order) => {
      const itemsResult = await query(
        `SELECT oi.id, oi.quantity, oi.price_at_purchase,
                p.id as product_id, p.name as product_name, p.image_url
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         WHERE oi.order_id = $1`,
        [order.id]
      );

      return {
        id: order.id,
        user: {
          id: order.user_id,
          name: order.user_name,
          email: order.user_email,
        },
        total_amount: parseFloat(order.total_amount),
        shipping_address: order.shipping_address,
        phone: order.phone,
        notes: order.notes,
        status: order.status,
        created_at: order.created_at,
        updated_at: order.updated_at,
        items: itemsResult.rows.map(item => ({
          id: item.id,
          product_id: item.product_id,
          product_name: item.product_name,
          image_url: item.image_url,
          quantity: item.quantity,
          price: parseFloat(item.price_at_purchase),
          subtotal: parseFloat(item.price_at_purchase) * item.quantity,
        })),
      };
    })
  );

  res.status(200).json({
    success: true,
    count: orders.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: orders,
  });
});

/**
 * @desc    Update order status
 * @route   PATCH /api/orders/:id/status
 * @access  Private/Admin
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  if (!status || !validStatuses.includes(status)) {
    throw new ApiError(
      `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      400
    );
  }

  // Check if order exists
  const orderCheck = await query('SELECT id, status FROM orders WHERE id = $1', [id]);

  if (orderCheck.rows.length === 0) {
    throw new ApiError('Order not found', 404);
  }

  // Update status
  const result = await query(
    'UPDATE orders SET status = $1 WHERE id = $2 RETURNING id, status, updated_at',
    [status, id]
  );

  res.status(200).json({
    success: true,
    data: result.rows[0],
  });
});

/**
 * Helper function to get complete order details
 */
const getOrderDetails = async (orderId) => {
  const orderResult = await query(
    `SELECT o.id, o.user_id, o.total_amount, o.shipping_address, o.phone, 
            o.notes, o.status, o.created_at, o.updated_at,
            u.name as user_name, u.email as user_email
     FROM orders o
     JOIN users u ON o.user_id = u.id
     WHERE o.id = $1`,
    [orderId]
  );

  if (orderResult.rows.length === 0) {
    return null;
  }

  const order = orderResult.rows[0];

  const itemsResult = await query(
    `SELECT oi.id, oi.quantity, oi.price_at_purchase,
            p.id as product_id, p.name as product_name, p.image_url
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = $1`,
    [orderId]
  );

  return {
    id: order.id,
    user: {
      id: order.user_id,
      name: order.user_name,
      email: order.user_email,
    },
    total_amount: parseFloat(order.total_amount),
    shipping_address: order.shipping_address,
    phone: order.phone,
    notes: order.notes,
    status: order.status,
    created_at: order.created_at,
    updated_at: order.updated_at,
    items: itemsResult.rows.map(item => ({
      id: item.id,
      product_id: item.product_id,
      product_name: item.product_name,
      image_url: item.image_url,
      quantity: item.quantity,
      price: parseFloat(item.price_at_purchase),
      subtotal: parseFloat(item.price_at_purchase) * item.quantity,
    })),
  };
};

module.exports = {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
};
