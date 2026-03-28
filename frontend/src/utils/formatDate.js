export function formatDate(dateStr, options = {}) {
  if (!dateStr) return '—'
  try {
    const d = new Date(dateStr + 'T00:00:00')
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      ...options,
    })
  } catch {
    return dateStr
  }
}

export function formatDateShort(dateStr) {
  return formatDate(dateStr, { month: 'short' })
}
