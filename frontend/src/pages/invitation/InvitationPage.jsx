import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useInvitationApi } from '../../hooks/useInvitationApi'
import LoadingSpinner from '../../components/shared/LoadingSpinner'
import InvitationNavbar from './InvitationNavbar'
import HeroSection from './sections/HeroSection'
import CountdownSection from './sections/CountdownSection'
import BrideGroomSection from './sections/BrideGroomSection'
import StorySection from './sections/StorySection'
import EventsSection from './sections/EventsSection'
import VenueSection from './sections/VenueSection'
import GallerySection from './sections/GallerySection'
import RSVPSection from './sections/RSVPSection'
import FooterSection from './sections/FooterSection'
import './InvitationPage.css'

export default function InvitationPage() {
  const { slug } = useParams()
  const { data, loading, error } = useInvitationApi(slug)

  useEffect(() => {
    const prev = document.documentElement.getAttribute('data-theme')
    document.documentElement.setAttribute('data-theme', 'light')
    return () => {
      document.documentElement.setAttribute('data-theme', prev || 'dark')
    }
  }, [])

  if (loading) {
    return (
      <div className="inv-loading-screen">
        <LoadingSpinner size={56} message="Preparing your invitation…" />
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="inv-error-screen">
        <div className="inv-error__om">✿</div>
        <h1>Invitation Not Found</h1>
        <p>{error || 'This invitation link may be invalid or has been removed.'}</p>
      </div>
    )
  }

  return (
    <div className="invitation-page">
      <InvitationNavbar brideName={data.brideName} groomName={data.groomName} />
      <HeroSection data={data} />
      <CountdownSection data={data} />
      <BrideGroomSection data={data} />
      <StorySection data={data} />
      <EventsSection data={data} />
      <VenueSection data={data} />
      <GallerySection data={data} />
      {data.showRsvp !== false && <RSVPSection data={data} />}
      <FooterSection data={data} />
    </div>
  )
}
