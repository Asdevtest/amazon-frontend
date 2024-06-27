import { ConfigProvider, theme as antTheme } from 'antd'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'

import { router } from '../routes/router'
import { ToastifyProvider } from '../widgets/navigation/toastify/toastify-provider'

import { useNotifications } from './providers/notifications'
import { Theme, useTheme } from './providers/theme'

export const App = () => {
  useNotifications()
  const { theme } = useTheme()

  const customTheme = {
    algorithm: theme === Theme.LIGHT ? antTheme.defaultAlgorithm : antTheme.darkAlgorithm,
  }

  return (
    <ConfigProvider theme={customTheme} locale="en">
      <ToastifyProvider theme={theme} />
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
    </ConfigProvider>
  )
}
