
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmxpunwlvhypskpdnsoc.supabase.co';  // Reemplaza con tu URL
const supabaseAnonKey = 'process.env.InventStack001.';  // Reemplaza con tu API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);