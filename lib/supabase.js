const { createClient } = require('@supabase/supabase-js');

// Ganti dengan milikmu sendiri
const supabaseUrl = 'https://njxvfbxheusrggmgxqgr.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qeHZmYnhoZXVzcmdnbWd4cWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1Mjg0OTEsImV4cCI6MjA2MjEwNDQ5MX0.lcH-dyKi08kM4RN3u5YbgNnUQUdiCCUSZMabQX_Z5v8';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
