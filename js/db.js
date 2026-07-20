// db.js — All database queries for FuelManager
// Import: import { getTodaySales, fmt$, fmtTime } from './js/db.js'

import { supabase } from './supabase.js'

// UTILITIES
export const fmt$ = n => '$' + parseFloat(n||0).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})
export const fmtDate = iso => new Date(iso).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
export const fmtTime = iso => new Date(iso).toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})
export const today = () => new Date().toISOString().split('T')[0]
export const getWeekStart = () => { const d=new Date(),day=d.getDay(),diff=d.getDate()-day+(day===0?-6:1);return new Date(d.setDate(diff)).toISOString().split('T')[0] }
export const getWeekEnd = () => { const s=new Date(getWeekStart());s.setDate(s.getDate()+6);return s.toISOString().split('T')[0] }

// TOTALS / DASHBOARD
export async function getTodayTotals() {
  const { data, error } = await supabase.from('todays_summary').select('*').single()
  return { data, error }
}

export async function getTodaySales() {
  const t = today()
  const [gas, lottery, store] = await Promise.all([
    supabase.from('gas_sales').select('*').gte('sold_at', t+'T00:00:00').lte('sold_at', t+'T23:59:59').order('sold_at',{ascending:false}),
    supabase.from('lottery_sales').select('*').gte('sold_at', t+'T00:00:00').lte('sold_at', t+'T23:59:59').order('sold_at',{ascending:false}),
    supabase.from('store_sales').select('*').gte('sold_at', t+'T00:00:00').lte('sold_at', t+'T23:59:59').order('sold_at',{ascending:false})
  ])
  return { gas: gas.data||[], lottery: lottery.data||[], store: store.data||[] }
}

export async function getSalesByRange(table, start, end) {
  const { data, error } = await supabase.from(table).select('*').gte('sold_at', start+'T00:00:00').lte('sold_at', end+'T23:59:59').order('sold_at',{ascending:false})
  return { data: data||[], error }
}

// SAVE SALES
export async function saveGasSale({ pump_number, fuel_type, gallons, price_per_gallon, payment_method, employee_id }) {
  const total_amount = parseFloat((gallons * price_per_gallon).toFixed(2))
  const { data, error } = await supabase.from('gas_sales').insert({ pump_number, fuel_type, gallons, price_per_gallon, total_amount, payment_method, employee_id }).select().single()
  return { data, error }
}

export async function saveLotterySale({ ticket_type, ticket_price, quantity, payment_method, employee_id }) {
  const total_amount = parseFloat((ticket_price * quantity).toFixed(2))
  const { data, error } = await supabase.from('lottery_sales').insert({ ticket_type, ticket_price, quantity, total_amount, payment_method, employee_id }).select().single()
  return { data, error }
}

export async function saveStoreSale({ category, item_name, upc, quantity, unit_price, payment_method, employee_id }) {
  const total_amount = parseFloat((unit_price * quantity).toFixed(2))
  const { data, error } = await supabase.from('store_sales').insert({ category, item_name, upc, quantity, unit_price, total_amount, payment_method, employee_id }).select().single()
  return { data, error }
}

// INVENTORY
export async function getInventory() {
  const { data, error } = await supabase.from('inventory').select('*').order('category')
  return { data: data||[], error }
}
export async function updateInventoryQty(id, qty) {
  const { data, error } = await supabase.from('inventory').update({ current_qty: qty }).eq('id', id).select().single()
  return { data, error }
}
export async function addInventoryItem(item) {
  const { data, error } = await supabase.from('inventory').insert(item).select().single()
  return { data, error }
}

