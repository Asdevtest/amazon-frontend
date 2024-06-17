import * as Sentry from '@sentry/react'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import { useLocation } from 'react-router-dom'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect,
      useLocation,
    }),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0,
  denyUrls: ['localhost', '127.0.0.1'],
  allowUrls: ['amazon-frontend-test123', 'amazon-frontend-test123.vercel.app'],
  tracePropagationTargets: ['amazon-frontend-test123', 'amazon-frontend-test123.vercel.app'],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  environment: 'production',
  release: 'frontend-1.0.0',
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <FaviconNotificationContextProvider>
    <App />
  </FaviconNotificationContextProvider>,
)

reportWebVitals()
