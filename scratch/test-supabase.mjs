import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const envPath = path.resolve(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.*)/);

const supabaseUrl = urlMatch ? urlMatch[1].trim() : '';
const supabaseAnonKey = keyMatch ? keyMatch[1].trim() : '';

console.log('Testing Supabase URL:', supabaseUrl);
console.log('Testing Supabase Key:', supabaseAnonKey ? `${supabaseAnonKey.substring(0, 15)}...` : 'EMPTY');

if (!supabaseUrl || supabaseUrl.includes('placeholder')) {
  console.log('STATUS: PLACEHOLDER_DETECTED');
} else {
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { data, error } = await supabase.from('site_settings').select('*').limit(1);
  if (error) {
    console.log('SUPABASE_ERROR:', error.message);
  } else {
    console.log('SUPABASE_SUCCESS: Connected! Data count:', data.length);
  }
}
