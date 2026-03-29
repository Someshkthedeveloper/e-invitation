const BASE_URL = import.meta.env.VITE_API_URL || ''

function getToken() {
  return localStorage.getItem('einvite_token')
}

async function request(path, options = {}) {
  const token = getToken()
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {}
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeader, ...options.headers },
    ...options,
  })
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText)
    throw new Error(msg || `HTTP ${res.status}`)
  }
  return res.json()
}

// ---- Auth ----
export const loginUser    = (data) => request('/api/auth/login',    { method: 'POST', body: JSON.stringify(data) })
export const registerUser = (data) => request('/api/auth/register', { method: 'POST', body: JSON.stringify(data) })
export const logoutUser   = ()     => request('/api/auth/logout',   { method: 'POST' })

export const createInvitation = (data) =>
  request('/api/invitations', { method: 'POST', body: JSON.stringify(data) })

export const getInvitation = (slug) =>
  request(`/api/invitations/${slug}`)

export const updateInvitation = (slug, data) =>
  request(`/api/invitations/${slug}`, { method: 'PUT', body: JSON.stringify(data) })

export const submitRsvp = (slug, data) =>
  request(`/api/invitations/${slug}/rsvp`, { method: 'POST', body: JSON.stringify(data) })

export const getRsvps = (slug) =>
  request(`/api/invitations/${slug}/rsvp`)

export const uploadInvitationImage = (slug, key, file) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('key', key)
  return fetch(`${BASE_URL}/api/invitations/${slug}/upload-image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getToken()}` },
    body: formData,
  }).then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })
}

export const uploadGalleryPhoto = (slug, formData) =>
  fetch(`${BASE_URL}/api/invitations/${slug}/gallery`, { method: 'POST', body: formData })
    .then(res => { if (!res.ok) throw new Error(`HTTP ${res.status}`); return res.json() })

export const deleteGalleryPhoto = (slug, photoId) =>
  request(`/api/invitations/${slug}/gallery/${photoId}`, { method: 'DELETE' })

export const getUserInvitations = () =>
  request('/api/invitations')
