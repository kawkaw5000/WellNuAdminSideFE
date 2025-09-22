import { useState, useEffect } from 'react'
import { apiService, type User } from '../services/apiService'

export default function UserLogs() {
  const [users, setUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Fetch users from backend
  const fetchUsers = async (search?: string) => {
    try {
      setLoading(true)
      setError('')
      const response = await apiService.getUsers(search)
      
      if (response.users) {
        setUsers(response.users)
      } else {
        throw new Error('No users data received from backend')
      }
    } catch (err) {
      console.error('Failed to fetch users from backend:', err)
      setError(`Backend connection failed: ${err instanceof Error ? err.message : 'Unknown error'}. Make sure your backend server is running.`)
      // Only use mock data as absolute last resort
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        fetchUsers(searchTerm)
      } else {
        fetchUsers()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const toggleUserStatus = async (userId: number) => {
    try {
      await apiService.toggleUserStatus(userId)
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId 
            ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active', isActive: !user.isActive }
            : user
        )
      )
    } catch (err) {
      console.error('Failed to toggle user status:', err)
      alert('Failed to update user status. Please try again.')
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666' }} data-testid="users-loading">
        Loading users...
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: 'white', borderRadius: '8px', padding: '20px' }} data-testid="user-logs-container">
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 20px 0', fontSize: '24px', fontWeight: 'bold' }} data-testid="users-header">
          Users ({users.length})
        </h2>
        
        {error && (
          <div style={{
            backgroundColor: '#fff3cd',
            color: '#856404',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px',
            border: '1px solid #ffeaa7'
          }} data-testid="users-error">
            {error}
          </div>
        )}
        
        <div style={{ position: 'relative', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            data-testid="user-search-input"
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 40px 12px 16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <div style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
          }}>
            🔍
          </div>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
  <table style={{ width: '100%', borderCollapse: 'collapse' }} data-testid="users-table">
          <thead>
            <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Name</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Email</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Role</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Status</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Date created</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 'bold' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #dee2e6' }} data-testid={`user-row-${user.id}`}>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {user.name.charAt(0)}
                    </div>
                    {user.name}
                  </div>
                </td>
                <td style={{ padding: '12px', color: '#666' }}>{user.email}</td>
                <td style={{ padding: '12px' }}>{user.role}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    backgroundColor: user.status === 'Active' ? '#d4edda' : '#f8d7da',
                    color: user.status === 'Active' ? '#155724' : '#721c24'
                  }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '12px', color: '#666' }}>{user.dateCreated}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      style={{
                        padding: '6px 12px',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        backgroundColor: user.status === 'Active' ? '#dc3545' : '#28a745',
                        color: 'white'
                      }}
                      data-testid={`toggle-status-${user.id}`}
                    >
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button style={{
                      padding: '6px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      backgroundColor: '#ffc107',
                      color: 'white'
                    }}>
                      ▶
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && searchTerm && (
        <div style={{ textAlign: 'center', padding: '50px', color: '#666' }}>
          No users found matching "{searchTerm}"
        </div>
      )}
    </div>
  )
}
