# RSR Cash Advance Tracker (Vite + React)

A mobile-first tracker that shows, per billing: value, advances/payments
recorded against it, and the remaining balance — with Fully Paid / Partial /
Refund Due status.

## How this is different from the HTML app

- You **don't edit the file that runs**. You edit the source files in `src/`,
  push to GitHub, and GitHub Actions builds the real site for you.
- That means the "edit and upload from my phone" flow still works — just push
  the source, and the build happens automatically (about 1–2 minutes).

## File map (what each piece does)

- `index.html` — tiny shell, just a mount point. You rarely touch this.
- `src/main.jsx` — boots the app.
- `src/App.jsx` — the main screen: PIN gate, summary totals, list of cards.
- `src/components/PinLock.jsx` — the PIN keypad screen.
- `src/components/BillingCard.jsx` — one billing row (value − advances = balance).
- `src/components/AdvanceModal.jsx` — the form to record an advance/payment.
- `src/lib/format.js` — peso formatting + the balance math.
- `src/lib/api.js` — **the only file that talks to the backend.** Right now it
  uses sample data. Swap its functions for real `fetch()` calls to your
  Receivables.gs `/exec` URL when ready.
- `src/styles.css` — all the styling.
- `vite.config.js` — set `base` to match your repo name.
- `.github/workflows/deploy.yml` — auto-build + deploy on push.

## One-time setup

1. Create a new GitHub repo, e.g. `sfship-tracker`.
2. Make sure `base` in `vite.config.js` matches: `base: '/sfship-tracker/'`.
3. Upload all these files to the repo (keep the folder structure).
4. In the repo: **Settings → Pages → Source = GitHub Actions**.
5. Push to `main`. The Actions tab will show the build; when green, the site is
   live at `https://<your-username>.github.io/sfship-tracker/`.

## Running it locally (optional, on a computer)

```
npm install
npm run dev      # live preview while editing
npm run build    # produces the dist/ folder (what Actions deploys)
```

Demo PIN is `1234` (set in `src/lib/api.js`).
