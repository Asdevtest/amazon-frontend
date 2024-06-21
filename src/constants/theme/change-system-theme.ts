import { UiTheme } from '@typings/enums/ui-theme'

export const changeSystemTheme = (theme: UiTheme) => {
  const root = document.documentElement
  root.style.setProperty('color-scheme', theme)
}
