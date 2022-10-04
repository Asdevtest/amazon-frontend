import {ThemeProvider} from '@material-ui/styles'
import {observer} from 'mobx-react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {darkTheme, lightTheme} from '@constants/mui-theme'
import {UiTheme} from '@constants/themes'

import {SettingsModel} from '@models/settings-model'

import {PrivateRoutes} from './private-routes'
import {generatePublicRoutes} from './public-routes'
import {generateRedirects} from './redirects'

export const MainNav = observer(() => (
  <ThemeProvider theme={SettingsModel.uiTheme === UiTheme.light ? lightTheme : darkTheme}>
    <Router>
      <Switch>
        {generateRedirects()}
        {generatePublicRoutes()}
        <PrivateRoutes />
      </Switch>
    </Router>
  </ThemeProvider>
))
