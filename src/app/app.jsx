import { ConfigProvider, theme as antTheme } from 'antd'

import { Layout } from '../widgets/layout'
import { ToastifyProvider } from '../widgets/layout/navigation/toastify/toastify-provider'

import { useNotifications } from './providers/notifications'
import { Theme, useTheme } from './providers/theme-provider'

export const App = () => {
  useNotifications()
  const { theme } = useTheme()

  const customTheme = {
    algorithm: theme === Theme.LIGHT ? antTheme.defaultAlgorithm : antTheme.darkAlgorithm,
  }

  return (
    <ConfigProvider theme={customTheme} locale="en">
      <ToastifyProvider theme={theme} />
      <Layout />
    </ConfigProvider>
  )
}
