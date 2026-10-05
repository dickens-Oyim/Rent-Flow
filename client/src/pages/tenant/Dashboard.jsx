import { Link } from 'react-router-dom'
import { Wallet, AlertCircle, CheckCircle2, Wrench, Megaphone, ArrowRight, Smartphone } from 'lucide-react'
import { ledger, tenantIssues, announcements, formatMoney } from '../../data.jsx'
import { PageHeader, StatCard, StatusBadge } from '../../components/ui.jsx'

export default function TenantDashboard() {
  const balance = ledger[0].balance
  const paidCount = ledger.filter((l) => l.status === 'paid').length
  const openIssues = tenantIssues.filter((i) => i.status !== 'resolved').length

  return (
    <div>
      <PageHeader title="My Dashboard" sub="Unit A-4 - Riverside Apartments" />

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Current balance" value={formatMoney(balance)} sub="February 2026 rent" icon={AlertCircle} tone={balance > 0 ? 'text-red-400' : 'text-emerald-400'} />
        <StatCard label="Rent paid" value={paidCount + ' of ' + ledger.length} sub="Last 5 months" icon={CheckCircle2} tone="text-emerald-400" />
        <StatCard label="Open issues" value={openIssues} sub="Maintenance reports" icon={Wrench} tone="text-orange-400" />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold flex items-center gap-2"><Wallet className="w-4 h-4 text-emerald-400" /> Pay February rent</h2>
          </div>
          <p className="text-3xl font-bold text-white">{formatMoney(balance)}</p>
          <p className="text-xs text-slate-500 mt-1">Due 5 February 2026</p>
          <div className="bg-navy-900/70 rounded-lg p-4 mt-4 text-sm">
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
              <Smartphone className="w-3.5 h-3.5" /> M-PESA Paybill
            </div>
            <p className="text-slate-200 font-mono">Paybill: 522522</p>
            <p className="text-slate-200 font-mono">Account: A-4</p>
          </div>
          <Link to="/app/my-rent" className="btn-primary w-full py-2.5 text-sm mt-4 flex items-center justify-center gap-2">
            Submit payment <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="card p-5">
          <h2 className="text-white font-semibold mb-4">My issues</h2>
          <div className="space-y-2">
            {tenantIssues.map((i) => (
              <div key={i.id} className="flex items-center justify-between bg-navy-900/70 rounded-lg px-4 py-3 text-sm">
                <div>
                  <p className="text-slate-200">{i.title}</p>
                  <p className="text-xs text-slate-500">{i.date}</p>
                </div>
                <StatusBadge value={i.status} />
              </div>
            ))}
          </div>
          <Link to="/app/my-issues" className="btn-ghost w-full py-2 text-sm mt-4 block text-center">Report an issue</Link>
        </div>
      </div>

      <div className="card p-5 mt-6">
        <h2 className="text-white font-semibold flex items-center gap-2 mb-4"><Megaphone className="w-4 h-4 text-sky-400" /> Property announcements</h2>
        <div className="space-y-3">
          {announcements.slice(0, 2).map((a) => (
            <div key={a.id} className="bg-navy-900/70 rounded-lg p-4">
              <p className="text-slate-200 font-medium text-sm">{a.title}</p>
              <p className="text-xs text-slate-500 mt-1">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
