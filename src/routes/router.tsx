/* eslint-disable prefer-arrow/prefer-arrow-functions */

/* eslint-disable @typescript-eslint/no-shadow */
import { createBrowserRouter } from 'react-router-dom'

import { lazyImport } from '@utils/lazy-import'

import { AuthView } from '../ui/views/auth'
import { Contact } from '../widgets/contacts'
import { FallBack } from '../widgets/fall-back'
import { Layout } from '../widgets/layout'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <FallBack />,
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthView />,

    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
])
