import { useState } from 'react'
import { Smartphone, Upload, CheckCircle2, Clock } from 'lucide-react'
import { ledger, formatMoney } from '../../data.jsx'
import { PageHeader, StatCard, StatusBadge, Modal } from '../../components/ui.jsx'

export default function MyRent() {
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('M-PESA')
  const [ref, setRef] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const balance = ledger[0].balance

  const submit = () => {
    if (!amount || Number(amount) <= 0) return setError('Please enter the amount you paid.')
    if (!ref) return setError('Please enter the transaction reference.')
    setSubmitted(true)
  }

  const reset = () => {
    setSubmitted(false)
    setAmount('')
    setRef('')
    setScreenshot(null)
    setError('')
  }

  return (
    <div>
      <PageHeader title="My Rent" sub="Pay your rent and submit payment proof" />

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Balance due" value={formatMoney(balance)} sub="February 2026" icon={Clock} tone={balance > 0 ? 'text-red-400' : 'text-emerald-400'} />
        <StatCard label="Monthly rent" value={formatMoney(32000)} sub="Unit A-4" icon={Smartphone} tone="text-sky-400" />
        <StatCard label="Next due date" value="5 Feb 2026" sub="Paybill 522522 - Account A-4" icon={CheckCircle2} tone="text-emerald-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card p-5">
          <h2 className="text-white font-semibold mb-4">Submit a payment</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Amount paid (KSh)</label>
              <input className="input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g. 32000" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Payment method</label>
              <select className="input" value={method} onChange={(e) => setMethod(e.target.value)}>
                <option>M-PESA</option>
                <option>Bank Transfer</option>
                <option>Cash</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Transaction reference</label>
              <input className="input font-mono" value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} placeholder="e.g. QJ74XK9L2M" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Payment screenshot</label>
              <label className="bg-navy-900/70 border border-navy-700/60 border-dashed rounded-lg p-6 flex flex-col items-center gap-2 cursor-pointer hover:border-emerald-500/50 transition">
                <Upload className="w-5 h-5 text-slate-500" />
                <span className="text-xs text-slate-500">{screenshot ? screenshot.name : 'Upload screenshot of your payment'}</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => setScreenshot(e.target.files[0])} />
              </label>
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button onClick={submit} className="btn-primary w-full py-2.5 text-sm">Submit payment</button>
          </div>
        </div>

        <div className="card p-5">
          <h2 className="text-white font-semibold mb-4">Rent ledger</h2>
          <div className="space-y-2">
            {ledger.map((l) => (
              <div key={l.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-3 text-sm">
                <div>
                  <p className="text-slate-200">{l.month}</p>
                  <p className="text-xs text-slate-500">Paid: {formatMoney(l.paid)}</p>
                </div>
                <div className="text-right">
                  <p className={'text-sm ' + (l.balance > 0 ? 'text-red-400' : 'text-emerald-400')}>{formatMoney(l.balance)}</p>
                  <StatusBadge value={l.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal open={submitted} title="Payment submitted" onClose={reset}>
        <div className="text-center py-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
          <p className="text-white font-semibold">Your payment is awaiting verification</p>
          <p className="text-sm text-slate-400 mt-2">
            {formatMoney(amount || 0)} via {method} - ref {ref}. The landlord will verify it shortly.
          </p>
          <button onClick={reset} className="btn-primary w-full py-2.5 text-sm mt-6">Done</button>
        </div>
      </Modal>
    </div>
  )
}
