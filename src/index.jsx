import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

console.log('process.env.REACT_APP_SENTRY_DSN', process.env.REACT_APP_SENTRY_DSN)

Sentry.init({
  dsn: 'https://9d93845486a53513477f1c4901b80625@o4507371916099584.ingest.de.sentry.io/4507446537158736',
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: ['as-crm-git-sentry-test-aservs-projects.vercel.app', 'as-crm-dev.vercel.app'],
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
