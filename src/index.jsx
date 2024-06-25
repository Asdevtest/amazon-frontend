import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [
    'https://as-crm-git-sentry-test-aservs-projects.vercel.app/',
    'as-crm-git-sentry-test-aservs-projects.vercel.app',
    '.vercel.',
    'app',
    'localhost',
  ],
  beforeSend(event) {
    console.log('Sentry event:', event)
    return event
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <FaviconNotificationContextProvider>
    <App />
  </FaviconNotificationContextProvider>,
)

reportWebVitals()
