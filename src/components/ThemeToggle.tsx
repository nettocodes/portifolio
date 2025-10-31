'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { SunIcon, MoonIcon } from '@/components/ui/Icons'
import { useState, useEffect } from 'react'
import styles from './ThemeToggle.module.css'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Previne problemas de hidratação
  if (!mounted) {
    return (
      <button
        className={styles.toggle}
        aria-label="Toggle theme"
      >
        <MoonIcon />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
