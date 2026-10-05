import { statusVariant, statusLabel } from '../data.jsx'

export const StatusBadge = ({ value }) => (
  <span className={'badge ' + statusVariant(value)}>{statusLabel(value)}</span>
)

export const StatCard = ({ label, value, sub, icon: Icon, tone = 'text-green-400' }) => (
  <div className="stat-card p-5">
    <div className="flex items-center justify-between">
      <span className="text-xs uppercase tracking-wide text-slate-400">{label}</span>
      {Icon && <Icon className={'w-5 h-5 ' + tone} />}
    </div>
    <div className={'mt-3 text-2xl font-bold ' + tone}>{value}</div>
    {sub && <div className="mt-1 text-xs text-slate-400">{sub}</div>}
  </div>
)

export const PageHeader = ({ title, sub, action }) => (
  <div className="flex items-end justify-between mb-6">
    <div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      {sub && <p className="text-sm text-slate-400 mt-1">{sub}</p>}
    </div>
    {action}
  </div>
)

export const EmptyState = ({ message }) => (
  <div className="text-center py-12 text-sm text-slate-500">{message}</div>
)

export const Modal = ({ open, title, onClose, children }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70" onClick={onClose}>
      <div className="card-solid w-full max-w-md p-6 scroll-thin max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-lg">x</button>
        </div>
        {children}
      </div>
    </div>
  )
}

export const Avatar = ({ name, className = '' }) => {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className={'w-9 h-9 rounded-full bg-sky-800 flex items-center justify-center text-xs font-semibold text-white ' + className}>
      {initials}
    </div>
  )
}
