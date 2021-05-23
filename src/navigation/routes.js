import {AuthView} from '@views/auth'
import {ClientDashBoardView} from '@views/client/client-dashboard-view'
import {Documentation} from '@views/documentation'

export const routes = [
  {
    routePath: '/documentation',
    component: Documentation,
    exact: false,
  },
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
