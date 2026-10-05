import { useState } from 'react'
import { Users, Search, Plus, Send, Phone, Mail } from 'lucide-react'
import { tenants, formatMoney } from '../../data.jsx'
import { PageHeader, StatusBadge, Modal, Avatar, EmptyState } from '../../components/ui.jsx'

export default function Tenants() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [addOpen, setAddOpen] = useState(false)

  const filtered = tenants.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.unit.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = filter === 'all' || t.status === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <PageHeader
        title="Tenants"
        sub="Manage tenant records, leases, and payment status"
        action={<button onClick={() => setAddOpen(true)} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add tenant</button>}
      />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input className="input pl-9" placeholder="Search tenants by name or unit..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input max-w-40" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      <div className="card overflow-hidden">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tenant</th><th>Unit</th><th>Property</th><th>Monthly Rent</th><th>Balance</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((t) => (
              <tr key={t.id} className="cursor-pointer" onClick={() => setSelected(t)}>
                <td><div className="flex items-center gap-3"><Avatar name={t.name} /><span className="text-slate-200">{t.name}</span></div></td>
                <td className="text-slate-400">{t.unit}</td>
                <td className="text-slate-400">{t.property}</td>
                <td className="text-slate-200">{formatMoney(t.rent)}</td>
                <td className={t.balance > 0 ? 'text-red-400' : 'text-emerald-400'}>{formatMoney(t.balance)}</td>
                <td><StatusBadge value={t.status} /></td>
                <td className="text-right"><button onClick={(e) => { e.stopPropagation(); setSelected(t) }} className="btn-ghost px-3 py-1.5 text-xs">View</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <EmptyState message="No tenants match your search." />}
      </div>

      <Modal open={!!selected} title="Tenant details" onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} className="w-12 h-12 text-sm" />
              <div>
                <p className="text-white font-semibold">{selected.name}</p>
                <p className="text-xs text-slate-500">{selected.unit} - {selected.property}</p>
              </div>
              <StatusBadge value={selected.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-navy-900/70 rounded-lg p-3">
                <p className="text-xs text-slate-500">Monthly rent</p>
                <p className="text-slate-200 mt-1">{formatMoney(selected.rent)}</p>
              </div>
              <div className="bg-navy-900/70 rounded-lg p-3">
                <p className="text-xs text-slate-500">Balance</p>
                <p className={'mt-1 ' + (selected.balance > 0 ? 'text-red-400' : 'text-emerald-400')}>{formatMoney(selected.balance)}</p>
              </div>
              <div className="bg-navy-900/70 rounded-lg p-3">
                <p className="text-xs text-slate-500">Phone</p>
                <p className="text-slate-200 mt-1 flex items-center gap-1"><Phone className="w-3 h-3" /> {selected.phone}</p>
              </div>
              <div className="bg-navy-900/70 rounded-lg p-3">
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-slate-200 mt-1 truncate flex items-center gap-1"><Mail className="w-3 h-3" /> {selected.email}</p>
              </div>
              <div className="bg-navy-900/70 rounded-lg p-3">
                <p className="text-xs text-slate-500">Moved in</p>
                <p className="text-slate-200 mt-1">{selected.moveIn}</p>
              </div>
              <div className="bg-navy-900/70 rounded-lg p-3">
                <p className="text-xs text-slate-500">Lease ends</p>
                <p className="text-slate-200 mt-1">{selected.leaseEnd}</p>
              </div>
            </div>
            <button className="btn-primary w-full py-2.5 text-sm inline-flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send rent reminder
            </button>
          </div>
        )}
      </Modal>

      <Modal open={addOpen} title="Add tenant" onClose={() => setAddOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Full name</label>
            <input className="input" placeholder="Tenant full name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Email</label>
              <input className="input" placeholder="Email address" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Phone</label>
              <input className="input" placeholder="07XX XXX XXX" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Property</label>
              <select className="input"><option>Riverside Apartments</option><option>Kilimani Heights</option><option>Runda Villas</option></select>
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Unit</label>
              <input className="input" placeholder="e.g. A-4" />
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Monthly rent (KSh)</label>
            <input className="input" type="number" placeholder="e.g. 32000" />
          </div>
          <button className="btn-primary w-full py-2.5 text-sm" onClick={() => setAddOpen(false)}>Save tenant</button>
          <p className="text-xs text-slate-500 text-center">Demo mode - tenants are read-only until the backend is connected.</p>
        </div>
      </Modal>
    </div>
  )
}
