import { useState } from 'react'
import { peso, remaining } from '../lib/format.js'

function today() {
  return new Date().toISOString().slice(0, 10)
}

export default function AdvanceModal({ billing, onClose, onSave }) {
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(today())
  const [note, setNote] = useState('')
  const [err, setErr] = useState('')

  const bal = remaining(billing)

  function save() {
    const amt = Number(amount)
    if (!amt || amt <= 0) return setErr('Enter an amount greater than 0.')
    // Date guardrail: no future dates (the wrong-date problem you flagged).
    if (date > today()) return setErr('Date cannot be in the future.')
    onSave(billing.id, { amount: amt, date, note: note.trim() })
  }

  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <h2 className="sheet-title">Record advance / payment</h2>
        <p className="sheet-sub">
          {billing.vessel} &middot; {billing.id}
          <br />
          Current balance: <strong>{peso(bal)}</strong>
        </p>

        <label className="field">
          <span>Amount (\u20B1)</span>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            autoFocus
          />
        </label>

        <label className="field">
          <span>Date</span>
          <input type="date" max={today()} value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label className="field">
          <span>Note (optional)</span>
          <input
            type="text"
            placeholder="e.g. Mobilization advance"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </label>

        {err && <p className="err">{err}</p>}

        <div className="sheet-actions">
          <button className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button className="btn-solid" onClick={save}>
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
