import { Redirect, Route } from 'react-router'

import { redirectConfigs } from '@constants/navigation/redirects'

export const generateRedirects = () =>
  redirectConfigs.map((redirectConfig, index) => (
    <Route key={`redirect_${redirectConfig.from}_${index}`} exact path={redirectConfig.from}>
      <Redirect push to={redirectConfig.to} />
    </Route>
  ))
