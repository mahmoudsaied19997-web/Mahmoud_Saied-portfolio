import { useEdit } from '../context/EditContext'
import styles from './EditBanner.module.css'

export default function EditBanner({ onSave }) {
  const { editMode, exitEdit } = useEdit()

  return (
    <div className={`${styles.banner} ${editMode ? styles.show : ''}`}>
      <div className={styles.left}>
        <span className={styles.pulse} />
        <span>Edit Mode — click any text to edit</span>
      </div>
      <div className={styles.btns}>
        <button className={styles.btn} onClick={exitEdit}>✕ Exit</button>
        <button className={`${styles.btn} ${styles.save}`} onClick={onSave}>💾 Save</button>
      </div>
    </div>
  )
}
