import {Route, BrowserRouter as Router, Switch} from 'react-router-dom'

import {generateRedirects} from './redirects'
import {routes} from './routes'

export const MainNav = () => (
  <Router>
    <Switch>
      {generateRedirects()}
      {routes.map((route, index) => (
        <Route component={route.component} exact={route.exact} key={index} path={route.routePath} />
      ))}
    </Switch>
  </Router>
)
