import { useState, useEffect } from 'react'
import Logo from '../assets/WellNu Logo 2.svg'
import UserLogs from './UserLogs'
import LogsAndReports from './LogsAndReports'

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
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Left Sidebar */}
      <div style={{
        width: '300px',
        backgroundColor: '#4a4a4a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <img src={Logo} alt='WellNu Logo' style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
        </div>

        {/* Navigation Buttons */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => setActiveTab('User logs')}
            style={{
              backgroundColor: activeTab === 'User logs' ? '#333' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              textAlign: 'left'
            }}
          >
            User logs
          </button>
          <button
            onClick={() => setActiveTab('Logs & Reports')}
            style={{
              backgroundColor: activeTab === 'Logs & Reports' ? '#333' : 'transparent',
              color: 'white',
              border: 'none',
              padding: '15px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              textAlign: 'left'
            }}
          >
            Logs & Reports
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#ff5722',
            color: 'white',
            border: 'none',
            padding: '15px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '5px',
            marginTop: '20px'
          }}
        >
          Log out
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderBottom: '1px solid #ddd',
          display: 'flex',
          alignItems: 'center',
          gap: '15px'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#ff9800',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '18px'
          }}>
            {adminUser.name.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)}
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>{adminUser.name}</div>
            <div style={{ color: '#666', fontSize: '14px' }}>{adminUser.role}</div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '20px' }}>
          {activeTab === 'User logs' && <UserLogs />}
          {activeTab === 'Logs & Reports' && <LogsAndReports />}
        </div>
      </div>
    </div>
  )
}
