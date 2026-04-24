const fs = require('fs');
const path = require('path');
const { pool } = require('../config/database');

/**
 * Initialize database with schema
 */
const initDatabase = async () => {
  try {
    console.log('🔄 Initializing database...');

    // Read schema file
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute schema
    await pool.query(schema);

    console.log('✅ Database initialized successfully!');
    console.log('📝 Tables created:');
    console.log('   - users');
    console.log('   - categories');
    console.log('   - products');
    console.log('   - orders');
    console.log('   - order_items');
    console.log('   - password_reset_tokens');
    console.log('');
    console.log('👤 Default admin user created:');
    console.log('   Email: admin@orderking.com');
    console.log('   Password: admin123');
    console.log('   ⚠️  IMPORTANT: Change this password in production!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
};

initDatabase();
