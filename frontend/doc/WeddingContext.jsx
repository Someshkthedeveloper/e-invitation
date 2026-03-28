import React, { createContext, useContext, useState } from 'react'

const WeddingContext = createContext()

export const initialDetails = {
  eventName: 'Shubha Vivah',
  brideName: 'Priya Lakshmi',
  groomName: 'Arjun Krishnan',
  brideParents: 'Mr. & Mrs. Ramachandran',
  groomParents: 'Mr. & Mrs. Krishnaswamy',
  weddingDate: '2025-02-14',
  weddingTime: '10:30 AM',
  muhurtamTime: '10:30 AM – 12:00 PM',
  venue: 'Sri Kapaleeshwarar Temple Hall',
  venueAddress: 'Mylapore, Chennai – 600 004',
  receptionDate: '2025-02-14',
  receptionTime: '7:00 PM',
  receptionVenue: 'Narada Gana Sabha',
  receptionAddress: 'T.T.K. Road, Chennai – 600 018',
  mehendi: true,
  mehendiDate: '2025-02-12',
  mehendiTime: '4:00 PM',
  haldi: true,
  haldiDate: '2025-02-13',
  haldiTime: '6:00 AM',
  rsvpName: 'Ramachandran',
  rsvpPhone: '+91 98765 43210',
  rsvpEmail: 'priya.arjun2025@gmail.com',
  dressCode: 'Traditional Silk – Deep Reds & Greens',
  personalNote: 'With the blessings of our elders, we joyfully invite you to celebrate this sacred union.',
  selectedTemplate: 'south-indian-classic',
}

export function WeddingProvider({ children }) {
  const [details, setDetails] = useState(initialDetails)
  const [selectedTemplate, setSelectedTemplate] = useState('south-indian-classic')

  const updateDetails = (newDetails) => {
    setDetails(prev => ({ ...prev, ...newDetails }))
  }

  return (
    <WeddingContext.Provider value={{ details, updateDetails, selectedTemplate, setSelectedTemplate }}>
      {children}
    </WeddingContext.Provider>
  )
}

export function useWedding() {
  return useContext(WeddingContext)
}
