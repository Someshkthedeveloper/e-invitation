import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useWedding } from '../../context/WeddingContext'
import SouthIndianClassic from '../../components/SouthIndianClassic'
import SouthIndianLotus from '../../components/SouthIndianLotus'
import SouthIndianModern from '../../components/SouthIndianModern'
import LivePreviewModal from '../invitation/LivePreviewModal'
import defaultCoverVideo from '../../assets/video edit.mp4'
import './CreatePage.css'

/* ---- Shared mini components ---- */
function Field({ label, id, type = 'text', value, onChange, placeholder, required }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}{required && <span className="field__req">*</span>}</label>
      {type === 'textarea' ? (
        <textarea id={id} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3} />
      ) : (
        <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </div>
  )
}

function Toggle({ label, id, checked, onChange }) {
  return (
    <div className="toggle-field">
      <label htmlFor={id}>{label}</label>
      <button className={`toggle ${checked ? 'toggle--on' : ''}`} id={id} type="button" onClick={() => onChange(!checked)} aria-pressed={checked}>
        <span className="toggle__thumb" />
      </button>
    </div>
  )
}

/* ---- Template definitions ---- */
const templates = [
  {
    id: 'south-indian-classic',
    name: 'Kanchipuram Classic',
    style: 'Traditional Silk Aesthetic',
    colors: ['#8B1A1A', '#C9953A', '#FAF6EF'],
    badge: 'Popular',
    desc: 'Deep crimson & gold with ornamental patterns and silk-weave borders.',
    Component: SouthIndianClassic,
  },
  {
    id: 'south-indian-lotus',
    name: 'Lotus Bloom',
    style: 'Floral Temple Aesthetic',
    colors: ['#6B3A6E', '#C9953A', '#FBF0FF'],
    badge: 'Elegant',
    desc: 'Royal purple & gold with animated lotus motifs and floral borders.',
    Component: SouthIndianLotus,
  },
  {
    id: 'south-indian-modern',
    name: 'Modern Pattam',
    style: 'Contemporary Geometric',
    colors: ['#1A3A5C', '#C9953A', '#FFFFFF'],
    badge: 'Modern',
    desc: 'Navy & gold two-column layout with geometric accents.',
    Component: SouthIndianModern,
  },
]

/* ---- Step titles ---- */
const STEP_LABELS = [
  'Events', 'Couple', 'Pre-Wedding', 'Gallery', 'RSVP', 'Template',
]
const TOTAL_STEPS = STEP_LABELS.length

/* ---- Page transition variants ---- */
const pageVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

const CUSTOM_EVENT_ICONS = ['🌸', '🎊', '🙏', '🎶', '✨', '★']

