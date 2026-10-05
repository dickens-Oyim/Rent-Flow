import { useState } from 'react'
import { Building2, MapPin, Plus, Users, TrendingUp } from 'lucide-react'
import { properties, formatMoney } from '../../data.jsx'
import { PageHeader, Modal } from '../../components/ui.jsx'

export default function Properties() {
  const [addOpen, setAddOpen] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [units, setUnits] = useState('')

  return (
    <div>
      <PageHeader
        title="Properties"
        sub="Manage your rental properties"
        action={<button onClick={() => setAddOpen(true)} className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2"><Plus className="w-4 h-4" /> Add property</button>}
      />

      <div className="grid md:grid-cols-3 gap-4">
        {properties.map((p) => (
          <div key={p.id} className="card overflow-hidden">
            <div className="h-24" style={{ background: p.image }} />
            <div className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><MapPin className="w-3 h-3" /> {p.address}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-navy-900/70 rounded-lg py-2">
                  <p className="text-xs text-slate-500">Units</p>
                  <p className="text-sm font-semibold text-white">{p.units}</p>
                </div>
                <div className="bg-navy-900/70 rounded-lg py-2">
                  <p className="text-xs text-slate-500">Occupied</p>
                  <p className="text-sm font-semibold text-emerald-400">{p.occupied}</p>
                </div>
                <div className="bg-navy-900/70 rounded-lg py-2">
                  <p className="text-xs text-slate-500">Vacant</p>
                  <p className="text-sm font-semibold text-amber-400">{p.units - p.occupied}</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-4 text-sm">
                <span className="text-slate-500 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {p.manager}</span>
                <span className="text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3.5 h-3.5" /> {formatMoney(p.revenue)}</span>
              </div>
            </div>
          </div>
        ))}

        <button onClick={() => setAddOpen(true)} className="card p-8 flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-slate-300 border-dashed transition">
          <Building2 className="w-8 h-8" />
          <span className="text-sm">Add a new property</span>
        </button>
      </div>

      <Modal open={addOpen} title="Add new property" onClose={() => setAddOpen(false)}>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Property name</label>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Riverside Apartments" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Address</label>
            <input className="input" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, estate, town" />
          </div>
          <div>
            <label className="text-xs text-slate-400 block mb-1.5">Number of units</label>
            <input className="input" type="number" value={units} onChange={(e) => setUnits(e.target.value)} placeholder="e.g. 12" />
          </div>
          <button
            className="btn-primary w-full py-2.5 text-sm"
            onClick={() => setAddOpen(false)}
          >
            Save property
          </button>
          <p className="text-xs text-slate-500 text-center">Demo mode - properties are read-only until the backend is connected.</p>
        </div>
      </Modal>
    </div>
  )
}
