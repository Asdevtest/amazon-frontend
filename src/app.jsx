// import {blue} from '@mui/material/colors'
import * as Sentry from '@sentry/react'

import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import '@styles/global.css'

import {FallBack} from '@components/fall-back'

const myFallback = <FallBack />

export const App = () => (
  <div className="App">
    <Sentry.ErrorBoundary showDialog fallback={myFallback}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />

        <MainNav />
      </ThemeProvider>
    </Sentry.ErrorBoundary>
  </div>
)
