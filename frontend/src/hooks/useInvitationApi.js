import { useState, useEffect } from 'react'
import { getInvitation } from '../services/api'

const mockInvitation = {
  eventName: 'Wedding Celebration',
  brideName: 'Priya Lakshmi',
  groomName: 'Arjun Krishnan',
  brideParents: 'Mr. & Mrs. Ramachandran',
  groomParents: 'Mr. & Mrs. Krishnaswamy',
  weddingDate: '2026-11-14',
  weddingTime: '10:30 AM',
  muhurtamTime: '10:30 AM – 12:00 PM',
  venue: 'Sri Kapaleeshwarar Temple Hall',
  venueAddress: 'Mylapore, Chennai – 600 004',
  receptionDate: '2026-11-14',
  receptionTime: '7:00 PM',
  receptionVenue: 'Narada Gana Sabha',
  receptionAddress: 'T.T.K. Road, Chennai – 600 018',
  mehendi: true,
  mehendiDate: '2026-11-12',
  mehendiTime: '4:00 PM',
  haldi: true,
  haldiDate: '2026-11-13',
  haldiTime: '6:00 AM',
  rsvpName: 'Ramachandran',
  rsvpPhone: '+91 98765 43210',
  rsvpEmail: 'priya.arjun2026@gmail.com',
  dressCode: 'Traditional Silk – Deep Reds & Greens',
  personalNote: 'With the blessings of our elders, we joyfully invite you to celebrate this sacred union of two souls, two families, and two hearts.',
  selectedTemplate: 'south-indian-classic',
  slug: 'demo',
  bridePhoto: null,
  groomPhoto: null,
  brideBio: 'A lover of classical Carnatic music and the fragrance of jasmine, Priya brings warmth and grace to every moment she touches.',
  groomBio: 'A devoted soul with a passion for travel and photography, Arjun finds the divine in the beauty of simple everyday moments.',
  venueMapUrl: '',
  venueDirectionsUrl: '',
  gallery: [],
  isPublished: true,
  publishedSlug: 'demo',
}

export function useInvitationApi(slug) {
  const [data, setData]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!slug) return

    const apiUrl = import.meta.env.VITE_API_URL

    if (!apiUrl || slug === 'demo') {
      const id = setTimeout(() => {
        setData(mockInvitation)
        setLoading(false)
      }, 500)
      return () => clearTimeout(id)
    }

    setLoading(true)
    setError(null)
    getInvitation(slug)
      .then(inv => {
        // Normalize gallery: backend stores { base64 }, components expect { url }
        const normalized = {
          ...inv,
          gallery: (inv.gallery || []).map(p => ({ ...p, url: p.url || p.base64 }))
        }
        setData(normalized)
        setLoading(false)
      })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [slug])

  return { data, loading, error }
}
