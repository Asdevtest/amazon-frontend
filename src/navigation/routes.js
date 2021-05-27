import {AuthView} from '@views/auth'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {Product} from '@views/client/product'
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
    component: Product,
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
    routePath: '/dashboard',
    component: ClientDashboardView,
    exact: false,
  },
]
