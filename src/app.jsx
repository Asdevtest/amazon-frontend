import * as Sentry from '@sentry/react'

import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import FaviconNotificationContextProvider from 'react-favicon-notification'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import '@styles/global.css'

import {FallBack} from '@components/fall-back'

const myFallback = <FallBack />

export const App = () => (
  <div className="App">
    <Sentry.ErrorBoundary showDialog fallback={myFallback}>
      <FaviconNotificationContextProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />

          <MainNav />
        </ThemeProvider>
      </FaviconNotificationContextProvider>
    </Sentry.ErrorBoundary>
  </div>
)
