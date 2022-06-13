import {
  useEffect,
  useRef,
  /* useState */
} from 'react'

import {observer} from 'mobx-react'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

import {SettingsModel} from '@models/settings-model'

import {PrivateRoutes} from './private-routes'
import {generatePublicRoutes} from './public-routes'
import {generateRedirects} from './redirects'

export const MainNav = observer(() => {
  const languageTagRef = useRef(SettingsModel.languageTag)

  useEffect(() => {
    languageTagRef.current = SettingsModel.languageTag
  }, [SettingsModel.languageTag])

  return (
    <Router>
      <Switch>
        {generateRedirects()}
        {generatePublicRoutes()}
        <PrivateRoutes />
      </Switch>
    </Router>
  )
})
