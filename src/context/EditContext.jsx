import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const EditContext = createContext(null)

// Password comes from .env — never hardcoded in source
const EDIT_PASSWORD = import.meta.env.VITE_EDIT_PASSWORD

export function EditProvider({ children }) {
  const [editMode, setEditMode] = useState(false)
  const [editVisible, setEditVisible] = useState(false)

  // Reveal the Edit button via secret combo
  const revealEdit = useCallback(() => {
    setEditVisible(true)
    showToast('✎ Edit mode available')
  }, [])

  // Ctrl+Shift+E
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'E') revealEdit()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [revealEdit])

  // Triple-click on footer
  useEffect(() => {
    let clicks = 0, timer
    const handler = (e) => {
      if (e.target.closest('.footer-wrap')) {
        clicks++
        clearTimeout(timer)
        timer = setTimeout(() => (clicks = 0), 600)
        if (clicks >= 3) { revealEdit(); clicks = 0 }
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [revealEdit])

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
