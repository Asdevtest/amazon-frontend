import { UiTheme } from './mui-theme.type'

export const changeSystemTheme = (theme: UiTheme) => {
  const root = document.documentElement
  root.style.setProperty('color-scheme', theme)
}
