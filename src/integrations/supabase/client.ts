// Supabase client configuration
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vbhkfnzabdzavdlmqgda.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZiaGtmbnphYmR6YXZkbG1xZ2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3MTUwNzYsImV4cCI6MjA2NjI5MTA3Nn0.a3hI1RJ1Qjrgbeqqv7UpPJlOEuorFdfFUj5xm91pVyE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);