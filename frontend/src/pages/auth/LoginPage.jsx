import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../../context/AuthContext'
import preweddingVideo from '../../assets/beautiful-moments-prewedding-traditional-prewedding-video-prewedding-concept-raw_2En1gief.mp4'
import './LoginPage.css'

export default function LoginPage() {
  const { login, register, isAuthenticated, loading, error, clearError } = useAuth()
  const navigate = useNavigate()

  const [tab,      setTab]      = useState('login')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [name,     setName]     = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [local,    setLocal]    = useState(null)
  const [showPass, setShowPass] = useState(false)
  const [showConf, setShowConf] = useState(false)

  React.useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true })
  }, [isAuthenticated, navigate])

  const switchTab = (t) => {
    setTab(t)
    setLocal(null)
    clearError()
    setPassword('')
    setConfirm('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocal(null)
    clearError()

    if (tab === 'register') {
      if (!name.trim())         return setLocal('Please enter your name.')
      if (password.length < 8)  return setLocal('Password must be at least 8 characters.')
      if (password !== confirm) return setLocal('Passwords do not match.')
      try { await register(email, password, name.trim()) } catch { /* shown from context */ }
    } else {
      try { await login(email, password) } catch { /* shown from context */ }
    }
  }

  const displayError = local || error

  return (
    <div className="auth-split">
      {/* Left video panel */}
      <div className="auth-split__left" aria-hidden="true">
        <video
          className="auth-split__video"
          src={preweddingVideo}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="auth-split__video-overlay" />
        <div className="auth-split__left-inner">
          <motion.div
            className="auth-split__logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <span className="auth-split__logo-sym">✦</span>
            <span className="auth-split__logo-text">eInvite</span>
          </motion.div>
          <motion.p
            className="auth-split__tagline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Beautiful wedding invitations,<br />shared with everyone you love.
          </motion.p>
          <motion.div
            className="auth-split__badge-row"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <span className="auth-split__badge">✿ Moments</span>
            <span className="auth-split__badge">★ Memories</span>
            <span className="auth-split__badge">♡ Love</span>
          </motion.div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-split__right">
        <motion.div
          className="auth-card"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* Mobile brand */}
          <div className="auth-card__mobile-brand">
            <span className="auth-card__mobile-brand-sym">✦</span>
            <span className="auth-card__mobile-brand-text">eInvite</span>
          </div>

          <h1 className="auth-card__heading">
            {tab === 'login' ? 'Welcome back' : 'Create account'}
          </h1>
          <p className="auth-card__sub">
            {tab === 'login'
              ? 'Sign in to manage your invitations'
              : 'Get started — it only takes a moment'}
          </p>

          {/* Tab pills */}
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === 'login' ? 'auth-tab--active' : ''}`}
              onClick={() => switchTab('login')}
              type="button"
            >Sign In</button>
            <button
              className={`auth-tab ${tab === 'register' ? 'auth-tab--active' : ''}`}
              onClick={() => switchTab('register')}
              type="button"
            >Create Account</button>
          </div>

          {/* Error */}
          <AnimatePresence>
            {displayError && (
              <motion.div
                className="auth-error"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                {displayError}
              </motion.div>
            )}
          </AnimatePresence>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <AnimatePresence mode="wait">
              {tab === 'register' && (
                <motion.div
                  key="name-field"
                  className="auth-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="auth-name">Your Name</label>
                  <input
                    id="auth-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Priya Ramachandran"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="auth-field">
              <label htmlFor="auth-email">Email Address</label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="auth-field auth-field--with-toggle">
              <label htmlFor="auth-password">Password</label>
              <div className="auth-field__input-wrap">
                <input
                  id="auth-password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete={tab === 'login' ? 'current-password' : 'new-password'}
                  placeholder={tab === 'register' ? 'Min. 8 characters' : '••••••••'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="auth-field__eye"
                  onClick={() => setShowPass(v => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                >
                  {showPass ? '🙈' : '👁'}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {tab === 'register' && (
                <motion.div
                  key="confirm-field"
                  className="auth-field auth-field--with-toggle"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="auth-confirm">Confirm Password</label>
                  <div className="auth-field__input-wrap">
                    <input
                      id="auth-confirm"
                      type={showConf ? 'text' : 'password'}
                      autoComplete="new-password"
                      placeholder="••••••••"
                      value={confirm}
                      onChange={e => setConfirm(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-field__eye"
                      onClick={() => setShowConf(v => !v)}
                      aria-label={showConf ? 'Hide password' : 'Show password'}
                    >
                      {showConf ? '🙈' : '👁'}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button className="auth-submit btn btn-primary" type="submit" disabled={loading}>
              {loading ? 'Please wait…' : tab === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="auth-card__switch">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="auth-card__switch-btn"
              onClick={() => switchTab(tab === 'login' ? 'register' : 'login')}
            >
              {tab === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
