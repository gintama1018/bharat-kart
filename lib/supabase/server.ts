import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  // Validate required environment variables
  if (!supabaseUrl || supabaseUrl === 'https://your-project-id.supabase.co') {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable. Please check your .env.local file.'
    )
  }

  if (!supabaseServiceRoleKey || supabaseServiceRoleKey === 'your_service_role_key_here') {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Server-side operations require the service role key. Please check your .env.local file.'
    )
  }

  return createSupabaseClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}