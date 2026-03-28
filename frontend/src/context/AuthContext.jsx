import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { loginUser, registerUser, logoutUser } from '../services/api'

const AuthContext = createContext()

const TOKEN_KEY = 'einvite_token'
const USER_KEY  = 'einvite_user'

export function AuthProvider({ children }) {
  const [token, setToken]   = useState(() => localStorage.getItem(TOKEN_KEY))
  const [user,  setUser]    = useState(() => {
    try { return JSON.parse(localStorage.getItem(USER_KEY)) } catch { return null }
  })
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState(null)

  const isAuthenticated = Boolean(token && user)

  const persist = (tok, usr) => {
    localStorage.setItem(TOKEN_KEY, tok)
    localStorage.setItem(USER_KEY,  JSON.stringify(usr))
    setToken(tok)
    setUser(usr)
  }

  const clear = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    setToken(null)
    setUser(null)
  }

  const login = useCallback(async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const data = await loginUser({ email, password })
      persist(data.token, data.user)
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (email, password, name) => {
    setLoading(true)
    setError(null)
    try {
      const data = await registerUser({ email, password, name })
      persist(data.token, data.user)
      return data.user
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try { await logoutUser() } catch { /* ignore */ }
    clear()
  }, [])

  const clearError = () => setError(null)

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
