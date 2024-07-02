/* eslint-disable prefer-arrow/prefer-arrow-functions */

/* eslint-disable @typescript-eslint/no-shadow */
import { AppRoute } from '@shared/types/app-route/app-route.enum'
import { FallBack } from '@widgets/fall-back'
import { Layout } from '@widgets/layout'
import { createBrowserRouter } from 'react-router-dom'

import { AuthView } from '@views/auth'
import { RegistrationView } from '@views/registration'

import { routerPath } from './router.path'

export const router = createBrowserRouter([
  {
    path: routerPath[AppRoute.MAIN],
    element: <Layout />,
    errorElement: <FallBack />,
    children: [],
  },
  {
    path: routerPath[AppRoute.AUTH],
    element: <AuthView />,
  },
  {
    path: routerPath[AppRoute.REGISTRATION],
    element: <RegistrationView />,
  },
])
