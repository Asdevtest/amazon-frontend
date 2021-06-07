import {AuthView} from '@views/auth'
import {BatchesView} from '@views/buyer/batches-view'
import {MyProductsView} from '@views/buyer/my-products-view'
import {FreeOrdersView} from '@views/buyer/orders-views/free-orders-view'
import {MyOrdersView} from '@views/buyer/orders-views/my-orders-view'
import {BuyerProductView} from '@views/buyer/product-view/'
import {BuyerProductsView} from '@views/buyer/products-view/'
import {SubUsersView} from '@views/buyer/users-views/sub-users-view'
import {UserProfileView} from '@views/buyer/users-views/user-profile-view'
import {ClientBatchesView} from '@views/client/client-batches-view'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangeView} from '@views/client/client-exchange-view/exchange'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-view/private-label'
import {ClientExchangeRequestsView} from '@views/client/client-exchange-view/requests'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientOrderView} from '@views/client/client-orders-views/order'
import {ClientOrdersView} from '@views/client/client-orders-views/orders'
import {ClientProductView} from '@views/client/client-product-view'
import {ClientSubUsersView} from '@views/client/client-users-views/sub-users-view'
import {ClientUserProfileView} from '@views/client/client-users-views/user-profile-view'
import {DocumentationView} from '@views/documentation'
import {FreelancerDashboardView} from '@views/freelancer/dashboard-view'
import {FreelancerProductsView} from '@views/freelancer/products-view'
import {FreelancerSettingsView} from '@views/freelancer/settings-view'
import {RegistrationView} from '@views/registration'
import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'
import {SupervisorProductView} from '@views/supervisor/supervisor-product-view/supervisor-product-view'
import {SupervisorProductsView} from '@views/supervisor/supervisor-products-view'
import {SupervisorReadyToCheckView} from '@views/supervisor/supervisor-ready-to-check-view'
import {SupervisorSettingsView} from '@views/supervisor/supervisor-settings-view/supervisor-settings-view'

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
    routePath: '/buyer/users/user-profile',
    component: UserProfileView,
    exact: false,
  },

  {
    routePath: '/buyer/users/sub-users',
    component: SubUsersView,
    exact: false,
  },

  {
    routePath: '/buyer/products',
    component: BuyerProductsView,
    exact: false,
  },

  {
    routePath: '/buyer/product',
    component: BuyerProductView,
    exact: false,
  },

  {
    routePath: '/buyer/orders/my-orders',
    component: MyOrdersView,
    exact: false,
  },
  {
    routePath: '/buyer/orders/free-orders',
    component: FreeOrdersView,
    exact: false,
  },
  {
    routePath: '/buyer/my-products',
    component: MyProductsView,
    exact: false,
  },

  {
    routePath: '/buyer/batches',
    component: BatchesView,
    exact: false,
  },
  {
    routePath: '/freelancer/settings',
    component: FreelancerSettingsView,
    exact: false,
  },
  {
    routePath: '/freelancer/products',
    component: FreelancerProductsView,
    exact: false,
  },
  {
    routePath: '/freelancer/dashboard',
    component: FreelancerDashboardView,
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
    routePath: '/client/exchange/private-label',
    component: ClientExchangePrivateLabelView,
    exact: true,
  },
  {
    routePath: '/client/exchange/requests',
    component: ClientExchangeRequestsView,
    exact: false,
  },
  {
    routePath: '/client/batches',
    component: ClientBatchesView,
    exact: false,
  },
  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
  },
  {
    routePath: '/client/orders',
    component: ClientOrdersView,
    exact: true,
  },
  {
    routePath: '/client/orders/order',
    component: ClientOrderView,
    exact: false,
  },
  {
    routePath: '/client/users/user-profile',
    component: ClientUserProfileView,
    exact: false,
  },

  {
    routePath: '/client/users/sub-users',
    component: ClientSubUsersView,
    exact: false,
  },
  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
  },
  {
    routePath: '/supervisor/products',
    component: SupervisorProductsView,
    exact: false,
  },
  {
    routePath: '/supervisor/settings',
    component: SupervisorSettingsView,
    exact: false,
  },
  {
    routePath: '/supervisor/product',
    component: SupervisorProductView,
    exact: false,
  },
  {
    routePath: '/supervisor/ready-to-check',
    component: SupervisorReadyToCheckView,
    exact: false,
  },
]
