import styles from './Modal.module.css'

export default function Modal({ id, title, children, onClose }) {
  return (
    <div className={styles.overlay} id={id} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  )
}

export function ModalField({ label, children }) {
  return (
    <div className={styles.field}>
      <label>{label}</label>
      {children}
    </div>
  )
}

export function ModalActions({ onCancel, onConfirm, confirmLabel = 'Apply' }) {
  return (
    <div className={styles.actions}>
      <button className={styles.cancel} onClick={onCancel}>Cancel</button>
      <button className={styles.confirm} onClick={onConfirm}>{confirmLabel}</button>
    </div>
  )
}
