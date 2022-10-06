/* eslint-disable no-unused-vars */
// import {
//   ThemeProvider, // createTheme,
// } from '@mui/material/styles'
// import {CssBaseline} from '@material-ui/core'
import CssBaseline from '@mui/material/CssBaseline'
import * as Sentry from '@sentry/react'

import {useEffect} from 'react'

import {useFaviconNotification} from 'react-favicon-notification'

// import {lightTheme} from '@constants/mui-theme'
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
    // <ThemeProvider theme={lightTheme}>
    <div className="App">
      <Sentry.ErrorBoundary showDialog fallback={myFallback}>
        <CssBaseline />

        <MainNav />
      </Sentry.ErrorBoundary>
    </div>
    // </ThemeProvider>
  )
}
