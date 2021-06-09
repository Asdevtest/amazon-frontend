import {AuthView} from '@views/auth'
import {BuyerBatchesView} from '@views/buyer/buyer-batches-view'
import {BuyerMyProductsView} from '@views/buyer/buyer-my-products-view'
import {BuyerFreeOrdersView} from '@views/buyer/buyer-orders-views/buyer-free-orders-view'
import {BuyerMyOrdersView} from '@views/buyer/buyer-orders-views/buyer-my-orders-view'
import {BuyerProductView} from '@views/buyer/buyer-product-view/'
import {BuyerProductsView} from '@views/buyer/buyer-products-view/'
import {BuyerSubUsersView} from '@views/buyer/buyer-users-views/buyer-sub-users-view'
import {BuyerUserProfileView} from '@views/buyer/buyer-users-views/buyer-user-profile-view'
import {ClientBatchesView} from '@views/client/client-batches-view'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-views/client-exchange-private-label-view'
import {ClientExchangeRequestsView} from '@views/client/client-exchange-views/client-exchange-requests-view'
import {ClientExchangeView} from '@views/client/client-exchange-views/client-exchange-view'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientOrderView} from '@views/client/client-orders-views/order'
import {ClientOrdersView} from '@views/client/client-orders-views/orders'
import {ClientProductView} from '@views/client/client-product-view'
import {ClientSubUsersView} from '@views/client/client-users-views/sub-users-view'
import {ClientUserProfileView} from '@views/client/client-users-views/user-profile-view'
import {ClientWarehouseView} from '@views/client/client-warehouse-view'
import {DocumentationView} from '@views/documentation'
import {RegistrationView} from '@views/registration'
import {ResearcherDashboardView} from '@views/researcher/researcher-dashboard-view'
import {ResearcherProductView} from '@views/researcher/researcher-product-view/researcher-product-view'
import {ResearcherProductsView} from '@views/researcher/researcher-products-view'
import {ResearcherSettingsView} from '@views/researcher/researcher-settings-view'
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
    component: BuyerUserProfileView,
    exact: false,
  },

  {
    routePath: '/buyer/users/sub-users',
    component: BuyerSubUsersView,
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
    component: BuyerMyOrdersView,
    exact: false,
  },
  {
    routePath: '/buyer/orders/free-orders',
    component: BuyerFreeOrdersView,
    exact: false,
  },
  {
    routePath: '/buyer/my-products',
    component: BuyerMyProductsView,
    exact: false,
  },

  {
    routePath: '/buyer/batches',
    component: BuyerBatchesView,
    exact: false,
  },
  {
    routePath: '/researcher/settings',
    component: ResearcherSettingsView,
    exact: false,
  },
  {
    routePath: '/researcher/products',
    component: ResearcherProductsView,
    exact: false,
  },
  {
    routePath: '/researcher/dashboard',
    component: ResearcherDashboardView,
    exact: false,
  },
  {
    routePath: '/researcher/product',
    component: ResearcherProductView,
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
    routePath: '/client/warehouse',
    component: ClientWarehouseView,
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
