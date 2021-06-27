import {useEffect} from 'react'

import {observer} from 'mobx-react'
import {Redirect, Route} from 'react-router-dom'

import {privateRoutesConfigs} from '@constants/routes'

// import {UserRoleCodeMap} from '@constants/user-roles'
import {UserModel} from '@models/user-model'

export const PrivateRoutes = observer(() => {
  useEffect(() => {
    UserModel.getUserInfo()
  }, [])

  const redirectToAuth = <Redirect to={'/auth'} />
  const generateAllowedRoutes = () => {
    if (!UserModel.userInfo) {
      return <div />
    }

    // const allowedRoutes = privateRoutesConfigs.filter(route =>
    //   route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]),
    // )
    return (
      <>
        {privateRoutesConfigs.map((route, index) => (
          <Route key={index} component={route.component} exact={route.exact} path={route.routePath} />
        ))}
        {/* <Redirect to={privateRoutesConfigs[0].routePath} /> */}
      </>
    )
  }

  return !UserModel.isAuthenticated() ? redirectToAuth : generateAllowedRoutes()
})
