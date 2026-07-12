// supabase.js — Supabase client connection
// IMPORTANT: Paste your anon key below from your Supabase project settings

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://ncevzpiwngotpnhqfswv.supabase.co'
const SUPABASE_ANON_KEY = 'YOUR_ANON_KEY_HERE' // ← Paste your anon key here

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
