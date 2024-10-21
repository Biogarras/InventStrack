
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cmxpunwlvhypskpdnsoc.supabase.co';  // Reemplaza con tu URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNteHB1bndsdmh5cHNrcGRuc29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcxMzI5MjUsImV4cCI6MjA0MjcwODkyNX0.jhVoGTYeylYLQXwrU8OGPEPs25SInz5qQ2rMRls2rzc';  // Reemplaza con tu API Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

