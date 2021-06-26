import {Route} from 'react-router'

import {publicRoutesConfigs} from '@constants/routes'

export const generatePublicRoutes = () =>
  publicRoutesConfigs.map((route, index) => (
    <Route key={index} component={route.component} exact={route.exact} path={route.routePath} />
  ))
