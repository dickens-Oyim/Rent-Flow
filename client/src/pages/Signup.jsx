import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { demoUsers, useAuth } from '../data.jsx'

const roles = [
  { key: 'landlord', label: 'Landlord', body: 'I own rental property' },
  { key: 'manager', label: 'Property Manager', body: 'I manage property for a landlord' },
  { key: 'tenant', label: 'Tenant', body: 'I rent a unit' },
]

export default function Signup() {
  const [role, setRole] = useState('landlord')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useAuth()
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!name || !email || !password) return setError('Please fill in all fields.')
    setUser({ ...demoUsers[role], name, email, phone })
    navigate('/app')
  }

  return (
    <div className="page-bg min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-white text-xl">RentFlow</span>
        </Link>

        <div className="card p-8">
          <h1 className="text-xl font-bold text-white text-center">Create your account</h1>
          <p className="text-sm text-slate-400 text-center mt-1">Join RentFlow today</p>

          <div className="mt-6 space-y-2">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => setRole(r.key)}
                className={'w-full text-left p-3 rounded-lg border transition ' +
                  (role === r.key
                    ? 'bg-emerald-500/15 border-emerald-500/40'
                    : 'bg-navy-800/60 border-navy-700/60 hover:border-navy-700')}
              >
                <div className={'text-sm font-medium ' + (role === r.key ? 'text-emerald-300' : 'text-slate-200')}>{r.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{r.body}</div>
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Full name</label>
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Njeri" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Email address</label>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jane@example.com" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Phone number</label>
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="07XX XXX XXX" />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1.5">Password</label>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className="text-xs text-red-400">{error}</p>}
            <button type="submit" className="btn-primary w-full py-2.5 text-sm">Create account</button>
          </form>

          <p className="text-center text-sm text-slate-400 mt-5">
            Already have an account? <Link to="/login" className="text-emerald-400 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
