import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// ---------- mock data ----------
export const CURRENCY = 'KSh'

export const properties = [
  { id: 1, name: 'Riverside Apartments', address: 'Riverside Drive, Westlands', units: 12, occupied: 10, manager: 'Grace Wanjiru', revenue: 340000, image: '#1e3a5f' },
  { id: 2, name: 'Kilimani Heights', address: 'Ngong Road, Kilimani', units: 8, occupied: 7, manager: 'Grace Wanjiru', revenue: 275000, image: '#13253d' },
  { id: 3, name: 'Runda Villas', address: 'Runda Mhasibu, Runda', units: 4, occupied: 4, manager: 'David Ochieng', revenue: 520000, image: '#1e3a5f' },
]

export const tenants = [
  { id: 1, name: 'Kevin Otieno', unit: 'A-4', property: 'Riverside Apartments', rent: 32000, balance: 32000, due: '2026-02-05', status: 'overdue', phone: '0722 345 678', email: 'kevin@email.com', moveIn: '2024-03-10', leaseEnd: '2026-12-31' },
  { id: 2, name: 'Amina Mohamed', unit: 'B-2', property: 'Riverside Apartments', rent: 34000, balance: 0, due: '2026-02-05', status: 'paid', phone: '0733 456 789', email: 'amina@email.com', moveIn: '2023-01-05', leaseEnd: '2026-12-31' },
  { id: 3, name: 'David Mwangi', unit: 'C-7', property: 'Kilimani Heights', rent: 28000, balance: 0, due: '2026-02-10', status: 'paid', phone: '0711 876 543', email: 'david@email.com', moveIn: '2024-06-20', leaseEnd: '2026-12-31' },
  { id: 4, name: 'Janet Njeri', unit: 'K-1', property: 'Kilimani Heights', rent: 44000, balance: 44000, due: '2026-02-10', status: 'overdue', phone: '0744 210 987', email: 'janet@email.com', moveIn: '2022-09-01', leaseEnd: '2026-12-31' },
  { id: 5, name: 'Robert Kamau', unit: 'V-2', property: 'Runda Villas', rent: 130000, balance: 0, due: '2026-02-01', status: 'paid', phone: '0755 908 172', email: 'robert@email.com', moveIn: '2021-04-15', leaseEnd: '2026-12-31' },
  { id: 6, name: 'Selina Wambui', unit: 'A-9', property: 'Riverside Apartments', rent: 36000, balance: 36000, due: '2026-02-05', status: 'pending', phone: '0788 654 321', email: 'selina@email.com', moveIn: '2025-02-01', leaseEnd: '2026-12-31' },
]

export const payments = [
  { id: 1, tenant: 'Amina Mohamed', unit: 'B-2', amount: 34000, date: '2026-02-03', method: 'M-PESA', ref: 'QJ74XK9L2M', status: 'verified' },
  { id: 2, tenant: 'David Mwangi', unit: 'C-7', amount: 28000, date: '2026-02-08', method: 'M-PESA', ref: 'JK39LP2Q7X', status: 'verified' },
  { id: 3, tenant: 'Robert Kamau', unit: 'V-2', amount: 130000, date: '2026-01-31', method: 'Bank Transfer', ref: 'BT-88213', status: 'verified' },
  { id: 4, tenant: 'Selina Wambui', unit: 'A-9', amount: 36000, date: '2026-02-14', method: 'M-PESA', ref: 'QK82XN4P9L', status: 'awaiting' },
  { id: 5, tenant: 'Janet Njeri', unit: 'K-1', amount: 44000, date: '2026-02-15', method: 'M-PESA', ref: 'QL93XN5P8M', status: 'awaiting' },
]

