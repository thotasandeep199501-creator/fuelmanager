// supabase.js — Supabase client connection

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://ncevzpiwngotpnhqfswv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jZXZ6cGl3bmdvdHBuaHFmc3d2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NjExMDEsImV4cCI6MjA5NTMzNzEwMX0.Yq1nNBFZ3dZGihwmc7DGa5Xl1hSX77lwMLbyKrc2C-4'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
