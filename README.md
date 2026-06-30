# FuelManager — Gas Station Management App

A complete web-based management system for gas stations.

## Pages included

| File | Page |
|------|------|
| index.html | Dashboard — gas, lottery, store revenue + tank levels |
| sales.html | Live Sales — hourly timeline from open to now |
| inventory.html | Inventory — stock levels, reorder alerts |
| prices.html | Prices — update fuel prices, compare competitors |
| delivery.html | Deliveries — upload invoices, AI scans UPCs, verify items |
| timesheet.html | Timesheet — clock-ins, weekly schedule, hours, payroll |
| reports.html | Reports — daily/weekly summaries |
| downloads.html | Downloads — export PDF/CSV/Excel for any date range |
| suggestions.html | AI Suggestions — restock, pricing, and sales insights |

## How to open

1. Unzip the folder
2. Open `index.html` in any web browser (Chrome, Firefox, Safari, Edge)
3. No installation or internet required for the layout

> Note: The fonts and icons load from Google Fonts and jsDelivr CDN.
> You need an internet connection for those to render correctly.

## To turn this into a real app

This is a working frontend prototype. To make it fully functional:

1. **Database**: Set up Supabase (free) — create the tables from the schema
2. **Backend**: Connect Node.js or Python to handle API requests
3. **AI delivery scan**: Connect Claude API to read uploaded invoice photos
4. **Authentication**: Add login system with manager/employee roles
5. **Mobile app**: Convert to React Native for iPhone/Android

## File structure

```
fuelmanager/
├── index.html          Dashboard
├── sales.html          Live Sales
├── inventory.html      Inventory
├── prices.html         Prices
├── delivery.html       Deliveries
├── timesheet.html      Timesheet
├── reports.html        Reports
├── downloads.html      Downloads
├── suggestions.html    Suggestions
├── css/
│   └── style.css       All styles
├── js/
│   └── app.js          Shared JavaScript
└── README.md           This file
```

## Built with

- HTML5, CSS3, Vanilla JavaScript
- DM Sans + DM Mono (Google Fonts)
- Tabler Icons
- No frameworks required
