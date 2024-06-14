import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app/app'
import './app/styles/index.scss'

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
  tracesSampleRate: 1.0,
  tracePropagationTargets: [/^https:\/\/amazon-frontend-test123\.vercel\.app/],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
})

const container = document.getElementById('root')!
const root = createRoot(container)
root.render(<App />)

reportWebVitals()
