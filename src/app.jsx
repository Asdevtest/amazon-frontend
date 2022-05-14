import * as Sentry from '@sentry/react'

import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import '@styles/global.css'

import {FallBack} from '@components/fall-back'

const myFallback = <FallBack />

// import {Translator, Translate} from 'react-auto-translate'

// const cacheProvider = {
//  get: (language, key) =>
//    ((JSON.parse(localStorage.getItem('translations')) || {})[key] || {})[
//      language
//    ],
//  set: (language, key, value) => {
//    const existing = JSON.parse(localStorage.getItem('translations')) || {
//      [key]: {},
//    };
//    existing[key] = {...existing[key], [language]: value};
//    localStorage.setItem('translations', JSON.stringify(existing));
//  },
// }

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
