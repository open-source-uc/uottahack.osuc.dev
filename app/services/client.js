import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC_KEY
createClient(supabaseUrl, supabaseKey)
