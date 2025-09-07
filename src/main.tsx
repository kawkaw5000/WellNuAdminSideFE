import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Reports from './pages/Reports'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'     
import 'primeicons/primeicons.css'
import UserLogs from './pages/UserLogs'
import UserRolePermission from './pages/UserRolePermission'
import Dashboard from './pages/Dashboard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/userlogs' element={<UserLogs />} />
        <Route path='/userPermissions' element={<UserRolePermission />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
