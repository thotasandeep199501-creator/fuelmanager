// sidebar.js — Renders the sidebar nav on every page
// Import: import { renderSidebar } from './js/sidebar.js'

export function renderSidebar(activePage) {
  const nav = [
    { section: 'Sales' },
    { id: 'index', label: 'Dashboard', icon: '📊', href: 'index.html' },
    { id: 'record-sale', label: 'Record Sale', icon: '💳', href: 'record-sale.html' },
    { id: 'sales', label: 'Transactions', icon: '📋', href: 'sales.html' },
    { section: 'Operations' },
    { id: 'inventory', label: 'Inventory', icon: '📦', href: 'inventory.html' },
    { id: 'prices', label: 'Fuel Prices', icon: '⛽', href: 'prices.html' },
    { id: 'delivery', label: 'Deliveries', icon: '🚚', href: 'delivery.html' },
    { section: 'Staff' },
    { id: 'timesheet', label: 'Timesheet', icon: '🕐', href: 'timesheet.html' },
    { id: 'employees', label: 'Employees', icon: '👤', href: 'employees.html' },
    { section: 'Reports' },
    { id: 'reports', label: 'Reports', icon: '📈', href: 'reports.html' },
    { id: 'downloads', label: 'Downloads', icon: '⬇️', href: 'downloads.html' },
    { id: 'suggestions', label: 'AI Suggestions', icon: '✨', href: 'suggestions.html' },
    { section: 'System' },
    { id: 'settings', label: 'Settings', icon: '⚙️', href: 'settings.html' },
  ]

  const items = nav.map(item => {
    if (item.section) return `<div class="nav-section-label">${item.section}</div>`
    return `<a href="${item.href}" class="nav-item ${item.id === activePage ? 'active' : ''}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a>`
  }).join('')

  return `
    <div class="sidebar-logo">
      <div class="station-name">⛽ Main Street Station</div>
      <div class="station-sub">Waukesha, WI</div>
    </div>
    <nav class="sidebar-nav">${items}</nav>
    <div class="sidebar-footer" id="user-badge"></div>
  `
}
