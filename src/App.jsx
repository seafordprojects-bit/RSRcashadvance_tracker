import { useEffect, useState } from 'react'
import PinLock from './components/PinLock.jsx'
import BillingCard from './components/BillingCard.jsx'
import AdvanceModal from './components/AdvanceModal.jsx'
import { getBillings, addAdvance, removeAdvance } from './lib/api.js'
import { peso, remaining, totalPaid } from './lib/format.js'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)
  const [billings, setBillings] = useState([])
  const [loading, setLoading] = useState(true)
  const [active, setActive] = useState(null) // billing being edited in the modal

  useEffect(() => {
    if (!unlocked) return
    let alive = true
    getBillings().then((data) => {
      if (alive) {
        setBillings(data)
        setLoading(false)
      }
    })
    return () => {
      alive = false
    }
  }, [unlocked])

  async function handleSaveAdvance(billingId, advance) {
    const updated = await addAdvance(billingId, advance)
    setBillings((list) => list.map((b) => (b.id === billingId ? updated : b)))
    setActive(null)
  }

  async function handleRemoveAdvance(billingId, advanceId) {
    const updated = await removeAdvance(billingId, advanceId)
    setBillings((list) => list.map((b) => (b.id === billingId ? updated : b)))
  }

  if (!unlocked) return <PinLock onUnlock={() => setUnlocked(true)} />

  const totalBilled = billings.reduce((s, b) => s + b.amount, 0)
  const totalAdv = billings.reduce((s, b) => s + totalPaid(b), 0)
  const totalDue = billings.reduce((s, b) => s + Math.max(0, remaining(b)), 0)

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-brand">RSR</div>
        <div>
          <h1>Billing Tracker</h1>
          <p>Engineering Services</p>
        </div>
      </header>

      <section className="summary">
        <div className="summary-cell">
          <span>Total billed</span>
          <strong>{peso(totalBilled)}</strong>
        </div>
        <div className="summary-cell">
          <span>Advances paid</span>
          <strong>{peso(totalAdv)}</strong>
        </div>
        <div className="summary-cell accent">
          <span>Outstanding</span>
          <strong>{peso(totalDue)}</strong>
        </div>
      </section>

      <main className="list">
        {loading ? (
          <p className="loading">Loading billings\u2026</p>
        ) : (
          billings.map((b) => (
            <BillingCard
              key={b.id}
              billing={b}
              onAddAdvance={setActive}
              onRemoveAdvance={handleRemoveAdvance}
            />
          ))
        )}
      </main>

      {active && (
        <AdvanceModal
          billing={active}
          onClose={() => setActive(null)}
          onSave={handleSaveAdvance}
        />
      )}
    </div>
  )
}
