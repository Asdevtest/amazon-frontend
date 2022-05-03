import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {PrivateRoutes} from './private-routes'
import {generatePublicRoutes} from './public-routes'
import {generateRedirects} from './redirects'

export const MainNav = () => (
  <Router>
    <Switch>
      {generateRedirects()}
      {generatePublicRoutes()}
      <PrivateRoutes />
    </Switch>
  </Router>
)
