import React, { createContext, useContext, useState } from 'react'
import { slugify } from '../utils/slugify'
import { createInvitation, uploadInvitationImage, uploadGalleryPhoto } from '../services/api'

const WeddingContext = createContext()

export const initialDetails = {
  eventName:          'Wedding Celebration',
  brideName:          'Priya Lakshmi',
  groomName:          'Arjun Krishnan',
  brideParents:       'Mr. & Mrs. Ramachandran',
  groomParents:       'Mr. & Mrs. Krishnaswamy',
  weddingDate:        '2025-02-14',
  weddingTime:        '10:30 AM',
  muhurtamTime:       '10:30 AM – 12:00 PM',
  venue:              'Sri Kapaleeshwarar Temple Hall',
  venueAddress:       'Mylapore, Chennai – 600 004',
  receptionDate:      '2025-02-14',
  receptionTime:      '7:00 PM',
  receptionVenue:     'Narada Gana Sabha',
  receptionAddress:   'T.T.K. Road, Chennai – 600 018',
  mehendi:            true,
  mehendiDate:        '2025-02-12',
  mehendiTime:        '4:00 PM',
  haldi:              true,
  haldiDate:          '2025-02-13',
  haldiTime:          '6:00 AM',
  rsvpName:           'Ramachandran',
  rsvpPhone:          '+91 98765 43210',
  rsvpEmail:          'priya.arjun2025@gmail.com',
  dressCode:          'Traditional Silk – Deep Reds & Greens',
  personalNote:       'With the blessings of our elders, we joyfully invite you to celebrate this sacred union.',
  selectedTemplate:   'south-indian-classic',
  // New fields for online invitation
  slug:               '',
  bridePhoto:         null,
  groomPhoto:         null,
  brideBio:           '',
  groomBio:           '',
  venueMapUrl:        '',
  venueDirectionsUrl: '',
  gallery:            [],  // [{ id, url, caption, file? }]
  isPublished:        false,
  publishedSlug:      '',
}

export function WeddingProvider({ children }) {
  const [details, setDetails]                   = useState(initialDetails)
  const [selectedTemplate, setSelectedTemplate] = useState('south-indian-classic')
  const [publishing, setPublishing]             = useState(false)
  const [publishError, setPublishError]         = useState(null)

  const updateDetails = (newDetails) => {
    setDetails(prev => ({ ...prev, ...newDetails }))
  }

  const addPhoto = (file) => {
    const url = URL.createObjectURL(file)
    const id  = `local-${Date.now()}-${Math.random().toString(36).slice(2)}`
    setDetails(prev => ({
      ...prev,
      gallery: [...prev.gallery, { id, url, caption: '', file }],
    }))
  }

  const removePhoto = (id) => {
    setDetails(prev => ({
      ...prev,
      gallery: prev.gallery.filter(p => p.id !== id),
    }))
  }

  const publishInvitation = async () => {
    setPublishing(true)
    setPublishError(null)

    const slug = slugify(details.brideName, details.groomName, details.weddingDate)

    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      // Dev mode: simulate publish
      await new Promise(r => setTimeout(r, 700))
      setDetails(prev => ({ ...prev, isPublished: true, publishedSlug: slug }))
      setPublishing(false)
      return slug
    }

    try {
      // Send only text fields — blob URLs and File objects can't be JSON-serialised
      const { bridePhoto, groomPhoto, bridePhotoFile, groomPhotoFile, gallery, ...textData } = details
      const payload = { ...textData, selectedTemplate, slug }
      await createInvitation(payload)

      // Upload bride/groom photos via multipart if files were selected
      if (bridePhotoFile) {
        await uploadInvitationImage(slug, 'bridePhoto', bridePhotoFile)
      }
      if (groomPhotoFile) {
        await uploadInvitationImage(slug, 'groomPhoto', groomPhotoFile)
      }

      // Upload gallery photos
      for (const photo of gallery) {
        if (photo.file) {
          const fd = new FormData()
          fd.append('photo', photo.file)
          if (photo.caption) fd.append('caption', photo.caption)
          await uploadGalleryPhoto(slug, fd)
        }
      }

      setDetails(prev => ({ ...prev, isPublished: true, publishedSlug: slug }))
      setPublishing(false)
      return slug
    } catch (err) {
      setPublishError(err.message)
      setPublishing(false)
      throw err
    }
  }

  return (
    <WeddingContext.Provider value={{
      details,
      updateDetails,
      selectedTemplate,
      setSelectedTemplate,
      addPhoto,
      removePhoto,
      publishInvitation,
      publishing,
      publishError,
    }}>
      {children}
    </WeddingContext.Provider>
  )
}

export function useWedding() {
  return useContext(WeddingContext)
}
