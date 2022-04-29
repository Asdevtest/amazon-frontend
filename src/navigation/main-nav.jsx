import * as Sentry from '@sentry/react'

import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {FallBack} from '@components/fall-back'

import {PrivateRoutes} from './private-routes'
import {generatePublicRoutes} from './public-routes'
import {generateRedirects} from './redirects'

const myFallback = <FallBack />

export const MainNav = () => (
  <Router>
    <Switch>
      <Sentry.ErrorBoundary showDialog fallback={myFallback}>
        {generateRedirects()}
        {generatePublicRoutes()}
        <PrivateRoutes />
      </Sentry.ErrorBoundary>
    </Switch>
  </Router>
)
