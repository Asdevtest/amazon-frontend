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
  // const [showNavigator, setShowNavigator] = useState(false)
  const languageTagRef = useRef(SettingsModel.languageTag)

  useEffect(() => {
    if (!languageTagRef.current) {
      // if (SettingsModel.languageTag) {
      //   setShowNavigator(false)
      //   setTimeout(() => {
      //     setShowNavigator(true)
      //   }, 50)
      // }
    }
    languageTagRef.current = SettingsModel.languageTag
  }, [SettingsModel.languageTag])
  // if (!showNavigator) {
  //   return <div />
  // }
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
