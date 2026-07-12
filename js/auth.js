// auth.js — Login, logout, session, role checking
// Import: import { requireAuth, renderUserBadge, logout } from './js/auth.js'

import { supabase } from './supabase.js'

export function setSession(employee) {
  sessionStorage.setItem('fm_user', JSON.stringify(employee))
}

export function getSession() {
  const u = sessionStorage.getItem('fm_user')
  return u ? JSON.parse(u) : null
}

export function clearSession() {
  sessionStorage.removeItem('fm_user')
}

export function requireAuth() {
  const user = getSession()
  if (!user) { window.location.href = 'login.html'; return null }
  return user
}

export function requireManager() {
  const user = requireAuth()
  if (user && user.role !== 'manager' && user.role !== 'supervisor') {
    alert('Manager access required.')
    window.location.href = 'index.html'
    return null
  }
  return user
}

export async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error }
  const { data: emp, error: empErr } = await supabase
    .from('employees').select('*').eq('email', email).eq('is_active', true).single()
  if (empErr || !emp) return { error: { message: 'Employee record not found. Contact your manager.' } }
  setSession(emp)
  return { data: emp }
}

export async function loginWithPin(pin) {
  const { data, error } = await supabase
    .from('employees').select('*').eq('pin', pin).eq('is_active', true).single()
  if (error || !data) return { error: { message: 'Invalid PIN. Try again.' } }
  setSession(data)
  return { data }
}

export async function logout() {
  clearSession()
  await supabase.auth.signOut()
  window.location.href = 'login.html'
}

export function renderUserBadge(containerId) {
  const user = getSession()
  if (!user) return
  const el = document.getElementById(containerId)
  if (!el) return
  el.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="text-align:right;">
        <div style="font-size:13px;font-weight:500">${user.name}</div>
        <div style="font-size:11px;color:var(--text-2);text-transform:capitalize">${user.role}</div>
      </div>
      <div style="width:34px;height:34px;border-radius:50%;background:var(--gas-light);color:var(--gas);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600">
        ${user.name.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}
      </div>
      <button onclick="window.doLogout()" class="btn btn-sm btn-outline" style="font-size:11px">
        Logout
      </button>
    </div>`
  window.doLogout = logout
}
