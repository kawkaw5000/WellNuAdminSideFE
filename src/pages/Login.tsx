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
            display: 'flex',
            flexDirection: 'column',
            width: '300px',
            gap: '1rem',
            padding: '2rem',
            }}
        >
            <h2 style={{ textAlign: 'center' }}>Login</h2>
            <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            />
            <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            <button type='submit'>Login</button>
        </form>
      </div>
      <img src={wellNuSideImage} alt='Logo' style={{ width: '50vw', height: '100vh', objectFit: 'cover' }} />
    </div>
  )
}
