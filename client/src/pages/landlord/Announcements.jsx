import { useState } from 'react'
import { Megaphone, Plus } from 'lucide-react'
import { announcements } from '../../data.jsx'
import { PageHeader, Modal, EmptyState } from '../../components/ui.jsx'

export default function Announcements() {
  const [addOpen, setAddOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  return (
    <div>
      <PageHeader
        title="Announcements"
        sub="Messages and notices sent to tenants"
        action={<button onClick={() => setAddOpen(true)} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" /> New announcement</button>}
      />

      <div className="space-y-4">
        {announcements.map((a) => (
          <div key={a.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Megaphone className="w-5 h-5 text-sky-400" />
                <h3 className="text-white font-semibold">{a.title}</h3>
              </div>
              <span className="badge badge-zinc">{a.property}</span>
            </div>
            <p className="text-sm text-slate-400 mt-3">{a.body}</p>
            <p className="text-xs text-slate-600 mt-3">{a.date}</p>
          </div>
        ))}
        {announcements.length === 0 && <EmptyState message="No announcements yet." />}
      </div>

      <Modal open={addOpen} title="New announcement" onClose={() => setAddOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Water Maintenance Notice" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Message</label>
            <textarea className="input h-32" value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your announcement..." />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Property</label>
            <select className="input"><option>All Properties</option><option>Riverside Apartments</option><option>Kilimani Heights</option><option>Runda Villas</option></select>
          </div>
          <button className="btn-primary w-full py-2.5 text-sm" onClick={() => setAddOpen(false)}>Send to tenants</button>
          <p className="text-xs text-slate-500 text-center">Demo mode - announcements are read-only until the backend is connected.</p>
        </div>
      </Modal>
    </div>
  )
}
