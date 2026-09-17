import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Header from '../Header/Header'
import Sidebar from '../Sidebar/Sidebar'

import './AppLayout.css'

function AppLayout({ onAddClick }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <Header
        onAddClick={onAddClick}
        onLogout={handleLogout}
      />

      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AppLayout