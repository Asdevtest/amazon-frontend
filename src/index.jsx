import * as Sentry from '@sentry/react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import { appVersion } from '@constants/app-version'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

Sentry.init({
  dsn: 'https://9d93845486a53513477f1c4901b80625@o4507371916099584.ingest.de.sentry.io/4507446537158736', // research about process.env
  integrations: [
    // Sentry.browserTracingIntegration(),
    // Sentry.browserProfilingIntegration(),
    // Sentry.captureConsoleIntegration(), // tracking by all console.log
    // Sentry.contextLinesIntegration(),
    // Sentry.debugIntegration(), // debugger-console.log in devtools
    Sentry.extraErrorDataIntegration(),
    Sentry.httpClientIntegration({
      // failedRequestTargets: ['amazonapi.fvds.ru', 'amazon-socket.fvds.ru'], // URLs for tracking, by default - all
      failedRequestStatusCodes: [
        [500, 599],
        [400, 499],
      ],
    }),
    Sentry.replayIntegration(),
    Sentry.sessionTimingIntegration(),
    // add a router when updating routing
  ],
  tracesSampleRate: 1.0, // browserTracingIntegration
  // tracePropagationTargets: ['as-crm-dev.vercel.app', 'as-crm-git-sentry-test-aservs-projects.vercel.app'], // URLs for tracking, research about process.env
  allowUrls: ['as-crm-dev.vercel.app', 'as-crm-git-sentry-test-aservs-projects.vercel.app'],
  replaysSessionSampleRate: 0.1, // Sentry.replayIntegration
  replaysOnErrorSampleRate: 1.0, // Sentry.replayIntegration
  release: appVersion, // research about process.env
  environment: 'development', // research about process.env
  normalizeMaxBreadth: 200,
  sendDefaultPii: true, // for Sentry.httpClientIntegration
  denyUrls: ['localhost'], // URLs skip, research about process.env
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <FaviconNotificationContextProvider>
    <App />
  </FaviconNotificationContextProvider>,
)

reportWebVitals()
