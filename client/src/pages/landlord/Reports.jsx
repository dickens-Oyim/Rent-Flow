import { BarChart3, TrendingUp, TrendingDown, Building2, Users } from 'lucide-react'
import { properties, tenants, payments, formatMoney, statusVariant, statusLabel } from '../../data.jsx'
import { PageHeader, StatCard, StatusBadge } from '../../components/ui.jsx'

const monthly = [
  { month: 'Sep', revenue: 985000 },
  { month: 'Oct', revenue: 1012000 },
  { month: 'Nov', revenue: 998000 },
  { month: 'Dec', revenue: 1064000 },
  { month: 'Jan', revenue: 1051000 },
  { month: 'Feb', revenue: 1135000 },
]

export default function Reports() {
  const collected = payments.filter((p) => p.status === 'verified').reduce((s, p) => s + p.amount, 0)
  const outstanding = tenants.reduce((s, t) => s + t.balance, 0)
  const maxRevenue = Math.max(...monthly.map((m) => m.revenue))

  return (
    <div>
      <PageHeader title="Reports" sub="Monthly revenue and payment performance" />

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Collected (Feb)" value={formatMoney(collected)} icon={TrendingUp} tone="text-emerald-400" />
        <StatCard label="Outstanding" value={formatMoney(outstanding)} icon={TrendingDown} tone="text-amber-400" />
        <StatCard label="Occupancy" value="87%" sub="21 of 24 units" icon={Building2} tone="text-sky-400" />
        <StatCard label="Active tenants" value={tenants.length} icon={Users} tone="text-violet-400" />
      </div>

      <div className="card p-6 mt-6">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <h2 className="text-white font-semibold">Monthly revenue (last 6 months)</h2>
        </div>
        <div className="grid grid-cols-6 gap-3 items-end h-48">
          {monthly.map((m) => (
            <div key={m.month} className="flex flex-col items-center gap-2 h-full justify-end">
              <span className="text-xs text-slate-400">{(m.revenue / 1000).toLocaleString()}k</span>
              <div className="w-full rounded-t-lg bg-emerald-500" style={{ height: `${(m.revenue / maxRevenue) * 100}%` }} />
              <span className="text-xs text-slate-500">{m.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden mt-6">
        <table className="data-table">
          <thead>
            <tr><th>Property</th><th>Units</th><th>Occupied</th><th>Monthly revenue</th><th>Occupancy</th></tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td className="text-slate-200">{p.name}</td>
                <td className="text-slate-400">{p.units}</td>
                <td className="text-emerald-400">{p.occupied}</td>
                <td className="text-slate-200">{formatMoney(p.revenue)}</td>
                <td><StatusBadge value={p.occupied === p.units ? 'paid' : 'pending'} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
