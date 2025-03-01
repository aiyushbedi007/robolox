import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wzqeqtpejdanmifyrlpu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind6cWVxdHBlamRhbm1pZnlybHB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NTMxNzEsImV4cCI6MjA1NjQyOTE3MX0.L3HaV9m9EnlsPSxGS-9CclNEgczGrdFh30Wg1QhCyik';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
