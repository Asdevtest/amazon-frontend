import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import { appVersion } from '@constants/app-version'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

const SENTRY_DSN = process.env.REACT_APP_SENTRY_DSN
const TEST_URL = process.env.REACT_APP_TEST_URL

console.log(SENTRY_DSN, TEST_URL)

Sentry.init({
  dsn: SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.httpClientIntegration(),
    Sentry.replayIntegration(),
    Sentry.sessionTimingIntegration(),
    // add a router when updating routing
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [TEST_URL, 'as-crm-dev.vercel.app'],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  release: appVersion,
  environment: 'development',
  normalizeMaxBreadth: 200,
  sendDefaultPii: true,
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <FaviconNotificationContextProvider>
    <App />
  </FaviconNotificationContextProvider>,
)

reportWebVitals()
