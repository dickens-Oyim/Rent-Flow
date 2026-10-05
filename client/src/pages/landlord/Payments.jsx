import { useState } from 'react'
import { Wallet, CheckCircle2, Search, Eye, Smartphone } from 'lucide-react'
import { payments, formatMoney } from '../../data.jsx'
import { PageHeader, StatusBadge, Modal, EmptyState } from '../../components/ui.jsx'

export default function Payments() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [selected, setSelected] = useState(null)
  const [verifiedIds, setVerifiedIds] = useState([])

  const filtered = payments.filter((p) => {
    const matchesSearch = p.tenant.toLowerCase().includes(search.toLowerCase()) || p.ref.toLowerCase().includes(search.toLowerCase())
    const pStatus = verifiedIds.includes(p.id) ? 'verified' : p.status
    const matchesStatus = status === 'all' || pStatus === status
    return matchesSearch && matchesStatus
  })

  const verify = (id) => {
    setVerifiedIds((ids) => [...ids, id])
    setSelected(null)
  }

  return (
    <div>
      <PageHeader title="Payments" sub="Review and verify rent payments submitted by tenants" />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input className="input pl-9" placeholder="Search by tenant or M-PESA ref..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input max-w-48" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All payments</option>
          <option value="awaiting">Awaiting verification</option>
          <option value="verified">Verified</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr><th>Tenant</th><th>Unit</th><th>Amount</th><th>Method</th><th>Reference</th><th>Date</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => {
              const pStatus = verifiedIds.includes(p.id) ? 'verified' : p.status
              return (
                <tr key={p.id}>
                  <td className="text-slate-200">{p.tenant}</td>
                  <td className="text-slate-400">{p.unit}</td>
                  <td className="text-slate-200 font-medium">{formatMoney(p.amount)}</td>
                  <td className="text-slate-400">{p.method}</td>
                  <td className="text-slate-400 font-mono text-xs">{p.ref}</td>
                  <td className="text-slate-400">{p.date}</td>
                  <td><StatusBadge value={pStatus} /></td>
                  <td className="text-right">
                    <button onClick={() => setSelected({ ...p, status: pStatus })} className="btn-ghost px-3 py-1.5 text-xs inline-flex items-center gap-1"><Eye className="w-3 h-3" /> Review</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState message="No payments match your filters." />}
      </div>

      <Modal open={!!selected} title="Payment details" onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{selected.tenant}</p>
                <p className="text-xs text-slate-500">Unit {selected.unit} - {selected.date}</p>
              </div>
              <StatusBadge value={selected.status} />
            </div>
            <div className="bg-navy-900/70 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2 text-xs text-slate-500">
                <Smartphone className="w-3.5 h-3.5" /> {selected.method}
              </div>
              <p className="text-2xl font-bold text-white">{formatMoney(selected.amount)}</p>
              <p className="text-xs text-slate-400 font-mono mt-1">Ref: {selected.ref}</p>
            </div>
            <div className="bg-navy-900/70 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-2">Payment screenshot</p>
              <div className="h-40 rounded-lg bg-navy-800 flex items-center justify-center text-sm text-slate-500">
                <Eye className="w-5 h-5 mr-2" /> payment-proof.jpg
              </div>
            </div>
            {selected.status === 'awaiting' && (
              <button onClick={() => verify(selected.id)} className="btn-primary w-full py-2.5 text-sm inline-flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Verify payment
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
