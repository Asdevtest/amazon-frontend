import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { Suspense, useEffect, useMemo, useRef } from 'react'

import { observer } from 'mobx-react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { darkTheme, lightTheme } from '@constants/theme/mui-theme'
import { UiTheme } from '@constants/theme/themes'

import { SettingsModel } from '@models/settings-model'
import { ToastifyProvder } from '@components/layout/navigation/toastify/toastify-provder'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { PrivateRoutes } from './private-routes'
import { generatePublicRoutes } from './public-routes'
import { generateRedirects } from './redirects'

export const MainNav = observer(() => {
  const languageTagRef = useRef(SettingsModel.languageTag)

  useEffect(() => {
    languageTagRef.current = SettingsModel.languageTag
  }, [SettingsModel.languageTag])

  const uiThemeModeRef = useRef(SettingsModel.uiTheme)

  useEffect(() => {
    uiThemeModeRef.current = SettingsModel.uiTheme
  }, [SettingsModel.uiTheme])

  const theme = useMemo(
    () => (SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme),
    [SettingsModel.uiTheme],
  )

  return (
    <ThemeProvider theme={theme}>
      <ToastifyProvder theme={SettingsModel.uiTheme} />
      <CssBaseline />
      <Router>
        <Suspense fallback={<CircularProgressWithLabel />}>
          <Switch>
            {generateRedirects()}
            {generatePublicRoutes()}
            <PrivateRoutes />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  )
})
