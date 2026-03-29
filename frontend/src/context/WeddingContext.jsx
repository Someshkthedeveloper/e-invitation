import React, { createContext, useContext, useState } from 'react'
import { slugify } from '../utils/slugify'
import { createInvitation, uploadInvitationImage, uploadGalleryPhoto, uploadCoverVideo } from '../services/api'

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
  customEvents:       [],  // [{ id, icon, title, date, time, venue, address }]
  showRsvp:           false,
  coverVideoUrl:      '',
  coverVideoFile:     null,
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

    if (!import.meta.env.VITE_API_URL) {
      // Dev mode: simulate publish
      await new Promise(r => setTimeout(r, 700))
      setDetails(prev => ({ ...prev, isPublished: true, publishedSlug: slug }))
      setPublishing(false)
      return slug
    }

    // Destructure all non-serialisable fields up front
    const {
      bridePhoto, groomPhoto,
      bridePhotoFile, groomPhotoFile,
      gallery, coverVideoFile,
      ...textData
    } = details
    const payload = { ...textData, selectedTemplate, slug }

    // FATAL: create the invitation record — if this fails, abort with error
    try {
      await createInvitation(payload)
    } catch (err) {
      setPublishError(err.message)
      setPublishing(false)
      throw err
    }

    // NON-FATAL: bride/groom photos
    if (bridePhotoFile) {
      try {
        await uploadInvitationImage(slug, 'bridePhoto', bridePhotoFile)
      } catch (e) {
        console.warn('Bride photo upload failed (non-fatal):', e.message)
      }
    }
    if (groomPhotoFile) {
      try {
        await uploadInvitationImage(slug, 'groomPhoto', groomPhotoFile)
      } catch (e) {
        console.warn('Groom photo upload failed (non-fatal):', e.message)
      }
    }

    // NON-FATAL: gallery photos
    for (const photo of gallery) {
      if (photo.file) {
        try {
          const fd = new FormData()
          fd.append('photo', photo.file)
          if (photo.caption) fd.append('caption', photo.caption)
          await uploadGalleryPhoto(slug, fd)
        } catch (e) {
          console.warn(`Gallery photo ${photo.id} upload failed (non-fatal):`, e.message)
        }
      }
    }

    // NON-FATAL: cover video
    if (coverVideoFile) {
      try {
        const fd = new FormData()
        fd.append('video', coverVideoFile)
        await uploadCoverVideo(slug, fd)
      } catch (e) {
        console.warn('Cover video upload failed (non-fatal):', e.message)
      }
    }

    // Always succeed if invitation record was created
    setDetails(prev => ({ ...prev, isPublished: true, publishedSlug: slug }))
    setPublishing(false)
    return slug
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
