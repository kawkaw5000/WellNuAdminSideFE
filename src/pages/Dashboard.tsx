import { useState, useEffect } from 'react'
import Logo from '../assets/WellNu Logo 2.svg'
import UserLogs from './UserLogs'
import LogsAndReports from './LogsAndReports'
import './Dashboard.css'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('User logs')
  const [adminUser, setAdminUser] = useState({ name: 'Admin User', role: 'Admin' })

  useEffect(() => {
    // Get admin user info from localStorage
    const storedAdmin = localStorage.getItem('adminUser')
    if (storedAdmin) {
      try {
        const adminData = JSON.parse(storedAdmin)
        setAdminUser(adminData)
      } catch (err) {
        console.error('Failed to parse admin user data:', err)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminUser')
    window.location.href = '/'
  }

  return (
    <div className="dashboard-root">
      {/* Left Sidebar */}
      <aside className="dashboard-sidebar" data-testid="dashboard-sidebar">
        {/* Logo */}
        <div className="dashboard-logo-wrapper">
          <img src={Logo} alt='WellNu Logo' className="dashboard-logo" />
        </div>

        {/* Navigation Buttons */}
        <div className="dashboard-nav">
          <button
            onClick={() => setActiveTab('User logs')}
            className={`dashboard-nav-btn ${activeTab === 'User logs' ? 'active' : ''}`}
          >
            User logs
          </button>
          <button
            onClick={() => setActiveTab('Logs & Reports')}
            className={`dashboard-nav-btn ${activeTab === 'Logs & Reports' ? 'active' : ''}`}
          >
            Logs & Reports
          </button>
        </div>

        {/* Logout Button */}
        <button onClick={handleLogout} className="dashboard-logout-btn" data-testid="logout-btn">
          Log out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-avatar">
            {adminUser.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
          </div>
          <div className="dashboard-user-meta">
            <div className="dashboard-user-name">{adminUser.name}</div>
            <div className="dashboard-user-role">{adminUser.role}</div>
          </div>
        </div>

        {/* Content */}
        <div className="dashboard-content">
          {activeTab === 'User logs' && <UserLogs />}
          {activeTab === 'Logs & Reports' && <LogsAndReports />}
        </div>
      </main>
    </div>
  )
}
