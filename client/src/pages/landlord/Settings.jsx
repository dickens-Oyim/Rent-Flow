import { Building2, Smartphone, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../data.jsx'
import { PageHeader } from '../../components/ui.jsx'

export default function Settings() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader title="Settings" sub="Account and payment settings" />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-white font-semibold">Account</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between bg-navy-900/70 rounded-lg px-4 py-3">
              <span className="text-slate-500">Name</span>
              <span className="text-slate-200">{user.name}</span>
            </div>
            <div className="flex justify-between bg-navy-900/70 rounded-lg px-4 py-3">
              <span className="text-slate-500">Email</span>
              <span className="text-slate-200">{user.email}</span>
            </div>
            <div className="flex justify-between bg-navy-900/70 rounded-lg px-4 py-3">
              <span className="text-slate-500">Role</span>
              <span className="text-slate-200 capitalize">{user.role}</span>
            </div>
          </div>
        </div>

        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Smartphone className="w-5 h-5 text-sky-400" />
            <h2 className="text-white font-semibold">M-PESA collection</h2>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between bg-navy-900/70 rounded-lg px-4 py-3">
              <span className="text-slate-500">Paybill number</span>
              <span className="text-slate-200 font-mono">522522</span>
            </div>
            <div className="flex justify-between bg-navy-900/70 rounded-lg px-4 py-3">
              <span className="text-slate-500">Account format</span>
              <span className="text-slate-200">Tenant unit number</span>
            </div>
          </div>
        </div>

        <div className="card p-5 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-violet-400" />
            <h2 className="text-white font-semibold">Security</h2>
          </div>
          <p className="text-sm text-slate-400">
            Passwords are stored hashed, payment records are protected, and every user sees only their own data. Payment records cannot be altered after verification.
          </p>
        </div>
      </div>
    </div>
  )
}
