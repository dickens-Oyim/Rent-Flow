import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { demoUsers, useAuth } from '../data.jsx'

const roles = [
  { key: 'landlord', label: 'Landlord', email: 'james@rentflow.co.ke' },
  { key: 'manager', label: 'Property Manager', email: 'grace@rentflow.co.ke' },
  { key: 'tenant', label: 'Tenant', email: 'kevin@email.com' },
]

export default function Login() {
  const [role, setRole] = useState('landlord')
  const [email, setEmail] = useState('james@rentflow.co.ke')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) return setError('Please enter your email and password.')
    if (password !== 'password') return setError('Invalid credentials. Demo password is: password')
    const user = demoUsers[role]
    if (user.email !== email) {
      const match = Object.values(demoUsers).find((u) => u.email === email)
      if (!match) return setError('No account found with that email.')
      setUser(match)
    } else {
      setUser(user)
    }
    navigate('/app')
  }

  return (
    <div className="page-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-xl">RentFlow</span>
        </Link>

        <div className="card p-8">
          <h1 className="text-xl font-bold text-white text-center">Welcome back</h1>
          <p className="text-sm text-slate-400 text-center mt-1">Sign in to your account</p>

          <div className="mt-6">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">I am signing in as</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => { setRole(r.key); setEmail(r.email) }}
                  className={'py-2 px-2 rounded-lg text-xs font-medium border transition ' +
                    (role === r.key
                      ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                      : 'bg-navy-800/60 border-navy-700/60 text-slate-400 hover:text-slate-200')}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Email address</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Password</label>
              <input className="input" type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" className="btn-primary w-full py-2.5 text-sm">Sign in</button>
          </form>

          <div className="mt-5 text-xs text-slate-500 bg-navy-800/50 rounded-lg p-3">
            <p className="text-slate-400 font-medium mb-1">Demo accounts (password: password)</p>
            <p>Landlord: james@rentflow.co.ke</p>
            <p>Property Manager: grace@rentflow.co.ke</p>
            <p>Tenant: kevin@email.com</p>
          </div>

          <p className="text-center text-sm text-slate-400 mt-5">
            Do not have an account? <Link to="/signup" className="text-emerald-400 hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
