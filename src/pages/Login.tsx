import { useState } from 'react'
import wellNuSideImage from '../assets/Rectangle 5946.svg'
import Logo from '../assets/WellNu Logo 2.svg'
import { apiService } from '../services/apiService'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Try backend authentication first
      const response = await apiService.adminLogin(username, password)
      
      // Store admin info in localStorage
      localStorage.setItem('adminUser', JSON.stringify({
        id: response.adminId,
        name: response.adminName,
        role: response.role
      }))
      
      // Redirect to dashboard
      window.location.href = '/dashboard'
    } catch (backendError) {
      // Fallback to dummy authentication if backend fails
      console.warn('Backend login failed, using dummy auth:', backendError)
      
      if (username === 'admin' && password === '123') {
        // Store dummy admin info
        localStorage.setItem('adminUser', JSON.stringify({
          id: 0,
          name: 'Admin User',
          role: 'Admin'
        }))
        
        window.location.href = '/dashboard'
      } else {
        setError('Invalid credentials. Use admin/123 or check if backend is running.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <div style={{ width: '50vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={Logo} alt='Logo' style={{ width: '200px', height: '200px', objectFit: 'contain' }} />
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "320px",
            gap: "1rem",
            padding: "2rem",
            margin: "0 auto",
            fontFamily: "Arial, sans-serif"
          }}
        >
          <label style={{ fontWeight: "bold", color: 'black' }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            data-testid="login-username"
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
              backgroundColor: "#fff",
              color: "#000"
            }}
          />

          <label style={{ fontWeight: "bold", color: 'black' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            data-testid="login-password"
            style={{
              padding: "0.8rem",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "1rem",
              backgroundColor: "#fff",
              color: "#000"
            }}
          />
          <button
            type="submit"
            disabled={loading}
            data-testid="login-submit"
            style={{
              backgroundColor: loading ? "#ccc" : "#ffb74d",
              border: "none",
              padding: "0.9rem",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "1rem"
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          
          {error && (
            <div style={{
              color: '#f44336',
              fontSize: '14px',
              textAlign: 'center',
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#ffebee',
              borderRadius: '4px'
            }}>
              {error}
            </div>
          )}
        </form>
      </div>
      <img src={wellNuSideImage} alt='Logo' style={{ width: '50vw', height: '100vh', objectFit: 'cover' }} />
    </div>
  );
}
