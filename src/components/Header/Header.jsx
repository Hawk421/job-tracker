import './Header.css'

function Header({
  onAddClick,
  onLogout,
}) {
  return (
    <header className="header">
      <div className="header__logo">
        Job Tracker
      </div>

      <div className="header__actions">
        <button
          className="header__button"
          onClick={onAddClick}
        >
          + Add vacancy
        </button>

        <button
          className="header__logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </header>
  )
}

export default Header