/* eslint-disable no-unused-vars */
import * as Sentry from '@sentry/react'

import { useEffect } from 'react'

import { useFaviconNotification } from 'react-favicon-notification'

import '@styles/global.css'

import { FallBack } from '@components/layout/fall-back'
import { MainNav } from '@components/layout/navigation/main-nav'

const myFallback = <FallBack />

const startFaviconConfig = {
  radius: 90,
  counter: 0,
  innerCircle: false,
  backgroundColor: '#DB0101',

  fontColor: '#FFF',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  url: '/assets/icons/favicon-20.09.ico',
  position: 'top-right',
  show: false,
}

export const App = () => {
  const [config, setConfig] = useFaviconNotification()

  useEffect(() => {
    setConfig({ ...startFaviconConfig })
  }, [])

  return (
    <div className="App">
      <Sentry.ErrorBoundary showDialog fallback={myFallback}>
        <MainNav />
      </Sentry.ErrorBoundary>
    </div>
  )
}
