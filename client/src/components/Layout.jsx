import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Building2, LayoutDashboard, Users, Wallet, Wrench, Megaphone, BarChart3, Settings, LogOut, Home } from 'lucide-react'
import { useAuth } from '../data.jsx'
import { Avatar } from './ui.jsx'

const links = {
  landlord: [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/app/properties', label: 'Properties', icon: Building2 },
    { to: '/app/tenants', label: 'Tenants', icon: Users },
    { to: '/app/payments', label: 'Payments', icon: Wallet },
    { to: '/app/maintenance', label: 'Maintenance', icon: Wrench },
    { to: '/app/announcements', label: 'Announcements', icon: Megaphone },
    { to: '/app/reports', label: 'Reports', icon: BarChart3 },
    { to: '/app/settings', label: 'Settings', icon: Settings },
  ],
  manager: [
    { to: '/app', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/app/tenants', label: 'Tenants', icon: Users },
    { to: '/app/payments', label: 'Payments', icon: Wallet },
    { to: '/app/maintenance', label: 'Maintenance', icon: Wrench },
    { to: '/app/announcements', label: 'Announcements', icon: Megaphone },
  ],
  tenant: [
    { to: '/app', label: 'Dashboard', icon: Home, end: true },
    { to: '/app/my-rent', label: 'My Rent', icon: Wallet },
    { to: '/app/ledger', label: 'Rent Ledger', icon: BarChart3 },
    { to: '/app/my-issues', label: 'My Issues', icon: Wrench },
    { to: '/app/messages', label: 'Messages', icon: Megaphone },
  ],
}

export default function Layout() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const items = links[user.role] || links.landlord

  const logout = () => {
    setUser(null)
    navigate('/')
  }

  return (
    <div className="page-bg flex min-h-screen">
      <aside className="w-60 shrink-0 border-r border-navy-700/50 flex flex-col p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2 py-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white">RentFlow</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {items.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => 'sidebar-link' + (isActive ? ' active' : '')}>
              <l.icon className="w-4 h-4" />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-navy-700/50 pt-3 mt-3">
          <div className="flex items-center gap-2 px-2 mb-2">
            <Avatar name={user.name} />
            <div className="min-w-0">
              <div className="text-sm text-white truncate">{user.name}</div>
              <div className="text-xs text-slate-500 capitalize">{user.role}</div>
            </div>
          </div>
          <button onClick={logout} className="sidebar-link w-full text-red-400 hover:text-red-300">
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  )
}
