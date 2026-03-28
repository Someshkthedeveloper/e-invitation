export async function shareInvitation({ title, text, url }) {
  if (navigator.share) {
    try {
      await navigator.share({ title, text, url })
      return { method: 'native' }
    } catch (err) {
      if (err.name === 'AbortError') return { method: 'aborted' }
    }
  }
  return copyToClipboard(url)
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text)
    return { method: 'clipboard', success: true }
  } catch {
    // Fallback for older browsers
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity = '0'
    document.body.appendChild(el)
    el.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(el)
    return { method: 'execCommand', success: ok }
  }
}
