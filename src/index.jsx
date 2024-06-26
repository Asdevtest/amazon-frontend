import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    /^\//,
    process.env.REACT_APP_SENTRY_PROD_URL,
    process.env.REACT_APP_SENTRY_STAGE_URL,
    process.env.REACT_APP_SENTRY_TEST_URL,
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <FaviconNotificationContextProvider>
    <App />
  </FaviconNotificationContextProvider>,
)

reportWebVitals()
