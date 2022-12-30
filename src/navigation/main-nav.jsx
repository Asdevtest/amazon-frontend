import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider} from '@mui/material/styles'

import {useMemo, useEffect, useRef, Suspense} from 'react'

import {observer} from 'mobx-react'
import {SnackbarProvider} from 'notistack'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {darkTheme, lightTheme} from '@constants/mui-theme'
import {UiTheme} from '@constants/themes'

import {SettingsModel} from '@models/settings-model'

import {CircularProgressWithLabel} from '@components/circular-progress-with-label'

import {PrivateRoutes} from './private-routes'
import {generatePublicRoutes} from './public-routes'
import {generateRedirects} from './redirects'

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
      <CssBaseline />
      <SnackbarProvider maxSnack={5}>
        <Router>
          <Suspense fallback={<CircularProgressWithLabel />}>
            <Switch>
              {generateRedirects()}
              {generatePublicRoutes()}
              <PrivateRoutes />
            </Switch>
          </Suspense>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  )
})
