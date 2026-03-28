export function slugify(brideName, groomName, weddingDate) {
  const clean = (str) =>
    (str || '')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')

  const bride = clean(brideName).split('-')[0]
  const groom = clean(groomName).split('-')[0]
  const year = weddingDate ? weddingDate.slice(0, 4) : new Date().getFullYear()
  const rand = Math.random().toString(36).slice(2, 6)

  return `${bride}-${groom}-${year}-${rand}`
}
