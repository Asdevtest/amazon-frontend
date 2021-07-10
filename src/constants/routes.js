import {AdminDashboardView} from '@views/admin/admin-dashboard-view'
import {AdminExchangeViews} from '@views/admin/admin-exchange-views'
import {AdminFinancesReplenishmentsView} from '@views/admin/admin-finances-views/admin-finances-replenishments-view'
import {AdminInventoryView} from '@views/admin/admin-inventory-view'
import {AdminOrdersViews} from '@views/admin/admin-orders-views'
import {AdminSettingsView} from '@views/admin/admin-settings-view'
import {AdminUserBalanceView} from '@views/admin/admin-users-view/admin-user-balance-view'
import {AdminUsersView} from '@views/admin/admin-users-view/admin-users-view'
import {AdminWarehouseBatchesView} from '@views/admin/admin-warehouse-views/admin-warehouse-batches-view'
import {AdminWarehouseBoxesView} from '@views/admin/admin-warehouse-views/admin-warehouse-boxes-view'
import {AdminWarehouseOrdersView} from '@views/admin/admin-warehouse-views/admin-warehouse-orders-view'
import {AuthView} from '@views/auth'
import {BuyerBatchesView} from '@views/buyer/buyer-batches-view'
import {BuyerMyProductsView} from '@views/buyer/buyer-my-products-view'
import {BuyerFreeOrdersView} from '@views/buyer/buyer-orders-views/buyer-free-orders-view'
import {BuyerMyOrdersView} from '@views/buyer/buyer-orders-views/buyer-my-orders-view'
import {BuyerProductView} from '@views/buyer/buyer-product-view/'
import {BuyerProductsView} from '@views/buyer/buyer-products-view/'
import {BuyerSubUsersView} from '@views/buyer/buyer-users-views/buyer-sub-users-view'
import {BuyerUserProfileView} from '@views/buyer/buyer-users-views/buyer-user-profile-view'
import {BuyerWarehouseView} from '@views/buyer/buyer-warehouse-view'
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
import {WarehouseCompletedTasksView} from '@views/warehouse/warehouse-completed-tasks-view'
import {WarehouseDashboardView} from '@views/warehouse/warehouse-dashboard-view'
import {WarehouseMyTasksView} from '@views/warehouse/warehouse-my-tasks-view'
import {WarehouseVacantTasksView} from '@views/warehouse/warehouse-vacant-tasks-view'
import {WarehouseWarehouseView} from '@views/warehouse/warehouse-warehouse-view/warehouse-warehouse-view'

import {UserRole} from './user-roles'

export const publicRoutesConfigs = [
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
]

export const privateRoutesConfigs = [
  {
    routePath: '/buyer/products',
    component: BuyerProductsView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/users/user-profile',
    component: BuyerUserProfileView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/users/sub-users',
    component: BuyerSubUsersView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/orders/my-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/orders/free-orders',
    component: BuyerFreeOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/my-products',
    component: BuyerMyProductsView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/batches',
    component: BuyerBatchesView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/warehouse',
    component: BuyerWarehouseView,
    exact: false,
    permission: [UserRole.BUYER],
  },

  {
    routePath: '/researcher/dashboard',
    component: ResearcherDashboardView,
    exact: false,
    permission: [UserRole.RESEARCHER],
  },
  {
    routePath: '/researcher/products',
    component: ResearcherProductsView,
    exact: false,
    permission: [UserRole.RESEARCHER],
  },
  {
    routePath: '/researcher/product',
    component: ResearcherProductView,
    exact: false,
    permission: [UserRole.RESEARCHER],
  },
  {
    routePath: '/researcher/settings',
    component: ResearcherSettingsView,
    exact: false,
    permission: [UserRole.RESEARCHER],
  },
  {
    routePath: '/client/dashboard',
    component: ClientDashboardView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/inventory',
    component: ClientInventoryView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/product',
    component: ClientProductView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/exchange',
    component: ClientExchangeView,
    exact: true,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/exchange/private-label',
    component: ClientExchangePrivateLabelView,
    exact: true,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/exchange/requests',
    component: ClientExchangeRequestsView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/batches',
    component: ClientBatchesView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/warehouse',
    component: ClientWarehouseView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/orders',
    component: ClientOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/orders/order',
    component: ClientOrderView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/users/user-profile',
    component: ClientUserProfileView,
    exact: false,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/users/sub-users',
    component: ClientSubUsersView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
  },
  {
    routePath: '/supervisor/products',
    component: SupervisorProductsView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
  },
  {
    routePath: '/supervisor/settings',
    component: SupervisorSettingsView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
  },
  {
    routePath: '/supervisor/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
  },
  {
    routePath: '/supervisor/ready-to-check',
    component: SupervisorReadyToCheckView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
  },
  {
    routePath: '/warehouse/dashboard',
    component: WarehouseDashboardView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/vacant-tasks',
    component: WarehouseVacantTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/my-tasks',
    component: WarehouseMyTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/boxes',
    component: WarehouseWarehouseView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/completed-tasks',
    component: WarehouseCompletedTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/admin/dashboard',
    component: AdminDashboardView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/exchange',
    component: AdminExchangeViews,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/inventory',
    component: AdminInventoryView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/orders',
    component: AdminOrdersViews,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/warehouse/orders',
    component: AdminWarehouseOrdersView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/warehouse/boxes',
    component: AdminWarehouseBoxesView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/warehouse/batches',
    component: AdminWarehouseBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/finances/replenishments',
    component: AdminFinancesReplenishmentsView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/users',
    component: AdminUsersView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/user/user_id/balance',
    component: AdminUserBalanceView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/settings',
    component: AdminSettingsView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
]
