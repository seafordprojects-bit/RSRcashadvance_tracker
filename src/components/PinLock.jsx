import { useState } from 'react'
import { checkPin } from '../lib/api.js'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del']

export default function PinLock({ onUnlock }) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)
  const [busy, setBusy] = useState(false)

  async function press(k) {
    if (busy) return
    if (k === 'del') return setPin((p) => p.slice(0, -1))
    if (k === '') return
    const next = (pin + k).slice(0, 4)
    setPin(next)
    if (next.length === 4) {
      setBusy(true)
      const ok = await checkPin(next)
      if (ok) {
        onUnlock()
      } else {
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setPin('')
          setBusy(false)
        }, 450)
      }
    }
  }

  return (
    <div className="pin-screen">
      <div className="pin-brand">RSR</div>
      <h1 className="pin-title">Billing Tracker</h1>
      <p className="pin-sub">Enter PIN to unlock</p>

      <div className={'pin-dots' + (shake ? ' shake' : '')}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={'pin-dot' + (i < pin.length ? ' filled' : '')} />
        ))}
      </div>

      <div className="keypad">
        {KEYS.map((k, i) => (
          <button
            key={i}
            className={'key' + (k === '' ? ' key-empty' : '')}
            onClick={() => press(k)}
            disabled={k === '' || busy}
          >
            {k === 'del' ? '\u232B' : k}
          </button>
        ))}
      </div>
      <p className="pin-hint">Demo PIN: 1234</p>
    </div>
  )
}
