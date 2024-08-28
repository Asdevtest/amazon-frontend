import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { useFaviconNotification } from 'react-favicon-notification'
import { Redirect, Route, useLocation } from 'react-router-dom'

import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { overallRoutesConfigs, privateRoutesConfigs } from '@constants/navigation/routes'

import { ChatModel } from '@models/chat-model'
import { UserModel } from '@models/user-model'

import { Layout } from '@components/layout'

import { isHaveMasterUser } from '@utils/checks'
import { resetAccessTokenByTime } from '@utils/reset'

export const PrivateRoutes = observer(() => {
  const location = useLocation()

  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    if (ChatModel.unreadMessages > 0) {
      setConfig({ ...config, show: true, counter: ChatModel.unreadMessages })
    } else {
      setConfig({ ...config, show: false, counter: 0 })
    }
  }, [ChatModel.unreadMessages])

  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      UserModel.getUsersInfoCounters()

      if (location.pathname.includes('/dashboard')) {
        UserModel.getUserInfo()
      }
    }
  }, [location.pathname])

  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      ChatModel.init()
      ChatModel.getUnreadMessagesCount()
      resetAccessTokenByTime()
    }
  }, [])

  const userInfo = UserModel.userInfo

  const generateAllowedRoutes = () => {
    const allowedRoutes = overallRoutesConfigs?.concat(
      privateRoutesConfigs
        ?.filter(route => route?.permission?.includes(UserRoleCodeMap[userInfo.role]))
        ?.filter(
          route =>
            !isHaveMasterUser(userInfo) ||
            !route?.permissionKey ||
            userInfo?.permissions?.some(item => item === route?.permissionKey),
        ),
    )

    const notAllowedRoute = !allowedRoutes?.some(elem => elem?.routePath === location.pathname)

    return (
      <>
        {allowedRoutes.map((route, index) => {
          return <Route key={index} component={route.component} exact={route.exact} path={route.routePath} />
        })}

        {notAllowedRoute ? <Redirect to={`/${UserRoleCodeMapForRoutes[userInfo.role]}/dashboard`} /> : null}
      </>
    )
  }

  if (!UserModel.isHydrated) {
    return <div />
  }

  if (!UserModel.userInfo) {
    return <Redirect to={'/auth'} />
  }

  return <Layout>{generateAllowedRoutes()}</Layout>
})
