import {Redirect, Route} from 'react-router'

import {redirectConfigs} from '@constants/redirects'

export const generateRedirects = () =>
  redirectConfigs.map((redirectConfig, index) => (
    <Route exact key={`redirect_${redirectConfig.from}_${index}`} path={redirectConfig.from}>
      <Redirect push to={redirectConfig.to} />
    </Route>
  ))
