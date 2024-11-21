import ReactDOM from 'react-dom/client'
import FaviconNotificationContextProvider from 'react-favicon-notification'
import 'reflect-metadata'

import '@services/mobx-persist-configure'

import { reportWebVitals } from '@utils/report-web-vitals'

import { App } from './app'
import './config/sentry'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/service-worker.js')
    .then(registration => {
      console.log('Service Worker зарегистрирован: ', registration)
    })
    .catch(error => {
      console.log('Service Worker регистрация не удалась: ', error)
    })
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <FaviconNotificationContextProvider>
    <App />
  </FaviconNotificationContextProvider>,
)

reportWebVitals()
