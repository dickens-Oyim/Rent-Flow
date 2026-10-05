import { Link } from 'react-router-dom'
import { Wallet, Users, Wrench, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react'
import { tenants, payments, issues, formatMoney } from '../../data.jsx'
import { PageHeader, StatCard, StatusBadge, EmptyState } from '../../components/ui.jsx'

export default function ManagerDashboard() {
  const outstanding = tenants.reduce((s, t) => s + t.balance, 0)
  const awaiting = payments.filter((p) => p.status === 'awaiting').length
  const openIssues = issues.filter((i) => i.status !== 'resolved').length

  return (
    <div>
      <PageHeader
        title="Manager Dashboard"
        sub="Riverside Apartments - February 2026"
        action={<Link to="/app/maintenance" className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2">Manage maintenance <ArrowRight className="w-4 h-4" /></Link>}
      />

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Outstanding rent" value={formatMoney(outstanding)} sub="Across assigned properties" icon={AlertCircle} tone="text-amber-400" />
        <StatCard label="Awaiting verification" value={awaiting} sub="Payments to review" icon={Wallet} tone="text-sky-400" />
        <StatCard label="Tenants" value={tenants.length} sub="Active tenants" icon={Users} tone="text-violet-400" />
        <StatCard label="Open issues" value={openIssues} sub="Maintenance reports" icon={Wrench} tone="text-orange-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Payments to verify</h2>
            <span className="badge badge-yellow">{awaiting}</span>
          </div>
          <div className="space-y-2">
            {payments.filter((p) => p.status === 'awaiting').map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-3 text-sm">
                <div>
                  <p className="text-slate-200">{p.tenant} - {p.unit}</p>
                  <p className="text-xs text-slate-500">{p.method} - {p.ref}</p>
                </div>
                <span className="text-slate-200">{formatMoney(p.amount)}</span>
              </div>
            ))}
          </div>
          <Link to="/app/payments" className="btn-ghost w-full py-2 text-sm mt-4 block text-center">Go to payments</Link>
        </div>

        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Overdue tenants</h2>
          </div>
          <div className="space-y-2">
            {tenants.filter((t) => t.status === 'overdue').map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-3 text-sm">
                <div>
                  <p className="text-slate-200">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.unit}</p>
                </div>
                <span className="text-red-400">{formatMoney(t.balance)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
