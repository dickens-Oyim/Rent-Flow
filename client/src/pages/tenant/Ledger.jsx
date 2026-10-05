import { Wallet, CheckCircle2 } from 'lucide-react'
import { ledger, formatMoney, statusVariant, statusLabel } from '../../data.jsx'
import { PageHeader, StatusBadge, StatCard } from '../../components/ui.jsx'

export default function Ledger() {
  const totalDue = ledger.reduce((s, l) => s + l.rent, 0)
  const totalPaid = ledger.reduce((s, l) => s + l.paid, 0)
  const outstanding = totalDue - totalPaid

  return (
    <div>
      <PageHeader title="Rent Ledger" sub="Complete record of your rent account" />

      <div className="grid md:grid-cols-3 gap-4">
        <StatCard label="Total billed" value={formatMoney(totalDue)} sub="Last 5 months" icon={Wallet} tone="text-sky-400" />
        <StatCard label="Total paid" value={formatMoney(totalPaid)} icon={CheckCircle2} tone="text-emerald-400" />
        <StatCard label="Outstanding" value={formatMoney(outstanding)} sub="Accumulated arrears" icon={Wallet} tone={outstanding > 0 ? 'text-red-400' : 'text-emerald-400'} />
      </div>

      <div className="card overflow-hidden mt-6">
        <table className="data-table">
          <thead>
            <tr><th>Month</th><th>Rent</th><th>Paid</th><th>Balance</th><th>Status</th></tr>
          </thead>
          <tbody>
            {ledger.map((l) => (
              <tr key={l.id}>
                <td className="text-slate-200">{l.month}</td>
                <td className="text-slate-400">{formatMoney(l.rent)}</td>
                <td className="text-slate-400">{formatMoney(l.paid)}</td>
                <td className={l.balance > 0 ? 'text-red-400' : 'text-emerald-400'}>{formatMoney(l.balance)}</td>
                <td><StatusBadge value={l.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
