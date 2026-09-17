import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav className="sidebar__nav">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'sidebar__link sidebar__link--active'
              : 'sidebar__link'
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) =>
            isActive
              ? 'sidebar__link sidebar__link--active'
              : 'sidebar__link'
          }
        >
          Applications
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive
              ? 'sidebar__link sidebar__link--active'
              : 'sidebar__link'
          }
        >
          Statistics
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive
              ? 'sidebar__link sidebar__link--active'
              : 'sidebar__link'
          }
        >
          Settings
        </NavLink>
      </nav>
    </aside>
  )
}

export default Sidebar