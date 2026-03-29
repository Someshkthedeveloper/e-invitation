import React from 'react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { WeddingProvider } from './context/WeddingContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import LoginPage from './pages/auth/LoginPage'
import CreatePage from './pages/create/CreatePage'
import InvitationPage from './pages/invitation/InvitationPage'
import PremiumPage from './pages/premium/PremiumPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import RSVPDashboard from './pages/dashboard/RSVPDashboard'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/dashboard/:slug/rsvps" element={<ProtectedRoute><RSVPDashboard /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
      </Routes>
    </AnimatePresence>
  )
}

function CreatorApp() {
  return (
    <WeddingProvider>
      <Navbar />
      <AnimatedRoutes />
    </WeddingProvider>
  )
}

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public guest pages — no creator Navbar */}
          <Route path="/invitation/:slug" element={<InvitationPage />} />
          <Route path="/w/:slug" element={<PremiumPage />} />
          {/* Creator / admin routes */}
          <Route path="/*" element={<CreatorApp />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    </ThemeProvider>
  )
}
