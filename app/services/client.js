import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_PUBLIC_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_KEY

console.log(typeof supabaseUrl, typeof supabaseKey)

export const client = createClient(supabaseUrl, supabaseKey)

export async function signUpNewUser (email, password) {
  const { data, error } = await client.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://uottahack-osuc-dev.vercel.app/'
    }
  })
  if (error) {
    console.error(error)
    return
  }
  return data
}
