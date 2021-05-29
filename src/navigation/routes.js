import {AuthView} from '@views/auth'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangeView} from '@views/client/client-exchange-view/exchange'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-view/private-label'
import {ClientExchangeRequestsView} from '@views/client/client-exchange-view/requests'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientProductView} from '@views/client/client-product-view'
import {DocumentationView} from '@views/documentation'
import {DashboardView} from '@views/freelancer/dashboard-view'
import {ProductsView} from '@views/freelancer/products-view'
import {SettingsView} from '@views/freelancer/settings-view'
import {RegistrationView} from '@views/registration'
import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'

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
    routePath: '/freelancer/settings',
    component: SettingsView,
    exact: false,
  },
  {
    routePath: '/freelancer/products',
    component: ProductsView,
    exact: false,
  },
  {
    routePath: '/freelancer/dashboard',
    component: DashboardView,
    exact: false,
  },
  {
    routePath: '/client/inventory',
    component: ClientInventoryView,
    exact: false,
  },
  {
    routePath: '/client/product',
    component: ClientProductView,
    exact: false,
  },
  {
    routePath: '/client/dashboard',
    component: ClientDashboardView,
    exact: false,
  },
  {
    routePath: '/client/exchange',
    component: ClientExchangeView,
    exact: true,
  },
  {
    routePath: '/exchange/private-label',
    component: ClientExchangePrivateLabelView,
    exact: true,
  },
  {
    routePath: '/exchange/requests',
    component: ClientExchangeRequestsView,
    exact: false,
  },
  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
  },
]
