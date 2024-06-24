import { ConfigProvider, theme as antTheme } from 'antd'
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
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
