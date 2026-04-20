import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Environment validation - CRITICAL for production
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('CRITICAL: Missing Supabase configuration.');
  console.error('Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Supabase configuration is required for production');
  }
}

// Security check: Warn if using dummy credentials
if (supabaseUrl?.includes('dummy') || supabaseAnonKey?.includes('dummy')) {
  console.warn('WARNING: Using dummy Supabase credentials. This will not work with real data.');
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
