const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.DATABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseConnect = createClient(supabaseUrl, supabaseKey);

module.exports = supabaseConnect;
 