// PRICES
export async function getCurrentPrices() {
  const { data, error } = await supabase.from('fuel_prices').select('fuel_type, price_per_gallon, effective_from').order('effective_from',{ascending:false})
  if (error) return { data: null, error }
  const latest = {}
  data.forEach(r => { if (!latest[r.fuel_type]) latest[r.fuel_type] = r })
  return { data: latest, error: null }
}
export async function updateFuelPrice(fuel_type, price_per_gallon, employee_id, notes='') {
  const { data, error } = await supabase.from('fuel_prices').insert({ fuel_type, price_per_gallon, set_by: employee_id, notes }).select().single()
  return { data, error }
}
export async function getPriceHistory() {
  const { data, error } = await supabase.from('fuel_prices').select('*, employees(name)').order('effective_from',{ascending:false}).limit(50)
  return { data: data||[], error }
}

// EMPLOYEES
export async function getEmployees() {
  const { data, error } = await supabase.from('employees').select('*').eq('is_active', true).order('name')
  return { data: data||[], error }
}
export async function addEmployee(emp) {
  const { data, error } = await supabase.from('employees').insert(emp).select().single()
  return { data, error }
}

// TIMESHEET
export async function getCurrentShift() {
  const { data, error } = await supabase.from('current_shift').select('*')
  return { data: data||[], error }
}
export async function getTodayTimeEntries() {
  const t = today()
  const { data, error } = await supabase.from('time_entries').select('*, employees(name, role)').gte('clock_in', t+'T00:00:00').order('clock_in',{ascending:false})
  return { data: data||[], error }
}
export async function clockIn(employee_id) {
  const { data, error } = await supabase.from('time_entries').insert({ employee_id }).select().single()
  return { data, error }
}
export async function clockOut(entry_id) {
  const { data, error } = await supabase.from('time_entries').update({ clock_out: new Date().toISOString() }).eq('id', entry_id).is('clock_out', null).select().single()
  return { data, error }
}

// REPORTS
export async function getRecentReports(limit=30) {
  const { data, error } = await supabase.from('daily_reports').select('*').order('report_date',{ascending:false}).limit(limit)
  return { data: data||[], error }
}

// DELIVERIES
export async function getDeliveries() {
  const { data, error } = await supabase.from('deliveries').select('*, delivery_items(*)').order('created_at',{ascending:false}).limit(50)
  return { data: data||[], error }
}
export async function saveDelivery(delivery) {
  const { data, error } = await supabase.from('deliveries').insert(delivery).select().single()
  return { data, error }
}
export async function saveDeliveryItems(items) {
  const { data, error } = await supabase.from('delivery_items').insert(items).select()
  return { data, error }
}

// REAL-TIME
export function subscribeToSales(onNew) {
  return supabase.channel('new-sales')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gas_sales' }, onNew)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'lottery_sales' }, onNew)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'store_sales' }, onNew)
    .subscribe()
}
export function unsubscribe(ch) { if (ch) supabase.removeChannel(ch) }


// REPORT GENERATION
export async function generateDailyReport() {
    const t = today()
    const { gas, lottery, store } = await getTodaySales()
    const gas_total = gas.reduce((s, r) => s + parseFloat(r.total_amount || 0), 0)
    const lottery_total = lottery.reduce((s, r) => s + parseFloat(r.total_amount || 0), 0)
    const store_total = store.reduce((s, r) => s + parseFloat(r.total_amount || 0), 0)
    const gallons_sold = gas.reduce((s, r) => s + parseFloat(r.gallons || 0), 0)
    const total_transactions = gas.length + lottery.length + store.length
    const grand_total = gas_total + lottery_total + store_total

  const report = {
        report_date: t,
        gas_total, lottery_total, store_total, grand_total,
        total_transactions, gallons_sold
  }

  const { data: existing } = await supabase.from('daily_reports').select('id').eq('report_date', t).maybeSingle()

  if (existing) {
        const { data, error } = await supabase.from('daily_reports').update(report).eq('id', existing.id).select().single()
        return { data, error }
  } else {
        const { data, error } = await supabase.from('daily_reports').insert(report).select().single()
        return { data, error }
  }
}
