# Silver Rain Suites — Guest Feedback

A lightweight, backend-free guest feedback site: a checkout-friendly feedback
wizard for guests, and a PIN-protected admin dashboard to review it.

## How it works (important — read this)

- **No server, no database.** Everything is static HTML/CSS/JS.
- Guest submissions are saved as JSON **in the browser's local storage**
  on the device the guest used (e.g. the front-desk tablet/kiosk).
- The admin panel (`admin.html`) reads that same local storage and lets you:
  - view stats and per-category averages
  - search/filter responses
  - **Export JSON** — downloads all responses as one real `.json` file
  - **Import** — merges a previously exported `.json` file back in (use this
    to combine data from more than one device, or to restore a backup)
  - delete individual entries, or clear everything

**Because there's no server, feedback lives on whichever device/browser
collected it**, until someone exports it. If you plan to collect feedback
from more than one device (e.g. two tablets at two properties), export
regularly and import into one place to merge them.

## Files

```
feedback-app/
├── index.html      ← guest feedback form (what guests fill at checkout)
├── admin.html       ← admin login + dashboard (keep this URL internal)
├── css/style.css    ← rain animation, droplet rating control, wizard styling
├── js/app.js         ← guest wizard logic
└── js/admin.js       ← admin PIN auth + dashboard logic
```

## Running it

No build step, no install. Any static web server works:

```bash
# from inside feedback-app/
python3 -m http.server 8080
# then open http://localhost:8080
```

Or upload the whole folder to any static host (Cognisutra's own hosting,
Netlify, Vercel, GitHub Pages, or a plain shared-hosting `public_html`
folder) — it just needs to serve the files as-is.

## Admin PIN

The PIN is **845416**, set as a constant near the top of `js/admin.js`
(`const PIN = '845416'`). To change it, edit that line.

**Security note:** because this is a static site with no server, the PIN
check happens in the browser — someone who reads `admin.js` can see the
PIN in plain text. That's an acceptable trade-off for keeping staff out of
the dashboard casually, but it is *not* the same as real server-side auth.
Two easy ways to raise the bar without adding a backend:
1. Don't link `admin.html` from anywhere public — only staff who know the
   URL can reach the PIN screen.
2. Add a second layer of protection at the hosting level (e.g. HTTP basic
   auth on `/admin.html`, or a `.htaccess` rule) if your host supports it.

If you'd later like feedback to sync across every device automatically
(so any tablet or the front desk PC always shows the same responses), that
needs a small server to hold the JSON centrally — happy to add a minimal
one (a few files, no real database) whenever you want that upgrade.

## Customizing

- **Hotel name / copy**: search `index.html` and `admin.html` for
  "Silver Rain Suites" and the category/step copy — all editable text.
- **Colors**: CSS variables at the top of `css/style.css` (`--ink`,
  `--mist`, `--rain`, `--champagne`, etc.) and in the small `tailwind.config`
  block in each HTML file's `<head>`.
- **Categories rated**: the `CATEGORIES` array near the top of `js/app.js`
  (and the matching one in `js/admin.js` for the dashboard breakdown).
