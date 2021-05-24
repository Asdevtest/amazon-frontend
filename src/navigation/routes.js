import {AuthView} from '@views/auth'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientDashBoardView} from '@views/client/client-dashboard-view'
import {Inventory} from '@views/client/inventory'
import {Documentation} from '@views/documentation'
import {RegisterView} from '@views/register'

export const routes = [
  {
    routePath: '/documentation',
    component: Documentation,
    exact: false,
  },
  {
    routePath: '/inventory',
    component: Inventory,
    exact: false,
  },
  {
    routePath: '/dashboard',
    component: ClientDashboardView,
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
