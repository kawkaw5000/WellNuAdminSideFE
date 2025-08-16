import { useState } from 'react'
import wellNuSideImage from '../assets/Rectangle 5946.svg'
import Logo from '../assets/WellNu Logo 2.svg'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Email:', email)
    console.log('Password:', password)
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
      <div style={{width: '50vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
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
          <label style={{ fontWeight: "bold", color: 'black' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
            style={{
              backgroundColor: "#ffb74d",
              border: "none",
              padding: "0.9rem",
              borderRadius: "6px",
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#fff",
              cursor: "pointer",
              marginTop: "1rem"
            }}
          >
            Login
          </button>

          <a
            href="#"
            style={{
              textAlign: "center",
              marginTop: "0.5rem",
              color: "#5c6bc0",
              fontWeight: "bold",
              fontSize: "0.9rem",
              textDecoration: "none"
            }}
          >
            Forgot password?
          </a>
        </form>

      </div>
      <img src={wellNuSideImage} alt='Logo' style={{ width: '50vw', height: '100vh', objectFit: 'cover' }} />
    </div>
  )
}
