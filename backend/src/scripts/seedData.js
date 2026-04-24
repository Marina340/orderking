const { query } = require('../config/database');

/**
 * Seed database with sample data
 */
const seedData = async () => {
  try {
    console.log('🌱 Seeding database with sample data...');

    // Get category IDs
    const categoriesResult = await query('SELECT id, slug FROM categories');
    const categories = {};
    categoriesResult.rows.forEach(cat => {
      categories[cat.slug] = cat.id;
    });

    // Sample products
    const products = [
      {
        name: 'iPhone 14 Pro',
        description: 'Latest Apple smartphone with advanced camera system',
        price: 999.99,
        category_id: categories['electronics'],
        stock_quantity: 50,
        image_url: 'https://example.com/iphone14.jpg',
      },
      {
        name: 'Samsung Galaxy S23',
        description: 'Flagship Android smartphone with stunning display',
        price: 899.99,
        category_id: categories['electronics'],
        stock_quantity: 40,
        image_url: 'https://example.com/galaxy-s23.jpg',
      },
      {
        name: 'MacBook Pro 16"',
        description: 'Powerful laptop for professionals',
        price: 2499.99,
        category_id: categories['electronics'],
        stock_quantity: 20,
        image_url: 'https://example.com/macbook.jpg',
      },
      {
        name: 'Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        price: 19.99,
        category_id: categories['clothing'],
        stock_quantity: 200,
        image_url: 'https://example.com/tshirt.jpg',
      },
      {
        name: 'Denim Jeans',
        description: 'Classic blue denim jeans',
        price: 49.99,
        category_id: categories['clothing'],
        stock_quantity: 150,
        image_url: 'https://example.com/jeans.jpg',
      },
      {
        name: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans from Ethiopia',
        price: 15.99,
        category_id: categories['food-beverages'],
        stock_quantity: 100,
        image_url: 'https://example.com/coffee.jpg',
      },
      {
        name: 'Green Tea',
        description: 'High-quality green tea leaves',
        price: 12.99,
        category_id: categories['food-beverages'],
        stock_quantity: 80,
        image_url: 'https://example.com/tea.jpg',
      },
      {
        name: 'Garden Tool Set',
        description: 'Complete set of essential garden tools',
        price: 79.99,
        category_id: categories['home-garden'],
        stock_quantity: 30,
        image_url: 'https://example.com/garden-tools.jpg',
      },
      {
        name: 'LED Desk Lamp',
        description: 'Modern LED desk lamp with adjustable brightness',
        price: 34.99,
        category_id: categories['home-garden'],
        stock_quantity: 60,
        image_url: 'https://example.com/lamp.jpg',
      },
      {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling wireless headphones',
        price: 199.99,
        category_id: categories['electronics'],
        stock_quantity: 75,
        image_url: 'https://example.com/headphones.jpg',
      },
    ];

    // Insert products
    for (const product of products) {
      await query(
        `INSERT INTO products (name, description, price, category_id, stock_quantity, image_url)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          product.name,
          product.description,
          product.price,
          product.category_id,
          product.stock_quantity,
          product.image_url,
        ]
      );
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📦 Created ${products.length} sample products`);
    console.log('');
    console.log('You can now:');
    console.log('1. Start the server: npm start');
    console.log('2. Test the API endpoints');
    console.log('3. Login with admin credentials to manage products');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
