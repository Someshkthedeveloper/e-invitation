import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isCreate  = location.pathname.startsWith('/create')
  const isPreview = location.pathname.startsWith('/preview')

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <Link to="/dashboard" className="navbar__brand">
        <span className="navbar__brand-symbol">✦</span>
        <span className="navbar__brand-text">eInvite</span>
      </Link>

      <div className="navbar__actions">
        {(isCreate || isPreview) && (
          <Link to="/dashboard" className="navbar__back-link">
            ← Dashboard
          </Link>
        )}

        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className={`navbar__dash-btn ${location.pathname === '/dashboard' ? 'navbar__dash-btn--active' : ''}`}
            >
              My Invitations
            </Link>
            <Link to="/create" className="navbar__create-btn">
              + New
            </Link>
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <div className="navbar__user">
              <span className="navbar__user-avatar" aria-hidden="true">
                {(user?.name || user?.email || '?')[0].toUpperCase()}
              </span>
              <span className="navbar__user-name">{user?.name || user?.email}</span>
              <button className="navbar__logout-btn" onClick={handleLogout} type="button">
                Sign out
              </button>
            </div>
          </>
        ) : (
          <>
            <button
              className="navbar__theme-btn"
              onClick={toggleTheme}
              type="button"
              aria-label="Toggle theme"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? '☀' : '☾'}
            </button>
            <Link to="/login" className="navbar__create-btn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
