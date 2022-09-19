/* eslint-disable no-unused-vars */
import {useEffect} from 'react'

import {observer} from 'mobx-react'
import {useFaviconNotification} from 'react-favicon-notification'
// import Head from 'react-document-configuration'
import {Redirect, Route, useHistory} from 'react-router-dom'

import {overallRoutesConfigs, privateRoutesConfigs} from '@constants/routes'
import {UserRoleCodeMap} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'
import {UserModel} from '@models/user-model'

const startFaviconConfig = {
  radius: 14,
  counter: 0,
  innerCircle: false,
  backgroundColor: '#DB0101',

  fontColor: '#FFF',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  url: '/assets/icons/favicon-04.04.ico',
  position: 'bottom-right',
  show: false,
}

export const PrivateRoutes = observer(() => {
  const history = useHistory()

  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    if (ChatModel.unreadMessages > 0) {
      setConfig({...startFaviconConfig, show: true, counter: ChatModel.unreadMessages})
    } else {
      setConfig({...startFaviconConfig, show: false, counter: 0})
    }
  }, [ChatModel.unreadMessages])

  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      UserModel.getUserInfo()
    }
  }, [history.location.pathname])

  useEffect(() => {
    if (UserModel.isAuthenticated()) {
      // setConfig(startFaviconConfig)
      ChatModel.init()
      ChatModel.getSimpleChats()
    }
  }, [])

  const redirectToAuth = <Redirect to={'/auth'} />

  const generateAllowedRoutes = () => {
    const allowedRoutes = privateRoutesConfigs
      .filter(route => route?.permission?.includes(UserRoleCodeMap[UserModel.userInfo.role]))
      .concat(overallRoutesConfigs)

    const notAllowedRoute = !allowedRoutes.some(elem => elem.routePath === history.location.pathname)

    return (
      <>
        {/* <Head title="HOME" icon="/assets/icons/+.svg" /> */}

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
