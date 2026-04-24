const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

let supabase = null;

// Initialize Supabase client only if valid credentials are provided
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;

// Check if credentials are valid (not placeholder values)
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http');
const isValidKey = supabaseKey && supabaseKey.length > 20 && !supabaseKey.includes('your_');

if (isValidUrl && isValidKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client initialized');
} else {
  console.warn('⚠️  Supabase credentials not configured. Password reset feature will be disabled.');
}

module.exports = supabase;
