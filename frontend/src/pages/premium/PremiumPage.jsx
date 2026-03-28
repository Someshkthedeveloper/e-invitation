import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useInvitationApi } from '../../hooks/useInvitationApi'
import '../../styles/premium.css'

import RevealScreen    from './RevealScreen'
import AudioPlayer     from './AudioPlayer'
import PremiumNavbar   from './PremiumNavbar'
import PremiumHero     from './sections/PremiumHero'
import PremiumCountdown from './sections/PremiumCountdown'
import PremiumCouple   from './sections/PremiumCouple'
import PremiumStory    from './sections/PremiumStory'
import PremiumEvents   from './sections/PremiumEvents'
import PremiumGallery  from './sections/PremiumGallery'
import PremiumVenue    from './sections/PremiumVenue'
import PremiumRsvp     from './sections/PremiumRsvp'
import PremiumFooter   from './sections/PremiumFooter'

export default function PremiumPage() {
  const { slug } = useParams()
  const { data, loading, error } = useInvitationApi(slug)
  const [revealed, setRevealed] = useState(false)

  if (loading) {
    return (
      <div className="premium-page min-h-screen flex items-center justify-center">
        <p
          className="animate-pulse"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.875rem',
            color: 'var(--color-gold)',
            letterSpacing: 'var(--tracking-loose)',
          }}
        >
          Loading…
        </p>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="premium-page min-h-screen flex flex-col items-center justify-center gap-4 px-8 text-center">
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', color: 'var(--color-gold)' }}>✦</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.875rem', color: 'var(--color-charcoal)' }}>
          Invitation Not Found
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-muted)' }}>
          {error || 'This link may be invalid.'}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Envelope reveal — shown until guest taps seal */}
      {!revealed && (
        <RevealScreen data={data} onReveal={() => setRevealed(true)} />
      )}

      {/* Main invitation */}
      <div className="premium-page" style={{ opacity: revealed ? 1 : 0, transition: 'opacity 0.6s' }}>
        <PremiumNavbar brideName={data.brideName} groomName={data.groomName} />
        <PremiumHero data={data} />
        <PremiumCountdown data={data} />
        <PremiumCouple data={data} />
        <PremiumStory data={data} />
        <PremiumEvents data={data} />
        <PremiumGallery data={data} />
        <PremiumVenue data={data} />
        <PremiumRsvp data={data} />
        <PremiumFooter data={data} />

        {/* Floating audio player — pass bgm url from data if available */}
        <AudioPlayer src={data.bgmUrl || null} />
      </div>
    </>
  )
}
