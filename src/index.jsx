import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import { appVersion } from '@constants/app-version'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

Sentry.init({
  dsn: 'https://9d93845486a53513477f1c4901b80625@o4507371916099584.ingest.de.sentry.io/4507446537158736',
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.httpClientIntegration(),
    Sentry.replayIntegration(),
    Sentry.sessionTimingIntegration(),
    // add a router when updating routing
  ],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['as-crm-dev.vercel.app'],
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
