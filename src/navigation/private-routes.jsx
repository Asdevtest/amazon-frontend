import {useEffect} from 'react'

import {observer} from 'mobx-react'
import {Redirect, Route, useHistory} from 'react-router-dom'

import {overallRoutesConfigs, privateRoutesConfigs} from '@constants/routes'
import {UserRoleCodeMap} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'
import {UserModel} from '@models/user-model'

export const PrivateRoutes = observer(() => {
  const history = useHistory()

  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      UserModel.getUserInfo()
      ChatModel.init()
    }
  }, [history.location.pathname])

  const redirectToAuth = <Redirect to={'/auth'} />

  const generateAllowedRoutes = () => {
    const allowedRoutes = privateRoutesConfigs
      .filter(route => route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]))
      .concat(overallRoutesConfigs)

    const notAllowedRoute = !allowedRoutes.some(elem => elem.routePath === history.location.pathname)

    return (
      <>
        {allowedRoutes.map((route, index) => (
          <Route key={index} component={route.component} exact={route.exact} path={route.routePath} />
        ))}

        {notAllowedRoute ? (
          allowedRoutes[0] ? (
            <Redirect to={allowedRoutes[0].routePath} />
          ) : (
            <Redirect to={'/auth'} />
          )
        ) : undefined}
      </>
    )
  }

  if (!UserModel.isHydrated) {
    return <div />
  } else {
    if (!UserModel.userInfo) {
      return <Redirect to={'/auth'} />
    }
  }

  return !UserModel.isAuthenticated() ? redirectToAuth : generateAllowedRoutes()
})
