/* eslint-disable no-unused-vars */
import * as Sentry from '@sentry/react'

import {useEffect} from 'react'

import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'
import FaviconNotificationContextProvider, {useFaviconNotification} from 'react-favicon-notification'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import '@styles/global.css'

import {FallBack} from '@components/fall-back'

const myFallback = <FallBack />

const startFaviconConfig = {
  radius: 90,
  counter: 0,
  innerCircle: false,
  backgroundColor: '#DB0101',

  fontColor: '#FFF',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  url: '/assets/icons/favicon-20.09.ico',
  position: 'top-right',
  show: false,
}

export const App = () => {
  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    setConfig({...startFaviconConfig})
  }, [])

  return (
    <div className="App">
      <Sentry.ErrorBoundary showDialog fallback={myFallback}>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />

          <MainNav />
        </ThemeProvider>
      </Sentry.ErrorBoundary>
    </div>
  )
}
