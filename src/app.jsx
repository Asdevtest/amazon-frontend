import {ThemeProvider} from '@material-ui/styles'

import {muiTheme} from '@constants/mui-theme'

import {MainNav} from '@navigation/main-nav'

import '@styles/global.css'

export const App = () => (
  <div className="App">
    <ThemeProvider theme={muiTheme}>
      <MainNav />
    </ThemeProvider>
  </div>
)
