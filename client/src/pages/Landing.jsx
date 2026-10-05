import { Link } from "react-router-dom";
import {
  Building2,
  Wallet,
  Wrench,
  BarChart3,
  ShieldCheck,
  Smartphone,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Rent Collection",
    body: "Tenants pay via M-PESA and submit payment proof. You verify every payment in one place.",
  },
  {
    icon: Wrench,
    title: "Maintenance",
    body: "Tenants report issues with photos. Track every job from report to resolution.",
  },
  {
    icon: Building2,
    title: "Properties & Units",
    body: "Manage buildings, managers, and tenants. See occupancy at a glance.",
  },
  {
    icon: BarChart3,
    title: "Reports",
    body: "Monthly revenue, balances, and occupancy reports you can act on.",
  },
];

export default function Landing() {
  return (
    <div className="page-bg">
      <header className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-lg">RentFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-ghost px-4 py-2 text-sm">
            Sign in
          </Link>
          <Link to="/signup" className="btn-primary px-4 py-2 text-sm">
            Get started
          </Link>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-8 pt-16 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-2 mb-6 pulse-dot" />
          <span className="badge badge-green mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1 pulse-dot" />
            Built for Kenyan landlords
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Property management,{" "}
            <span className="text-emerald-400">the M-PESA way</span>
          </h1>
          <p className="text-slate-400 mt-5 text-lg">
            Collect rent, verify M-PESA payments, track maintenance, and manage
            your rental properties in one place.
          </p>
          <div className="flex items-center gap-3 mt-8">
            <Link
              to="/signup"
              className="btn-primary px-6 py-3 text-sm inline-flex items-center gap-2"
            >
              Start free trial <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-ghost px-6 py-3 text-sm">
              View demo
            </Link>
          </div>
          <div className="flex items-center gap-5 mt-10 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> No setup
              fees
            </span>
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Free for
              your first 5 units
            </span>
          </div>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="stat-card p-4">
              <p className="text-xs text-slate-400">Monthly Revenue</p>
              <p className="text-xl font-bold text-emerald-400 mt-1">
                KSh 1,135,000
              </p>
              <p className="text-xs text-slate-500 mt-1">+8.2% vs last month</p>
            </div>
            <div className="stat-card p-4">
              <p className="text-xs text-slate-400">Occupancy</p>
              <p className="text-xl font-bold text-sky-400 mt-1">91%</p>
              <p className="text-xs text-slate-500 mt-1">
                21 of 24 units occupied
              </p>
            </div>
            <div className="stat-card p-4 col-span-2">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-slate-400">Awaiting Verification</p>
                <span className="badge badge-yellow">2</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between bg-navy-900/70 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-300">Selina Wambui - A-9</span>
                  <span className="text-slate-400">KSh 36,000</span>
                </div>
                <div className="flex items-center justify-between bg-navy-900/70 rounded-lg px-3 py-2 text-sm">
                  <span className="text-slate-300">Janet Njeri - K-1</span>
                  <span className="text-slate-400">KSh 44,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16 grid md:grid-cols-4 gap-4">
        {features.map((f) => (
          <div key={f.title} className="card p-5">
            <f.icon className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="text-white font-semibold">{f.title}</h3>
            <p className="text-slate-400 text-sm mt-2">{f.body}</p>
          </div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-8 pb-16">
        <div className="card p-8 grid md:grid-cols-3 gap-8">
          <div>
            <ShieldCheck className="w-6 h-6 text-sky-400 mb-3" />
            <h3 className="text-white font-semibold">Secure by design</h3>
            <p className="text-slate-400 text-sm mt-2">
              Every landlord sees only their own properties, every tenant sees
              only their own unit. Payment records stay protected.
            </p>
          </div>
          <div>
            <Smartphone className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="text-white font-semibold">M-PESA first</h3>
            <p className="text-slate-400 text-sm mt-2">
              Built around M-PESA Paybill collections, bank transfers, and cash,
              so nothing about rent is left to guesswork.
            </p>
          </div>
          <div>
            <CheckCircle2 className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="text-white font-semibold">Simple pricing</h3>
            <p className="text-slate-400 text-sm mt-2">
              Free for up to five units. Simple monthly pricing beyond that,
              with no commissions on your rent.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-navy-700/40 px-8 py-6 max-w-6xl mx-auto flex items-center justify-between text-sm text-slate-500">
        <span>2026 RentFlow. All rights reserved.</span>
        <span className="text-slate-600">
          Rental property management for Kenyan landlords
        </span>
      </footer>
    </div>
  );
}
