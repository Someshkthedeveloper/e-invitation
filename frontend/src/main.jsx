import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Apply stored theme or default to dark before first render
const storedTheme = localStorage.getItem('einvite_theme') || 'dark'
document.documentElement.setAttribute('data-theme', storedTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
