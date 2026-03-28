import { useState } from 'react'
import { submitRsvp } from '../services/api'

const initialForm = {
  name:       '',
  email:      '',
  attending:  '',
  guestCount: 1,
  mealPref:   '',
  message:    '',
}

export function useRsvpForm(slug) {
  const [form, setForm]     = useState(initialForm)
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [error, setError]   = useState(null)

  const setField = (key) => (value) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError(null)

    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl || slug === 'demo') {
      // Dev: simulate network delay
      await new Promise(r => setTimeout(r, 1000))
      setStatus('success')
      return
    }

    try {
      await submitRsvp(slug, form)
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError(err.message)
    }
  }

  return { form, setField, status, error, handleSubmit }
}
