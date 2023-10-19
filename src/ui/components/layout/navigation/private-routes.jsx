import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { useFaviconNotification } from 'react-favicon-notification'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

import { ChatModel } from '@models/chat-model'
import { UserModel } from '@models/user-model'

import { Layout } from '@components/layout'

import { isHaveMasterUser } from '@utils/checks'

export const PrivateRoutes = observer(() => {
  const location = useLocation()

  const [config, setConfig] = useFaviconNotification()

  const [targetRoute, setTargetRoute] = useState('')

  useEffect(() => {
    if (ChatModel.unreadMessages > 0) {
      setConfig({ ...config, show: true, counter: ChatModel.unreadMessages })
    } else {
      setConfig({ ...config, show: false, counter: 0 })
    }
  }, [ChatModel.unreadMessages])

  useEffect(() => {
    if (location.state?.targetRoute) {
      setTargetRoute(location.state.targetRoute)
    } else if (location.pathname === targetRoute) {
      setTargetRoute('')
    } else if (UserModel.isAuthenticated()) {
      UserModel.getUserInfo()
    }
  }, [location.pathname])

  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      ChatModel.init()
      ChatModel.getSimpleChats()
    }
  }, [])

  const userInfo = UserModel.userInfo

  const redirectToAuth = <Redirect to={'/auth'} />

  const generateAllowedRoutes = () => {
    const allowedRoutes = overallRoutesConfigs?.concat(
      privateRoutesConfigs
        ?.filter(route => route?.permission?.includes(UserRoleCodeMap[userInfo.role]))
        ?.filter(
          route =>
            !isHaveMasterUser(userInfo) ||
            !route?.permissionKey ||
            userInfo?.permissions?.some(item => item.key === route?.permissionKey),
        ),
    )

    const notAllowedRoute = !allowedRoutes?.some(elem => elem?.routePath === location.pathname)

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

  return !UserModel.isAuthenticated() ? redirectToAuth : <Layout>{generateAllowedRoutes()}</Layout>
})
