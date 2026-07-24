import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const EditContext = createContext(null)

// Password comes from .env — never hardcoded in source
const EDIT_PASSWORD = import.meta.env.VITE_EDIT_PASSWORD

export function EditProvider({ children }) {
  const [editMode, setEditMode] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

  // Only reveal Edit button if URL contains ?edit=true
  // No keyboard shortcut, no triple-click — nothing visible to visitors
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('edit') === 'true') {
      setEditVisible(true)
      // Clean the URL so it doesn't show ?edit=true to anyone watching
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [])

  // Toggle edit mode with password
  const toggleEdit = useCallback(() => {
    if (!editMode) {
      const pw = window.prompt('Enter edit password:')
      if (pw !== EDIT_PASSWORD) { showToast('✗ Wrong password'); return }
    }
    setEditMode(prev => {
      const next = !prev
      if (next) {
        document.body.classList.add('editing')
        document.querySelectorAll('[data-editable]').forEach(el => el.setAttribute('contenteditable', 'true'))
      } else {
        exitEditDOM()
      }
      return next
    })
  }, [editMode])

  const exitEdit = useCallback(() => {
    setEditMode(false)
    exitEditDOM()
  }, [])

  return (
    <EditContext.Provider value={{ editMode, editVisible, toggleEdit, exitEdit }}>
      {children}
    </EditContext.Provider>
  )
}

function exitEditDOM() {
  document.body.classList.remove('editing')
  document.querySelectorAll('[data-editable]').forEach(el => el.setAttribute('contenteditable', 'false'))
}

export function showToast(msg) {
  let t = document.getElementById('ms-toast')
  if (!t) {
    t = document.createElement('div')
    t.id = 'ms-toast'
    t.style.cssText = `position:fixed;bottom:4.5rem;left:50%;transform:translateX(-50%);
      background:rgba(20,24,39,.97);color:#34d399;padding:.55rem 1.3rem;border-radius:.4rem;
      border:1px solid rgba(52,211,153,.25);font-size:.82rem;z-index:9999;pointer-events:none;
      opacity:0;transition:opacity .3s;font-family:'DM Sans',sans-serif;font-weight:500;white-space:nowrap`
    document.body.appendChild(t)
  }
  t.textContent = msg
  t.style.opacity = '1'
  clearTimeout(t._timer)
  t._timer = setTimeout(() => (t.style.opacity = '0'), 2200)
}

export const useEdit = () => useContext(EditContext)