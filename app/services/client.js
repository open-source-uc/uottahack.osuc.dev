import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_PUBLIC_URL
const supabaseKey = process.env.SUPABASE_ANON_PUBLIC_KEY
export const client = createClient(supabaseUrl, supabaseKey)

export async function signUpNewUser (email, password) {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https//example.com/welcome'
    }
  })
  if (error) {
    console.log(error)
    return
  }
  return data
}
