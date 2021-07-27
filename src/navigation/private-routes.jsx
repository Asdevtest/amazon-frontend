import {useEffect} from 'react'

import {observer} from 'mobx-react'
import {Redirect, Route} from 'react-router-dom'

import {privateRoutesConfigs} from '@constants/routes'

// import {UserRoleCodeMap} from '@constants/user-roles'
import {UserModel} from '@models/user-model'

export const PrivateRoutes = observer(() => {
  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      UserModel.getUserInfo()
    }
  }, [])

  const redirectToAuth = <Redirect to={'/auth'} />
  const generateAllowedRoutes = () => (
    // const allowedRoutes = privateRoutesConfigs.filter(route =>
    //   route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]),
    // )
    <>
      {privateRoutesConfigs.map((route, index) => (
        <Route key={index} component={route.component} exact={route.exact} path={route.routePath} />
      ))}
      {/* <Redirect to={allowedRoutes[0].routePath} /> */}
    </>
  )

  if (!UserModel.isHydrated || !UserModel.userInfo) {
    return <div />
  }

  return !UserModel.isAuthenticated() ? redirectToAuth : generateAllowedRoutes()
})
