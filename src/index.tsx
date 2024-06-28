import * as Sentry from '@sentry/react'
import { createRoot } from 'react-dom/client'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app/app'
import { ThemeProvider } from './app/providers/theme'
import './app/styles/index.scss'
import './shared/config/i18n'
import './shared/config/sentry'
import { FallBack } from './widgets/fall-back'

const container = document.getElementById('root')

// TODO: убрать условие и добавить номр правило TS-linter на '!'
if (container) {
  const root = createRoot(container)
  root.render(
    <Sentry.ErrorBoundary showDialog fallback={<FallBack />}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Sentry.ErrorBoundary>,
  )

  reportWebVitals()
} else {
  throw new Error('Root element not found')
}
