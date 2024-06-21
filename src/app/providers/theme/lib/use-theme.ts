import { useCallback, useContext } from 'react'

import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './theme-context'

interface UseThemeResult {
  theme: Theme
  onToggleTheme: () => void
}

export const useTheme = (): UseThemeResult => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleToggleTheme = useCallback(() => {
    const newTheme = theme === Theme.DARK ? Theme.LIGHT : Theme.DARK
    setTheme?.(newTheme)
    document.body.className = newTheme
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
  }, [theme, setTheme])

  return {
    theme: theme || Theme.LIGHT,
    onToggleTheme: handleToggleTheme,
  }
}
