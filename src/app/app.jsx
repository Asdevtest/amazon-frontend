import * as Sentry from '@sentry/react'
import { ConfigProvider, theme } from 'antd'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { changeSystemTheme } from '@constants/theme/change-system-theme'
import { darkTheme, globalStyles, lightTheme } from '@constants/theme/mui-theme'

import { SettingsModel } from '@models/settings-model'

import { FallBack } from '@components/layout/fall-back'
import { PrivateRoutes } from '@components/layout/navigation/private-routes'
import { generatePublicRoutes } from '@components/layout/navigation/public-routes'
import { generateRedirects } from '@components/layout/navigation/redirects'
import { ToastifyProvider } from '@components/layout/navigation/toastify/toastify-provider'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { HintsContextProvider } from '@contexts/hints-context'

import { UiTheme } from '@typings/enums/ui-theme'

import { useNotifications } from './providers/notifications'

export const App = () => {
  useNotifications()

  const [lang, setLang] = useState()
  useEffect(() => {
    setLang(SettingsModel.languageTag)
  }, [SettingsModel.languageTag])

  const uiThemeModeRef = useRef(SettingsModel.uiTheme)

  useEffect(() => {
    uiThemeModeRef.current = SettingsModel.uiTheme
    changeSystemTheme(uiThemeModeRef.current)
  }, [SettingsModel.uiTheme])

  const themeMui = useMemo(
    () => (SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme),
    [SettingsModel.uiTheme],
  )

  const customTheme = {
    algorithm: SettingsModel.uiTheme === UiTheme.light ? theme.defaultAlgorithm : theme.darkAlgorithm,
  }

  return (
    <Sentry.ErrorBoundary showDialog fallback={<FallBack />}>
      <ConfigProvider theme={customTheme} locale={lang}>
        <ThemeProvider theme={{ ...themeMui, lang }}>
          <HintsContextProvider hints>
            <ToastifyProvider theme={SettingsModel.uiTheme} />
            <GlobalStyles styles={globalStyles} />
            <CssBaseline />
            <Router>
              <Suspense fallback={<CircularProgressWithLabel showBackground />}>
                <Switch>
                  {generateRedirects()}
                  {generatePublicRoutes()}
                  <PrivateRoutes />
                </Switch>
              </Suspense>
            </Router>
          </HintsContextProvider>
        </ThemeProvider>
      </ConfigProvider>
    </Sentry.ErrorBoundary>
  )
}
