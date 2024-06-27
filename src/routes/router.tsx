/* eslint-disable prefer-arrow/prefer-arrow-functions */

/* eslint-disable @typescript-eslint/no-shadow */
import { FallBack } from '@widgets/fall-back'
import { Layout } from '@widgets/layout'
import { createBrowserRouter } from 'react-router-dom'

import { AuthView } from '@views/auth'
import { RegistrationView } from '@views/registration'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <FallBack />,
  },
  {
    path: '/auth',
    element: <AuthView />,
  },
  {
    path: '/registration',
    element: <RegistrationView />,
  },
])
