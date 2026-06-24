// app.js — Shared utilities for FuelManager
// Import: import { toast, startClock, showLoading, hideLoading } from './js/app.js'

// TOAST NOTIFICATIONS
// Shows a small popup message at the bottom of the screen
export function toast(message, type = 'success') {
  const el = document.createElement('div')
  el.className = `toast toast-${type}`
  el.textContent = message
  document.body.appendChild(el)
  setTimeout(() => el.classList.add('show'), 10)
  setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 300) }, 3000)
}

// LIVE CLOCK
// Updates an element with the current time every second
export function startClock(elementId) {
  const el = document.getElementById(elementId)
  if (!el) return
  const update = () => {
    el.textContent = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })
  }
  update()
  setInterval(update, 1000)
}

// LOADING SPINNER
export function showLoading(elementId, message = 'Loading...') {
  const el = document.getElementById(elementId)
  if (!el) return
  el.innerHTML = `<div class="loading-state"><div class="spinner"></div><p>${message}</p></div>`
}

export function hideLoading(elementId) {
  const el = document.getElementById(elementId)
  if (!el) return
  el.innerHTML = ''
}

// ERROR STATE
export function showError(elementId, message = 'Something went wrong. Please try again.') {
  const el = document.getElementById(elementId)
  if (!el) return
  el.innerHTML = `<div class="error-state"><p>⚠️ ${message}</p></div>`
}

// EMPTY STATE
export function showEmpty(elementId, message = 'No data yet.') {
  const el = document.getElementById(elementId)
  if (!el) return
  el.innerHTML = `<div class="empty-state"><p>${message}</p></div>`
}

// TABS
// Switches between tab panels — pass the clicked tab element and a prefix
export function initTabs(tabsContainerId) {
  const container = document.getElementById(tabsContainerId)
  if (!container) return
  const tabs = container.querySelectorAll('[data-tab]')
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab
      tabs.forEach(t => t.classList.remove('active'))
      tab.classList.add('active')
      document.querySelectorAll('[data-panel]').forEach(panel => {
        panel.style.display = panel.dataset.panel === target ? 'block' : 'none'
      })
    })
  })
}

// FORMAT CURRENCY — same as db.js but available client-side without import
export const fmt$ = n => '$' + parseFloat(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
export const fmtDate = iso => new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
export const fmtTime = iso => new Date(iso).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})