export default function CreatePage() {
  const { details, updateDetails, addPhoto, removePhoto, selectedTemplate, setSelectedTemplate, publishInvitation, publishing, publishError } = useWedding()

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [preview, setPreview] = useState(null) // { templateId, templateName }
  const [published, setPublished] = useState(false)
  const [publishedSlug, setPublishedSlug] = useState('')
  const [copied, setCopied] = useState(false)
  const [coverVideoPreviewUrl, setCoverVideoPreviewUrl] = useState(null)
  const galleryRef = useRef(null)

  const set = (key) => (val) => updateDetails({ [key]: val })

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePhotoUpload = (e, key) => {
    const file = e.target.files?.[0]
    if (!file) return
    updateDetails({ [key]: URL.createObjectURL(file), [`${key}File`]: file })
  }

  const handleGalleryAdd = (e) => {
    Array.from(e.target.files || []).forEach(f => addPhoto(f))
    e.target.value = ''
  }

  const handleCoverVideoUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverVideoPreviewUrl(URL.createObjectURL(file))
    updateDetails({ coverVideoFile: file })
  }

  const openPreview = (tpl) => {
    setSelectedTemplate(tpl.id)
    setPreview({ templateId: tpl.id, templateName: tpl.name })
  }

  const closePreview = () => setPreview(null)

  const selectTemplate = () => {
    setPreview(null)
  }

  const handlePublish = async () => {
    try {
      const slug = await publishInvitation()
      setPublishedSlug(slug)
      setPublished(true)
    } catch (err) {
      console.error('Publish failed:', err.message)
      // publishError is already set in context and displayed in step 6
    }
  }

  const handleCopy = () => {
    const url = `${window.location.origin}/invitation/${publishedSlug}`
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const addCustomEvent = () => {
    const id = `ce-${Date.now()}-${Math.random().toString(36).slice(2)}`
    updateDetails({ customEvents: [...(details.customEvents || []), { id, icon: '🌸', title: '', date: '', time: '', venue: '', address: '' }] })
  }

  const updateCustomEvent = (id, field, value) => {
    updateDetails({
      customEvents: (details.customEvents || []).map(ev => ev.id === id ? { ...ev, [field]: value } : ev)
    })
  }

  const removeCustomEvent = (id) => {
    updateDetails({ customEvents: (details.customEvents || []).filter(ev => ev.id !== id) })
  }

  /* ---- Step content ---- */
  const renderStep = () => {
    switch (step) {
      case 1: return (
        <div className="create-step">
          <h2 className="create-step__title">Events</h2>
          <p className="create-step__subtitle">Wedding ceremony and reception details</p>

          <div className="create-step__section-label">✿ Wedding Ceremony</div>
          <div className="field-grid field-grid--2">
            <Field label="Event Name" id="eventName" value={details.eventName} onChange={set('eventName')} placeholder="Wedding Celebration" required />
            <Field label="Wedding Date" id="weddingDate" type="date" value={details.weddingDate} onChange={set('weddingDate')} required />
            <Field label="Auspicious Time" id="muhurtamTime" value={details.muhurtamTime} onChange={set('muhurtamTime')} placeholder="10:30 AM – 12:00 PM" />
            <Field label="Wedding Time" id="weddingTime" value={details.weddingTime} onChange={set('weddingTime')} placeholder="10:30 AM" />
          </div>
          <div className="field-grid field-grid--2">
            <Field label="Venue Name" id="venue" value={details.venue} onChange={set('venue')} placeholder="Sri Kapaleeshwarar Temple Hall" />
            <Field label="Venue Address" id="venueAddress" value={details.venueAddress} onChange={set('venueAddress')} placeholder="Mylapore, Chennai" />
          </div>

          <div className="create-step__divider" />
          <div className="create-step__section-label">★ Reception</div>
          <div className="field-grid field-grid--2">
            <Field label="Reception Date" id="receptionDate" type="date" value={details.receptionDate} onChange={set('receptionDate')} />
            <Field label="Reception Time" id="receptionTime" value={details.receptionTime} onChange={set('receptionTime')} placeholder="7:00 PM" />
            <Field label="Reception Venue" id="receptionVenue" value={details.receptionVenue} onChange={set('receptionVenue')} placeholder="Narada Gana Sabha" />
            <Field label="Reception Address" id="receptionAddress" value={details.receptionAddress} onChange={set('receptionAddress')} placeholder="T.T.K Road, Chennai" />
          </div>

          <div className="create-step__divider" />
          <div className="create-step__section-label">Cover Video</div>
          <p className="cover-video-hint">
            The hero section plays a looping video background. Leave blank to use the built-in default video.
          </p>
          <div className="field">
            <label htmlFor="coverVideoFile">Custom Video (optional)</label>
            <input
              id="coverVideoFile"
              type="file"
              accept="video/*"
              onChange={handleCoverVideoUpload}
            />
          </div>
          <div className="cover-video-preview">
            <video
              key={coverVideoPreviewUrl || 'default'}
              src={coverVideoPreviewUrl || defaultCoverVideo}
              muted
              loop
              autoPlay
              playsInline
              className="cover-video-preview__video"
            />
            <div className="cover-video-preview__label">Preview · muted</div>
          </div>
        </div>
      )

      case 2: return (
        <div className="create-step">
          <h2 className="create-step__title">Bride &amp; Groom</h2>
          <p className="create-step__subtitle">Names, parents, bios and photos</p>
          <div className="field-grid field-grid--2">
            <Field label="Bride's Full Name" id="brideName" value={details.brideName} onChange={set('brideName')} placeholder="Priya Lakshmi" required />
            <Field label="Groom's Full Name" id="groomName" value={details.groomName} onChange={set('groomName')} placeholder="Arjun Krishnan" required />
            <Field label="Bride's Parents" id="brideParents" value={details.brideParents} onChange={set('brideParents')} placeholder="Mr. & Mrs. Ramachandran" />
            <Field label="Groom's Parents" id="groomParents" value={details.groomParents} onChange={set('groomParents')} placeholder="Mr. & Mrs. Krishnaswamy" />
          </div>
          <div className="field-grid field-grid--2">
            <Field label="Bride's Bio" id="brideBio" type="textarea" value={details.brideBio} onChange={set('brideBio')} placeholder="A short description about the bride…" />
            <Field label="Groom's Bio" id="groomBio" type="textarea" value={details.groomBio} onChange={set('groomBio')} placeholder="A short description about the groom…" />
          </div>
          <div className="field-grid field-grid--2">
            <div className="field">
              <label>Bride's Photo</label>
              {details.bridePhoto && <img src={details.bridePhoto} alt="Bride" className="photo-thumb" />}
              <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 'bridePhoto')} />
            </div>
            <div className="field">
              <label>Groom's Photo</label>
              {details.groomPhoto && <img src={details.groomPhoto} alt="Groom" className="photo-thumb" />}
              <input type="file" accept="image/*" onChange={e => handlePhotoUpload(e, 'groomPhoto')} />
            </div>
          </div>
        </div>
      )

      case 3: return (
        <div className="create-step">
          <h2 className="create-step__title">Pre-Wedding Events</h2>
          <p className="create-step__subtitle">Toggle to add Mehendi and Haldi ceremonies, or add custom events</p>
          <div className="toggle-row">
            <Toggle label="Henna Ceremony" id="mehendi" checked={details.mehendi} onChange={set('mehendi')} />
            <Toggle label="Turmeric Ceremony" id="haldi" checked={details.haldi} onChange={set('haldi')} />
          </div>
          <AnimatePresence>
            {details.mehendi && (
              <motion.div className="field-grid field-grid--2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <Field label="Mehendi Date" id="mehendiDate" type="date" value={details.mehendiDate} onChange={set('mehendiDate')} />
                <Field label="Mehendi Time" id="mehendiTime" value={details.mehendiTime} onChange={set('mehendiTime')} placeholder="4:00 PM" />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {details.haldi && (
              <motion.div className="field-grid field-grid--2" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                <Field label="Haldi Date" id="haldiDate" type="date" value={details.haldiDate} onChange={set('haldiDate')} />
                <Field label="Haldi Time" id="haldiTime" value={details.haldiTime} onChange={set('haldiTime')} placeholder="6:00 AM" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="create-step__divider" />
          <div className="create-step__section-label">✦ Custom Events</div>

          <AnimatePresence>
            {(details.customEvents || []).map((ev, idx) => (
              <motion.div
                key={ev.id}
                className="custom-event-card"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <div className="custom-event-card__header">
                  <div className="custom-event-card__icon-picker">
                    {CUSTOM_EVENT_ICONS.map(icon => (
                      <button
                        key={icon}
                        type="button"
                        className={`custom-event-card__icon-btn ${ev.icon === icon ? 'is-active' : ''}`}
                        onClick={() => updateCustomEvent(ev.id, 'icon', icon)}
                      >{icon}</button>
                    ))}
                  </div>
                  <button type="button" className="custom-event-card__remove" onClick={() => removeCustomEvent(ev.id)} aria-label="Remove event">✕</button>
                </div>
                <div className="field-grid field-grid--2">
                  <Field label="Event Title" id={`ce-title-${ev.id}`} value={ev.title} onChange={v => updateCustomEvent(ev.id, 'title', v)} placeholder="e.g. Sangeet Night" />
                  <Field label="Date" id={`ce-date-${ev.id}`} type="date" value={ev.date} onChange={v => updateCustomEvent(ev.id, 'date', v)} />
                  <Field label="Time" id={`ce-time-${ev.id}`} value={ev.time} onChange={v => updateCustomEvent(ev.id, 'time', v)} placeholder="6:00 PM" />
                  <Field label="Venue" id={`ce-venue-${ev.id}`} value={ev.venue} onChange={v => updateCustomEvent(ev.id, 'venue', v)} placeholder="Venue name" />
                  <Field label="Address" id={`ce-address-${ev.id}`} value={ev.address} onChange={v => updateCustomEvent(ev.id, 'address', v)} placeholder="Full address" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button type="button" className="custom-event-add-btn" onClick={addCustomEvent}>
            ＋ Add Custom Event
          </button>
        </div>
      )

      case 4: return (
        <div className="create-step">
          <h2 className="create-step__title">Gallery &amp; Venue Map</h2>
          <p className="create-step__subtitle">Add photos and a Google Maps link for the online invitation</p>
          <div className="field-grid field-grid--2">
            <Field label="Google Maps Embed URL" id="venueMapUrl" value={details.venueMapUrl} onChange={set('venueMapUrl')} placeholder="https://maps.google.com/maps?q=…&output=embed" />
            <Field label="Directions Link" id="venueDirectionsUrl" value={details.venueDirectionsUrl} onChange={set('venueDirectionsUrl')} placeholder="https://maps.google.com/maps?q=…" />
          </div>
          <div className="field" style={{ marginTop: 8 }}>
            <label>Add Photos</label>
            <input ref={galleryRef} type="file" accept="image/*" multiple onChange={handleGalleryAdd} />
          </div>
          {details.gallery.length > 0 && (
            <div className="gallery-preview">
              {details.gallery.map(photo => (
                <div key={photo.id} className="gallery-preview__item">
                  <img src={photo.url} alt={photo.caption || 'Gallery'} />
                  <button type="button" className="gallery-preview__remove" onClick={() => removePhoto(photo.id)} aria-label="Remove">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )

      case 5: return (
        <div className="create-step">
          <h2 className="create-step__title">RSVP &amp; Extras</h2>
          <p className="create-step__subtitle">Contact info, dress code, and a personal message</p>
          <div className="toggle-row" style={{ marginBottom: '4px' }}>
            <Toggle label="Show RSVP Form on Invitation" id="showRsvp" checked={details.showRsvp !== false} onChange={set('showRsvp')} />
          </div>
          <div className="field-grid field-grid--3">
            <Field label="RSVP Contact Name" id="rsvpName" value={details.rsvpName} onChange={set('rsvpName')} placeholder="Ramachandran" />
            <Field label="RSVP Phone" id="rsvpPhone" value={details.rsvpPhone} onChange={set('rsvpPhone')} placeholder="+91 98765 43210" />
            <Field label="RSVP Email" id="rsvpEmail" type="email" value={details.rsvpEmail} onChange={set('rsvpEmail')} placeholder="email@example.com" />
          </div>
          <div className="field-grid field-grid--2">
            <Field label="Dress Code" id="dressCode" value={details.dressCode} onChange={set('dressCode')} placeholder="Traditional Silk – Deep Reds" />
          </div>
          <Field label="Personal Message to Guests" id="personalNote" type="textarea" value={details.personalNote} onChange={set('personalNote')} placeholder="A heartfelt note to your guests…" />
        </div>
      )

      case 6: return (
        <div className="create-step">
          <h2 className="create-step__title">Choose Your Template</h2>
          <p className="create-step__subtitle">Click any template to see a live preview of your invitation</p>

          {published && (
            <motion.div
              className="publish-success"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="publish-success__icon">✓</div>
              <div className="publish-success__body">
                <p className="publish-success__heading">Your invitation is live!</p>
                <p className="publish-success__link">{`${window.location.origin}/invitation/${publishedSlug}`}</p>
              </div>
              <button type="button" className="publish-success__copy" onClick={handleCopy}>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </motion.div>
          )}

          {publishError && (
            <p className="publish-error">{publishError}</p>
          )}

          <div className="template-grid">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className={`template-card ${selectedTemplate === tpl.id ? 'template-card--selected' : ''}`}
              >
                <div className="template-card__badge">{tpl.badge}</div>

                {/* Scaled mini preview */}
                <div className="template-card__preview">
                  <div className="template-card__preview-inner">
                    <tpl.Component details={details} />
                  </div>
                  <div className="template-card__preview-overlay" />
                </div>

                <div className="template-card__info">
                  <div className="template-card__colors">
                    {tpl.colors.map((c, i) => (
                      <span key={i} className="template-card__color-dot" style={{ background: c }} />
                    ))}
                  </div>
                  <h3 className="template-card__name">{tpl.name}</h3>
                  <p className="template-card__style">{tpl.style}</p>
                  <p className="template-card__desc">{tpl.desc}</p>

                  <button
                    className="template-card__preview-btn"
                    onClick={() => openPreview(tpl)}
                  >
                    {selectedTemplate === tpl.id ? '✓ Selected — Preview' : 'Preview Invitation →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )

      default: return null
    }
  }

  return (
    <div className="create-page">
      {/* Step progress bar */}
      <div className="create-progress">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1
          return (
            <React.Fragment key={n}>
              <button
                className={`create-progress__step ${step === n ? 'is-active' : ''} ${step > n ? 'is-done' : ''}`}
                onClick={() => goTo(n)}
                type="button"
                aria-label={`Go to step ${n}: ${label}`}
              >
                <span className="create-progress__num">{step > n ? '✓' : n}</span>
                <span className="create-progress__label">{label}</span>
              </button>
              {i < STEP_LABELS.length - 1 && (
                <div className={`create-progress__line ${step > n ? 'is-done' : ''}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Animated step content */}
      <div className="create-page__body">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={pageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="create-nav">
          {step > 1 && (
            <button type="button" className="btn btn-outline create-nav__back" onClick={() => goTo(step - 1)}>
              ← Back
            </button>
          )}
          {step < TOTAL_STEPS && (
            <button type="button" className="btn btn-primary create-nav__next" onClick={() => goTo(step + 1)}>
              Continue →
            </button>
          )}
          {step === TOTAL_STEPS && selectedTemplate && !published && (
            <button type="button" className="btn btn-gold create-nav__publish" onClick={handlePublish} disabled={publishing}>
              {publishing ? 'Publishing…' : 'Publish & Get Link →'}
            </button>
          )}
        </div>
      </div>

      {/* Live Preview Modal */}
      {preview && (
        <LivePreviewModal
          data={details}
          templateName={preview.templateName}
          onClose={closePreview}
          onSelect={selectTemplate}
        />
      )}
    </div>
  )
}
