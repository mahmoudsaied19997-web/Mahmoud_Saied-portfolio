import { useState, useRef } from 'react'
import { useEdit } from '../context/EditContext'
import { CONTACT } from '../data/contact'
import styles from './Hero.module.css'

export default function Hero() {
  const { editMode } = useEdit()
  const [photo, setPhoto] = useState(null)
  const fileRef = useRef()

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setPhoto(ev.target.result)
    reader.readAsDataURL(file)
  }

  return (
    <section className={styles.heroSection}>
      <div className={styles.hero}>
        {/* TEXT SIDE */}
        <div className={styles.textSide}>
          <div className={styles.eyebrow} data-editable="true">
            Instructional Designer · E-Learning Specialist
          </div>

          <h1 className={styles.name} data-editable="true">
            Mahmoud Saied<br />Abdelhamid
          </h1>

          <div className={styles.roleTag}>
            <span data-editable="true">Instructional Designer</span>
          </div>

          <p className={styles.bio} id="heroBio" data-editable="true">
            Instructional Designer at Selah El Telmeez with a passion for designing
            learner-centered experiences that make learning engaging, interactive, and impactful.
            I specialize in transforming complex educational content into interactive scenarios,
            serious games, and immersive e-learning experiences.<br /><br />
            Experienced in Articulate Storyline, scenario-based learning, gamification, and
            interactive content design — combining instructional design principles with creativity
            to deliver real educational value.
          </p>

          <div className={styles.skills} id="skillsPills">
            {['Gamification','Storyboarding','Needs Analysis','E-Learning','Articulate Storyline','QA Review'].map(s => (
              <SkillPill key={s} label={s} editMode={editMode} />
            ))}
            <button className={`${styles.addSkillBtn} add-skill-btn`}
              onClick={() => { const v = prompt('New skill:'); if (v) addSkillPill(v) }}>
              + Add Skill
            </button>
          </div>

          <div className={styles.ctas}>
            <a href="#portfolio" className={styles.ctaPrimary}>View My Work</a>
            <a href={CONTACT.drive} target="_blank" rel="noreferrer" className={styles.ctaGhost}>
              Portfolio Drive ↗
            </a>
          </div>
        </div>

        {/* PHOTO SIDE */}
        <div className={styles.photoBox}>
          <div className={styles.photoFrame}>
            {!photo && (
              <div className={styles.photoPh}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span>Add your photo</span>
              </div>
            )}
            {photo && <img src={photo} alt="Mahmoud Saied" className={styles.photoImg} />}
            {editMode && (
              <div className={styles.photoOverlay} onClick={() => fileRef.current?.click()}>
                <span>📷 Change photo</span>
                <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
              </div>
            )}
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
            <span className={`${styles.corner} ${styles.br}`} />
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillPill({ label, editMode }) {
  const [visible, setVisible] = useState(true)
  if (!visible) return null
  return (
    <span className={styles.pill}>
      {label}
      {editMode && (
        <button className={styles.pillDel} onClick={() => confirm(`Remove "${label}"?`) && setVisible(false)}>✕</button>
      )}
    </span>
  )
}

function addSkillPill(label) {
  const pills = document.getElementById('skillsPills')
  const addBtn = pills?.querySelector('.add-skill-btn')
  if (!pills || !addBtn) return
  const span = document.createElement('span')
  span.className = 'skill-pill-manual'
  span.textContent = label
  span.style.cssText = `font-size:.75rem;color:var(--sky);border:1px solid rgba(56,189,248,.2);
    border-radius:2rem;padding:.25rem .75rem;background:rgba(56,189,248,.05);
    font-family:'JetBrains Mono',monospace;`
  pills.insertBefore(span, addBtn)
}
