import { useState } from 'react'
import { Wrench, Search, Eye, Wrench as WrenchIcon } from 'lucide-react'
import { issues, statusLabel } from '../../data.jsx'
import { PageHeader, StatusBadge, Modal, EmptyState, StatusBadge as SB } from '../../components/ui.jsx'

export default function Maintenance() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [progress, setProgress] = useState([])

  const filtered = issues.filter((i) => {
    const matchesSearch = i.title.toLowerCase().includes(search.toLowerCase()) || i.tenant.toLowerCase().includes(search.toLowerCase())
    const iStatus = progress.includes(i.id) ? 'in_progress' : i.status
    const matchesFilter = filter === 'all' || iStatus === filter
    return matchesSearch && matchesFilter
  })

  return (
    <div>
      <PageHeader title="Maintenance" sub="Track maintenance reports from tenants" />

      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input className="input pl-9" placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select className="input max-w-48" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All reports</option>
          <option value="open">Open</option>
          <option value="in_progress">In progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {filtered.map((i) => {
          const iStatus = progress.includes(i.id) ? 'in_progress' : i.status
          return (
            <div key={i.id} className="card p-5">
              <div className="flex items-start justify-between mb-3">
                <WrenchIcon className="w-5 h-5 text-orange-400" />
                <StatusBadge value={iStatus} />
              </div>
              <h3 className="text-white font-semibold">{i.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{i.tenant} - {i.unit} - {i.property}</p>
              <p className="text-sm text-slate-400 mt-3">{i.description}</p>
              <div className="flex items-center justify-between mt-4">
                <StatusBadge value={i.priority} />
                <button onClick={() => setSelected({ ...i, status: iStatus })} className="btn-ghost px-3 py-1.5 text-xs">Manage</button>
              </div>
            </div>
          )
        })}
      </div>

      <Modal open={!!selected} title="Maintenance report" onClose={() => setSelected(null)}>
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold">{selected.title}</p>
                <p className="text-xs text-slate-500">{selected.tenant} - Unit {selected.unit} - {selected.date}</p>
              </div>
              <StatusBadge value={selected.status} />
            </div>
            <p className="text-sm text-slate-300 bg-navy-900/70 rounded-lg p-4">{selected.description}</p>
            <div className="bg-navy-900/70 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-2">Photo attached by tenant</p>
              <div className="h-40 rounded-lg bg-navy-800 flex items-center justify-center text-sm text-slate-500">issue-photo.jpg</div>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-1.5">Priority</p>
              <StatusBadge value={selected.priority} />
            </div>
            {selected.status === 'open' && (
              <button
                onClick={() => { setProgress((ids) => [...ids, selected.id]); setSelected(null) }}
                className="btn-primary w-full py-2.5 text-sm"
              >
                Mark as in progress
              </button>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
