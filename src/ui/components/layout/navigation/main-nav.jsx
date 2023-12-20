import { observer } from 'mobx-react'
import { Suspense, useState, useEffect, useMemo, useRef } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { changeSystemTheme } from '@constants/theme/change-system-theme'
import { darkTheme, globalStyles, lightTheme } from '@constants/theme/mui-theme'
import { UiTheme } from '@constants/theme/mui-theme.type'

import { SettingsModel } from '@models/settings-model'

import { ToastifyProvder } from '@components/layout/navigation/toastify/toastify-provder'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { PrivateRoutes } from './private-routes'
import { generatePublicRoutes } from './public-routes'
import { generateRedirects } from './redirects'


export const MainNav = observer(() => {
  const [lang,setLang]= useState()
  useEffect(() => {
    setLang(SettingsModel.languageTag)
  }, [SettingsModel.languageTag])

  const uiThemeModeRef = useRef(SettingsModel.uiTheme)

  useEffect(() => {
    uiThemeModeRef.current = SettingsModel.uiTheme
    changeSystemTheme(uiThemeModeRef.current)
  }, [SettingsModel.uiTheme])

  const theme = useMemo(
    () => (SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme),
    [SettingsModel.uiTheme],
  )

  return (
    <ThemeProvider theme={{...theme, lang}}>
      <ToastifyProvder theme={SettingsModel.uiTheme} />
      <GlobalStyles styles={globalStyles} />
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
