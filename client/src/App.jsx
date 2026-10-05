import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './data.jsx'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import LandlordDashboard from './pages/landlord/Dashboard.jsx'
import Properties from './pages/landlord/Properties.jsx'
import Tenants from './pages/landlord/Tenants.jsx'
import Payments from './pages/landlord/Payments.jsx'
import Maintenance from './pages/landlord/Maintenance.jsx'
import Announcements from './pages/landlord/Announcements.jsx'
import Reports from './pages/landlord/Reports.jsx'
import Settings from './pages/landlord/Settings.jsx'
import TenantDashboard from './pages/tenant/Dashboard.jsx'
import MyRent from './pages/tenant/MyRent.jsx'
import Ledger from './pages/tenant/Ledger.jsx'
import MyIssues from './pages/tenant/MyIssues.jsx'
import Messages from './pages/tenant/Messages.jsx'
import ManagerDashboard from './pages/manager/Dashboard.jsx'

function Protected() {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Layout />
}

function RoleDashboard() {
  const { user } = useAuth()
  if (user.role === 'tenant') return <TenantDashboard />
  if (user.role === 'manager') return <ManagerDashboard />
  return <LandlordDashboard />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/app" element={<Protected />}>
            <Route index element={<RoleDashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="tenants" element={<Tenants />} />
            <Route path="payments" element={<Payments />} />
            <Route path="maintenance" element={<Maintenance />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="my-rent" element={<MyRent />} />
            <Route path="ledger" element={<Ledger />} />
            <Route path="my-issues" element={<MyIssues />} />
            <Route path="messages" element={<Messages />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
