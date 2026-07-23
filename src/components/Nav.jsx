import { useEdit } from '../context/EditContext'
import styles from './Nav.module.css'

export default function Nav() {
  const { editMode, editVisible, toggleEdit } = useEdit()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <span data-editable="true">Mahmoud </span>
        <em data-editable="true">Saied</em>
      </div>

      <ul className={styles.links}>
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#portfolio">Work</a></li>
        <li><a href="#courses">Courses</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <div className={styles.right}>
        {editVisible && (
          <button
            className={`${styles.editToggle} ${editMode ? styles.on : ''}`}
            onClick={toggleEdit}
          >
            <span className={styles.dot} />
            <span>{editMode ? 'Editing' : 'Edit'}</span>
          </button>
        )}
      </div>
    </nav>
  )
}
