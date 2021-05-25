import {AuthView} from '@views/auth'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {Inventory} from '@views/client/inventory'
import {DocumentationView} from '@views/documentation'
import {RegistrationView} from '@views/registration'

export const routes = [
  {
    routePath: '/auth',
    component: AuthView,
    exact: false,
  },
  {
    routePath: '/registration',
    component: RegistrationView,
    exact: false,
  },
  {
    routePath: '/documentation',
    component: DocumentationView,
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
]
