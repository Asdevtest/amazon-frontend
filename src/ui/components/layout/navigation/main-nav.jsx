import { ConfigProvider, theme } from 'antd'
import { observer } from 'mobx-react'
import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import { GlobalStyles } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

import { changeSystemTheme } from '@constants/theme/change-system-theme'
import { darkTheme, globalStyles, lightTheme } from '@constants/theme/mui-theme'

import { SettingsModel } from '@models/settings-model'

import { ToastifyProvider } from '@components/layout/navigation/toastify/toastify-provider'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'

import { HintsContextProvider } from '@contexts/hints-context'

import { UiTheme } from '@typings/enums/ui-theme'

import { PrivateRoutes } from './private-routes'
import { generatePublicRoutes } from './public-routes'
import { generateRedirects } from './redirects'

export const MainNav = observer(() => {
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

  // test custom theme for antd
  const customTheme = {
    algorithm: SettingsModel.uiTheme === UiTheme.light ? theme.defaultAlgorithm : theme.darkAlgorithm,
    token: {
      colorPrimary: SettingsModel.uiTheme === UiTheme.light ? '#007bff' : '#4ca1de',
      colorBgContainer: SettingsModel.uiTheme === UiTheme.light ? '#fff' : '#2B2B34',
      colorText: SettingsModel.uiTheme === UiTheme.light ? '#001029' : '#fff',
      borderRadius: 16,
    },
  }

  return (
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
  )
})
