// ===========================================================================
//  BACKEND CONNECTION  —  this is the ONLY file that talks to the server.
// ---------------------------------------------------------------------------
//  Right now it returns sample data held in memory, so the app runs and you
//  can see it working without any backend. When you're ready to connect it to
//  your RSR Billing Tracker (Receivables.gs) Apps Script, replace the body of
//  each function below with a real fetch() to your /exec URL. Nothing else in
//  the app needs to change.
//
//  Example of the real version (for later):
//    const EXEC_URL = 'https://script.google.com/macros/s/XXXX/exec'
//    export async function getBillings() {
//      const res = await fetch(EXEC_URL + '?action=list')
//      return res.json()
//    }
// ===========================================================================

// In-memory sample data (pretend this came from the sheet).
let BILLINGS = [
  {
    id: 'BILLDC-26-001',
    vessel: 'MV SF VOYAGER',
    client: 'Aboitiz Shipping',
    amount: 185000,
    advances: [{ id: 'a1', amount: 50000, date: '2026-05-20', note: 'Mobilization advance' }],
  },
  {
    id: 'BILLDW-26-004',
    vessel: 'MV BANTAYAN STAR',
    client: 'Lite Ferries',
    amount: 42000,
    advances: [],
  },
  {
    id: 'BILLFD-26-002',
    vessel: 'LCT MACTAN PRIDE',
    client: 'Roble Shipping',
    amount: 96000,
    advances: [
      { id: 'a2', amount: 60000, date: '2026-05-18', note: '1st advance' },
      { id: 'a3', amount: 36000, date: '2026-05-29', note: 'Progress payment' },
    ],
  },
]

// Tiny delay so the loading state is visible, like a real network call.
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function getBillings() {
  await wait(250)
  // Return a deep copy so components can't mutate the store directly.
  return JSON.parse(JSON.stringify(BILLINGS))
}

export async function addAdvance(billingId, advance) {
  await wait(150)
  const b = BILLINGS.find((x) => x.id === billingId)
  if (!b) throw new Error('Billing not found: ' + billingId)
  b.advances.push({ id: 'a' + Date.now(), ...advance })
  return JSON.parse(JSON.stringify(b))
}

export async function removeAdvance(billingId, advanceId) {
  await wait(150)
  const b = BILLINGS.find((x) => x.id === billingId)
  if (!b) throw new Error('Billing not found: ' + billingId)
  b.advances = b.advances.filter((a) => a.id !== advanceId)
  return JSON.parse(JSON.stringify(b))
}

// PIN check. For the demo it's local; later, verify server-side like your
// existing Receivables.gs verifyPin(). Never ship a real PIN hard-coded here.
export async function checkPin(pin) {
  await wait(120)
  return pin === '1234'
}
