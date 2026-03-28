import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useWedding } from '../context/WeddingContext'
import SouthIndianClassic from '../components/SouthIndianClassic'
import SouthIndianLotus from '../components/SouthIndianLotus'
import SouthIndianModern from '../components/SouthIndianModern'
import './TemplatePage.css'

const templates = [
  {
    id: 'south-indian-classic',
    name: 'Kanchipuram Classic',
    style: 'Traditional Silk Saree Aesthetic',
    colors: ['#8B1A1A', '#C9953A', '#FAF6EF'],
    badge: 'Popular',
    desc: 'Deep crimson & gold with kolam ornaments, ornate dividers, and silk-weave borders.',
    Component: SouthIndianClassic,
  },
  {
    id: 'south-indian-lotus',
    name: 'Lotus Bloom',
    style: 'Floral Temple Aesthetic',
    colors: ['#6B3A6E', '#C9953A', '#FBF0FF'],
    badge: 'Elegant',
    desc: 'Royal purple & gold with animated lotus motifs, jasmine florals, and temple-inspired design.',
    Component: SouthIndianLotus,
  },
  {
    id: 'south-indian-modern',
    name: 'Modern Pattam',
    style: 'Contemporary Geometric',
    colors: ['#1A3A5C', '#C9953A', '#FFFFFF'],
    badge: 'Modern',
    desc: 'Navy & gold two-column layout with geometric accents and a clean contemporary feel.',
    Component: SouthIndianModern,
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function TemplatePage() {
  const { details, selectedTemplate, setSelectedTemplate } = useWedding()
  const navigate = useNavigate()

  const handleSelect = (id) => {
    setSelectedTemplate(id)
    navigate('/preview')
  }

  return (
    <motion.div
      className="template-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="template-page__hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="page-eyebrow">✦ Step 2 of 3 ✦</p>
          <h1>Choose Your Template</h1>
          <p className="page-subtitle">Select a design that reflects your wedding's unique spirit</p>
        </motion.div>
      </div>

      <div className="container">
        <motion.div
          className="template-grid"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {templates.map((t) => (
            <motion.div
              key={t.id}
              className={`template-card ${selectedTemplate === t.id ? 'template-card--selected' : ''}`}
              variants={fadeUp}
            >
              <div className="template-card__badge">{t.badge}</div>

              {/* Mini Preview */}
              <div className="template-card__preview">
                <div className="template-card__preview-inner">
                  <t.Component details={details} />
                </div>
                <div className="template-card__preview-overlay" />
              </div>

              <div className="template-card__info">
                <div className="template-card__colors">
                  {t.colors.map((c, i) => (
                    <div key={i} className="template-card__color-dot" style={{ background: c }} />
                  ))}
                </div>
                <h3 className="template-card__name">{t.name}</h3>
                <p className="template-card__style">{t.style}</p>
                <p className="template-card__desc">{t.desc}</p>

                <button
                  className={`btn ${selectedTemplate === t.id ? 'btn-gold' : 'btn-primary'} btn-select`}
                  onClick={() => handleSelect(t.id)}
                >
                  {selectedTemplate === t.id ? '✓ Selected — View Preview' : 'Select This Template'}
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
