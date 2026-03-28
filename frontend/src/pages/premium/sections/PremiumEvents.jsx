import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Heart, Calendar, Star } from 'lucide-react'
import { formatDate } from '../../../utils/formatDate'
import Reveal from '../Reveal'

const ICONS = [Clock, Heart, Calendar, Star]

function buildEvents(data) {
  const events = []

  if (data.mehendi) {
    events.push({
      key: 'mehendi',
      label: 'Pre-Wedding',
      title: 'Mehendi',
      date: data.mehendiDate,
      time: data.mehendiTime,
      venue: null,
      address: null,
    })
  }

  if (data.haldi) {
    events.push({
      key: 'haldi',
      label: 'Pre-Wedding',
      title: 'Haldi',
      date: data.haldiDate,
      time: data.haldiTime,
      venue: null,
      address: null,
    })
  }

  events.push({
    key: 'wedding',
    label: 'Main Ceremony',
    title: 'Wedding',
    date: data.weddingDate,
    time: data.weddingTime || data.muhurtamTime,
    venue: data.venue,
    address: data.venueAddress,
  })

  if (data.receptionDate) {
    events.push({
      key: 'reception',
      label: 'Celebration',
      title: 'Reception',
      date: data.receptionDate,
      time: data.receptionTime,
      venue: data.receptionVenue,
      address: data.receptionAddress,
    })
  }

  return events
}

function TimelineItem({ event, index, Icon }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isLeft = index % 2 === 0

  return (
    <div
      ref={ref}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2.5rem 1fr',
        alignItems: 'start',
        gap: 0,
        marginBottom: '2.5rem',
      }}
    >
      {/* Left content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          paddingRight: '2rem',
          textAlign: 'right',
          ...(isLeft ? {} : { opacity: 0, pointerEvents: 'none' }),
        }}
      >
        {isLeft && <EventCard event={event} />}
      </motion.div>

      {/* Center dot */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        position: 'relative',
      }}>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
          style={{
            width: '2.5rem', height: '2.5rem',
            borderRadius: '9999px',
            background: 'rgba(197,160,89,0.1)',
            border: '1px solid rgba(197,160,89,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--color-gold)',
            zIndex: 1,
          }}
        >
          <Icon size={14} />
        </motion.div>
      </div>

      {/* Right content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          paddingLeft: '2rem',
          textAlign: 'left',
          ...(!isLeft ? {} : { opacity: 0, pointerEvents: 'none' }),
        }}
      >
        {!isLeft && <EventCard event={event} />}
      </motion.div>
    </div>
  )
}

function EventCard({ event }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', paddingTop: '0.4rem' }}>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.58rem',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color: 'var(--color-gold)',
        margin: 0,
      }}>
        {event.label}
      </p>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
        fontWeight: 400,
        color: 'var(--color-charcoal)',
        margin: 0,
      }}>
        {event.title}
      </h3>
      {event.date && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          color: 'var(--color-charcoal)',
          margin: 0,
        }}>
          {formatDate(event.date)}
        </p>
      )}
      {event.time && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          color: 'var(--color-muted)',
          margin: 0,
        }}>
          {event.time}
        </p>
      )}
      {event.venue && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--color-muted)',
          lineHeight: 1.5,
          margin: 0,
        }}>
          {event.venue}
          {event.address && <><br />{event.address}</>}
        </p>
      )}
    </div>
  )
}

export default function PremiumEvents({ data }) {
  const events = buildEvents(data)
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-100px' })

  return (
    <section
      id="events"
      style={{
        padding: '6rem 1.5rem 9rem',
        background: 'var(--color-ivory)',
      }}
    >
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        {/* Header */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-gold)',
              marginBottom: '0.75rem',
            }}>
              Our Celebrations
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 5vw, 2.75rem)',
              fontWeight: 400,
              color: 'var(--color-charcoal)',
              margin: '0 0 1rem',
            }}>
              Programme of Events
            </h2>
            <div style={{ width: '4rem', height: '1px', background: 'var(--color-gold)', margin: '0 auto' }} />
          </div>
        </Reveal>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div
            ref={lineRef}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0, bottom: 0,
              width: '1px',
              transform: 'translateX(-50%)',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                width: '100%', height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(197,160,89,0.4) 10%, rgba(197,160,89,0.4) 90%, transparent)',
                transformOrigin: 'top',
              }}
            />
          </div>

          {events.map((event, i) => {
            const Icon = ICONS[i % ICONS.length]
            return <TimelineItem key={event.key} event={event} index={i} Icon={Icon} />
          })}
        </div>
      </div>
    </section>
  )
}
