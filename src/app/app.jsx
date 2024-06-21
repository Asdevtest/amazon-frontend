import { ConfigProvider, theme as antTheme } from 'antd'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { Contact } from '../widgets/contacts'
import { Layout } from '../widgets/layout'
import { ToastifyProvider } from '../widgets/navigation/toastify/toastify-provider'

import { useNotifications } from './providers/notifications'
import { Theme, useTheme } from './providers/theme'

export const App = () => {
  useNotifications()
  const { theme } = useTheme()

  const customTheme = {
    algorithm: theme === Theme.LIGHT ? antTheme.defaultAlgorithm : antTheme.darkAlgorithm,
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: 'contacts/:contactId',
          element: <Contact />,
        },
      ],
    },
  ])

  return (
    <ConfigProvider theme={customTheme} locale="en">
      <ToastifyProvider theme={theme} />
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}
