import { peso, totalPaid, remaining, statusOf, STATUS_LABEL } from '../lib/format.js'

export default function BillingCard({ billing, onAddAdvance, onRemoveAdvance }) {
  const paid = totalPaid(billing)
  const bal = remaining(billing)
  const status = statusOf(billing)

  return (
    <div className="card">
      <div className="card-head">
        <div>
          <div className="card-vessel">{billing.vessel}</div>
          <div className="card-meta">
            {billing.id} &middot; {billing.client}
          </div>
        </div>
        <span className={'badge badge-' + status}>{STATUS_LABEL[status]}</span>
      </div>

      <div className="ledger">
        <div className="ledger-row">
          <span>Billing value</span>
          <span>{peso(billing.amount)}</span>
        </div>
        <div className="ledger-row muted">
          <span>Less: advances / payments</span>
          <span>&minus;{peso(paid)}</span>
        </div>
        <div className="ledger-row total">
          <span>{bal < 0 ? 'Refund due' : 'Balance due'}</span>
          <span className={bal < 0 ? 'neg' : ''}>{peso(Math.abs(bal))}</span>
        </div>
      </div>

      {billing.advances.length > 0 && (
        <ul className="adv-list">
          {billing.advances.map((a) => (
            <li key={a.id}>
              <div>
                <span className="adv-amt">{peso(a.amount)}</span>
                <span className="adv-note">{a.note || 'Advance'} &middot; {a.date}</span>
              </div>
              <button className="adv-del" onClick={() => onRemoveAdvance(billing.id, a.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <button className="add-btn" onClick={() => onAddAdvance(billing)}>
        + Record advance / payment
      </button>
    </div>
  )
}
