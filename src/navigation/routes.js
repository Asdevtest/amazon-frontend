import {AuthView} from '@views/auth'
import {ClientDashBoardView} from '@views/client/client-dashboard-view'
import {RegisterView} from '@views/register'

export const routes = [
  {
    routePath: '/dashboard',
    component: ClientDashBoardView,
    exact: false,
  },
  {
    routePath: '/auth',
    component: AuthView,
    exact: false,
  },
  {
    routePath: '/register',
    component: RegisterView,
    exact: false,
  },
]
