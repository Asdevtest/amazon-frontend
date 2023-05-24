import * as Sentry from '@sentry/react'
import { BrowserTracing } from '@sentry/tracing'

import React from 'react'

// import {DndProvider} from 'react-dnd'
// import {HTML5Backend} from 'react-dnd-html5-backend'
import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'

Sentry.init({
  integrations: [new BrowserTracing()],
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <FaviconNotificationContextProvider>
    {/* <DndProvider backend={HTML5Backend}> */}
    <App />
    {/* </DndProvider> */}
  </FaviconNotificationContextProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
