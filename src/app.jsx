import {CssBaseline} from '@material-ui/core'
import {ThemeProvider} from '@material-ui/styles'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import '@styles/global.css'

export const App = () => (
  <div className="App">
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <MainNav />
    </ThemeProvider>
  </div>
)
