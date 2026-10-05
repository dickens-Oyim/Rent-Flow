import { useState } from 'react'
import { Wrench, Plus, Upload } from 'lucide-react'
import { tenantIssues, formatMoney } from '../../data.jsx'
import { PageHeader, StatusBadge, Modal, EmptyState } from '../../components/ui.jsx'

const categories = ['Water', 'Electricity', 'Plumbing', 'Door/Lock', 'Garbage', 'Internet', 'Security', 'Cleaning', 'General repair', 'Other']

export default function MyIssues() {
  const [addOpen, setAddOpen] = useState(false)
  const [issues, setIssues] = useState(tenantIssues)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  const submit = () => {
    if (!title || !description) return setError('Please fill in the title and description.')
    setIssues([{ id: Date.now(), title, unit: 'A-4', priority: 'medium', status: 'open', date: 'Today', description, response: '' }, ...issues])
    setTitle('')
    setDescription('')
    setError('')
    setAddOpen(false)
  }

  return (
    <div>
      <PageHeader
        title="My Issues"
        sub="Report problems and track their resolution"
        action={<button onClick={() => setAddOpen(true)} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Report issue</button>}
      />

      <div className="space-y-4">
        {issues.map((i) => (
          <div key={i.id} className="card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <Wrench className="w-5 h-5 text-orange-400" />
                <div>
                  <h3 className="text-white font-semibold">{i.title}</h3>
                  <p className="text-xs text-slate-500">{i.date} - Unit {i.unit}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge value={i.priority} />
                <StatusBadge value={i.status} />
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-3">{i.description}</p>
            {i.response && (
              <div className="bg-navy-900/70 rounded-lg p-3 mt-3 text-sm text-slate-300 border-l-2 border-emerald-500">
                {i.response}
              </div>
            )}
          </div>
        ))}
        {issues.length === 0 && <EmptyState message="No maintenance issues reported." />}
      </div>

      <Modal open={addOpen} title="Report maintenance issue" onClose={() => setAddOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Category</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Issue title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Brief summary of the problem" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Description</label>
            <textarea className="input h-28" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the problem in detail..." />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Photo (optional)</label>
            <label className="bg-navy-900/70 border border-navy-700/60 border-dashed rounded-lg p-5 flex flex-col items-center gap-2 cursor-pointer hover:border-emerald-500/50 transition">
              <Upload className="w-5 h-5 text-slate-500" />
              <span className="text-xs text-slate-500">Upload a photo of the issue</span>
              <input type="file" className="hidden" accept="image/*" />
            </label>
          </div>
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button onClick={submit} className="btn-primary w-full py-2.5 text-sm">Submit report</button>
        </div>
      </Modal>
    </div>
  )
}
