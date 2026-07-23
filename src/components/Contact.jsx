import { CONTACT } from '../data/contact'
import { useEdit } from '../context/EditContext'
import styles from './Contact.module.css'

export default function Contact() {
  const { editMode } = useEdit()

  return (
    <div className="sec" id="contact">
      <div className="wrap">
        <div className={styles.eye}>06 / Contact</div>
        <h2 className={styles.title}>Let's Work<br />Together</h2>
        <div className={styles.grid}>
          {/* LEFT — contact details from .env */}
          <div>
            <p className={styles.intro} id="contactBio" data-editable="true">
              Open to new opportunities, collaborations, and freelance projects. Based in Cairo.
            </p>

            <a href={`tel:+2${CONTACT.phone}`} className={styles.card}>
              <div className={styles.ico}>📞</div>
              <div>
                <span className={styles.lbl}>Mobile</span>
                <strong className={styles.val}>{CONTACT.phone}</strong>
              </div>
            </a>

            <a href={`mailto:${CONTACT.email}`} className={styles.card}>
              <div className={styles.ico}>✉️</div>
              <div>
                <span className={styles.lbl}>Email</span>
                <strong className={styles.val}>{CONTACT.email}</strong>
              </div>
            </a>

            <a href={CONTACT.drive} target="_blank" rel="noreferrer" className={styles.card}>
              <div className={styles.ico}>📁</div>
              <div>
                <span className={styles.lbl}>Portfolio Drive</span>
                <strong className={styles.val}>View All Work ↗</strong>
              </div>
            </a>

            <div className={styles.card} style={{ cursor: 'default' }}>
              <div className={styles.ico}>📍</div>
              <div>
                <span className={styles.lbl}>Location</span>
                <strong className={styles.val} data-editable="true">Helwan, Cairo, Egypt</strong>
              </div>
            </div>
          </div>

          {/* RIGHT — social links from .env */}
          <div>
            <p className={styles.socialLabel}>Connect Online</p>
            <div className={styles.socGrid}>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className={styles.socBtn}>
                <div className={styles.socIco} style={{ background: '#0077b5' }}>in</div>
                LinkedIn
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className={styles.socBtn}>
                <div className={styles.socIco} style={{ background: '#25D366' }}>💬</div>
                WhatsApp
              </a>
              <a href={`mailto:${CONTACT.email}`} className={styles.socBtn}>
                <div className={styles.socIco} style={{ background: '#EA4335' }}>✉</div>
                Gmail
              </a>
              <a href={CONTACT.drive} target="_blank" rel="noreferrer" className={styles.socBtn}>
                <div className={styles.socIco} style={{ background: '#4285F4' }}>▶</div>
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
