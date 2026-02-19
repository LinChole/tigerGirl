import { createClient } from '@supabase/supabase-js'
import Config from 'Config'

const supabaseUrl = Config.supabaseUrl
const supabaseAnonKey = Config.supabaseAnonKey

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://uxvjkexdgeutsffchuqj.supabase.co') {
    console.warn('Supabase URL or Anon Key is missing in config.json.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