export const issues = [
  { id: 1, title: 'Leaking kitchen tap', tenant: 'Kevin Otieno', unit: 'A-4', property: 'Riverside Apartments', priority: 'high', status: 'open', date: '2026-02-10', description: 'The tap under the sink has been leaking for two days.' },
  { id: 2, title: 'Water will be shut off', tenant: 'Amina Mohamed', unit: 'B-2', property: 'Riverside Apartments', priority: 'medium', status: 'in_progress', date: '2026-02-12', description: 'No water since morning in the bathroom.' },
  { id: 3, title: 'Broken window latch', tenant: 'Selina Wambui', unit: 'A-9', property: 'Riverside Apartments', priority: 'low', status: 'resolved', date: '2026-02-05', description: 'Window does not close properly.' },
]

export const announcements = [
  { id: 1, title: 'Water Maintenance Notice', body: 'Water will be shut off tomorrow from 9am to 4pm for repairs to the main pump. Please store water in advance.', date: '2026-02-13', property: 'Riverside Apartments' },
  { id: 2, title: 'Rent Collection Reminder', body: 'February rent is due by the 5th. Pay via M-PESA Paybill 522522, account is your unit number.', date: '2026-02-01', property: 'All Properties' },
]

export const ledger = [
  { id: 1, month: 'February 2026', rent: 32000, paid: 0, balance: 32000, status: 'overdue' },
  { id: 2, month: 'January 2026', rent: 32000, paid: 32000, balance: 0, status: 'paid' },
  { id: 3, month: 'December 2025', rent: 32000, paid: 32000, balance: 0, status: 'paid' },
  { id: 4, month: 'November 2025', rent: 32000, paid: 32000, balance: 0, status: 'paid' },
  { id: 5, month: 'October 2025', rent: 32000, paid: 32000, balance: 0, status: 'paid' },
]

export const tenantIssues = [
  { id: 1, title: 'Leaking kitchen tap', unit: 'A-4', priority: 'high', status: 'open', date: '2026-02-10', description: 'The tap under the sink has been leaking for two days.', response: '' },
  { id: 2, title: 'Broken window latch', unit: 'A-9', priority: 'low', status: 'resolved', date: '2026-02-05', description: 'Window does not close properly.', response: 'Fixed by maintenance team on 8th Feb.' },
]

export const tenantMessages = [
  { id: 1, from: 'management', text: 'Water will be shut off tomorrow from 9am to 4pm. Please store water in advance.', time: '9:02am', date: 'Today' },
  { id: 2, from: 'management', text: 'February rent is due by the 5th. You can pay via M-PESA Paybill 522522.', time: '8:30am', date: '1 Feb 2026' },
]

// ---------- auth ----------
export const demoUsers = {
  landlord: { name: 'James Mwangi', role: 'landlord', email: 'james@rentflow.co.ke' },
  manager: { name: 'Grace Wanjiru', role: 'manager', email: 'grace@rentflow.co.ke' },
  tenant: { name: 'Kevin Otieno', role: 'tenant', unit: 'A-4', property: 'Riverside Apartments' },
}

export const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('rentflow_user')
    return raw ? JSON.parse(raw) : null
  })

  useEffect(() => {
    if (user) localStorage.setItem('rentflow_user', JSON.stringify(user))
    else localStorage.removeItem('rentflow_user')
  }, [user])

  const value = useMemo(() => ({ user, setUser }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// ---------- helpers ----------
export const formatMoney = (n) =>
  CURRENCY + ' ' + Number(n).toLocaleString('en-KE')

export const statusVariant = (s) => {
  const map = {
    paid: 'badge-green', verified: 'badge-green', resolved: 'badge-green', available: 'badge-green',
    pending: 'badge-yellow', awaiting: 'badge-yellow', in_progress: 'badge-sky', overdue: 'badge-red',
    open: 'badge-orange', high: 'badge-red', medium: 'badge-yellow', low: 'badge-zinc',
    occupied: 'badge-sky', vacancy: 'badge-yellow',
  }
  return map[s] || 'badge-zinc'
}

export const statusLabel = (s) =>
  String(s).replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase())
