import React from 'react'
import { motion } from 'framer-motion'

function buildMapsUrl(venue, address) {
  const query = encodeURIComponent(`${venue} ${address}`.trim())
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

function buildEmbedUrl(venueMapUrl, venue, address) {
  if (venueMapUrl) return venueMapUrl
  const query = encodeURIComponent(`${venue} ${address}`.trim())
  return `https://maps.google.com/maps?q=${query}&output=embed`
}

export default function VenueSection({ data }) {
  const embedUrl = buildEmbedUrl(data.venueMapUrl, data.venue, data.venueAddress)
  const directionsUrl = data.venueDirectionsUrl || buildMapsUrl(data.venue, data.venueAddress)

  return (
    <section className="inv-venue" id="venue">
      <div className="inv-section-inner">
        <motion.p
          className="inv-eyebrow"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          ✦ The Venue ✦
        </motion.p>

        <motion.h2
          className="inv-section-title"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {data.venue}
        </motion.h2>

        {data.venueAddress && (
          <motion.p
            className="inv-venue__address"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {data.venueAddress}
          </motion.p>
        )}

        <motion.div
          className="inv-venue__map-wrap"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <iframe
            title="Wedding Venue Map"
            src={embedUrl}
            className="inv-venue__map"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <motion.a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline inv-venue__directions-btn"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Get Directions →
        </motion.a>
      </div>
    </section>
  )
}
