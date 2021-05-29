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

export const routes = [
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
    routePath: '/auth',
    component: AuthView,
    exact: false,
  },
  {
    routePath: '/product',
    component: ClientProductView,
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
    component: ClientInventoryView,
    exact: false,
  },
  {
    routePath: '/exchange',
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
    routePath: '/dashboard',
    component: ClientDashboardView,
    exact: false,
  },
]
