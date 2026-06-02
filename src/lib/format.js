// Peso formatting + the core cash-advance math, kept in one place
// so every component shows the same numbers the same way.

export function peso(n) {
  const v = Number(n) || 0
  return '\u20B1' + v.toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

// Sum all advances/payments recorded against a billing.
export function totalPaid(billing) {
  return (billing.advances || []).reduce((sum, a) => sum + (Number(a.amount) || 0), 0)
}

// Remaining balance = billed value − everything paid (advances + payments).
export function remaining(billing) {
  return (Number(billing.amount) || 0) - totalPaid(billing)
}

// Status derived from the balance, same rule as discussed:
// Fully Paid (0), Partial (>0), Overpaid / Refund Due (<0).
export function statusOf(billing) {
  const r = remaining(billing)
  if (r <= 0 && Math.abs(r) < 0.005) return 'paid'
  if (r < 0) return 'overpaid'
  if (totalPaid(billing) > 0) return 'partial'
  return 'open'
}

export const STATUS_LABEL = {
  open: 'Unpaid',
  partial: 'Partial',
  paid: 'Fully Paid',
  overpaid: 'Refund Due',
}
