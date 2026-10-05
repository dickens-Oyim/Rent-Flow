import { Link } from 'react-router-dom'
import { Wallet, Users, Building2, Wrench, ArrowRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react'
import { properties, tenants, payments, issues, formatMoney, statusLabel, statusVariant } from '../../data.jsx'
import { StatCard, PageHeader, StatusBadge, EmptyState } from '../../components/ui.jsx'

export default function Dashboard() {
  const expected = tenants.reduce((s, t) => s + t.rent, 0)
  const collected = payments.filter((p) => p.status === 'verified').reduce((s, p) => s + p.amount, 0)
  const awaiting = payments.filter((p) => p.status === 'awaiting').length
  const openIssues = issues.filter((i) => i.status !== 'resolved').length

  return (
    <div>
      <PageHeader
        title="Dashboard"
        sub="February 2026 overview"
        action={<Link to="/app/payments" className="btn-primary px-4 py-2 text-sm inline-flex items-center gap-2">Verify payments <ArrowRight className="w-4 h-4" /></Link>}
      />

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Collected" value={formatMoney(collected)} sub="Verified payments this month" icon={CheckCircle2} tone="text-emerald-400" />
        <StatCard label="Expected Rent" value={formatMoney(expected)} sub="From 24 occupied units" icon={Wallet} tone="text-sky-400" />
        <StatCard label="Outstanding" value={formatMoney(expected - collected)} sub="Balance across all tenants" icon={AlertCircle} tone="text-amber-400" />
        <StatCard label="Open Issues" value={openIssues} sub={`${awaiting} payments awaiting review`} icon={Wrench} tone="text-orange-400" />
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="card p-5 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold">Payments awaiting verification</h2>
            <span className="badge badge-yellow">{awaiting}</span>
          </div>
          {awaiting === 0 ? <EmptyState message="No payments awaiting review." /> : (
            <div className="space-y-2">
              {payments.filter((p) => p.status === 'awaiting').map((p) => (
                <div key={p.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-3 text-sm">
                  <div>
                    <p className="text-slate-200">{p.tenant} - {p.unit}</p>
                    <p className="text-xs text-slate-500">{p.method} - {p.ref}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-200">{formatMoney(p.amount)}</span>
                    <StatusBadge value={p.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-5">
          <h2 className="text-white font-semibold mb-4">Overdue tenants</h2>
          <div className="space-y-2">
            {tenants.filter((t) => t.status === 'overdue').map((t) => (
              <div key={t.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-3 text-sm">
                <div>
                  <p className="text-slate-200">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.unit} - {t.property}</p>
                </div>
                <span className="text-red-400">{formatMoney(t.balance)}</span>
              </div>
            ))}
          </div>
          <Link to="/app/tenants" className="btn-ghost w-full py-2 text-sm mt-4 block text-center">View all tenants</Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="card p-5">
          <Building2 className="w-5 h-5 text-emerald-400 mb-3" />
          <h2 className="text-white font-semibold mb-3">Occupancy</h2>
          <p className="text-3xl font-bold text-white">21<span className="text-lg text-slate-500">/24</span></p>
          <div className="mt-3 h-2 rounded-full bg-navy-800 overflow-hidden">
            <div className="h-full w-[87%] bg-emerald-500 rounded-full" />
          </div>
          <p className="text-xs text-slate-500 mt-2">87% of units occupied</p>
        </div>
        <div className="card p-5 md:col-span-2">
          <h2 className="text-white font-semibold mb-3">Recent maintenance reports</h2>
          <div className="space-y-2">
            {issues.map((i) => (
              <div key={i.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-2.5 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-slate-200">{i.title}</span>
                  <span className={'badge ' + statusVariant(i.priority)}>{statusLabel(i.priority)}</span>
                </div>
                <StatusBadge value={i.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
