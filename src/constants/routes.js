import {AdminDashboardView} from '@views/admin/admin-dashboard-view'
import {AdminExchangeViews} from '@views/admin/admin-exchange-views'
import {AdminFinancesViews} from '@views/admin/admin-finances-views/admin-finances-views'
import {AdminInventoryView} from '@views/admin/admin-inventory-view'
import {AdminOrderView} from '@views/admin/admin-orders-views/order'
import {AdminOrdersViews} from '@views/admin/admin-orders-views/orders'
import {AdminProductView} from '@views/admin/admin-product-view'
import {AdminSettingsView} from '@views/admin/admin-settings-view'
import {AdminUserPermissionsView} from '@views/admin/admin-user-permissions-view'
import {AdminUserBalanceView} from '@views/admin/admin-users-view/admin-user-balance-view'
import {AdminUsersView} from '@views/admin/admin-users-view/admin-users-view'
import {AdminWarehouseBatchesView} from '@views/admin/admin-warehouse-views/admin-warehouse-batches-view'
import {AdminWarehouseBoxesView} from '@views/admin/admin-warehouse-views/admin-warehouse-boxes-view'
import {AdminWarehouseTasksView} from '@views/admin/admin-warehouse-views/admin-warehouse-tasks-view'
import {AuthView} from '@views/auth'
import {BuyerDashboardView} from '@views/buyer/buyer-dashboard-view'
import {BuyerFinancesViews} from '@views/buyer/buyer-finances-views'
import {BuyerMyProductsView} from '@views/buyer/buyer-my-products-view'
import {BuyerFreeOrdersView} from '@views/buyer/buyer-orders-views/buyer-free-orders-view'
import {BuyerMyOrdersView} from '@views/buyer/buyer-orders-views/buyer-my-orders-view'
import {BuyerProductView} from '@views/buyer/buyer-product-view/'
import {BuyerProductsView} from '@views/buyer/buyer-products-view/'
import {BuyerSubUsersView} from '@views/buyer/buyer-users-views/buyer-sub-users-view'
import {ClientBatchesView} from '@views/client/client-batches-view'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-views/client-exchange-private-label-view'
import {ClientExchangeView} from '@views/client/client-exchange-views/client-exchange-view'
import {ClientFinancesViews} from '@views/client/client-finances-views'
import {ClientDailySellerBoardView} from '@views/client/client-integrations-views/client-daily-seller-board-view'
import {ClientLast30DaySellerBoardView} from '@views/client/client-integrations-views/client-last-30-day-seller-board-view'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientOrdersNotificationsView} from '@views/client/client-orders-notifications-view'
import {ClientOrderView} from '@views/client/client-orders-views/order'
import {ClientOrdersView} from '@views/client/client-orders-views/orders'
import {ClientProductView} from '@views/client/client-product-view/'
import {ClientRequestDetailCustomView} from '@views/client/client-requests-details-views/client-requests-detail-custom-view'
import {ClientRequestDetailNicheView} from '@views/client/client-requests-details-views/client-requests-detail-niche-view'
import {ClientRequestDetailProductView} from '@views/client/client-requests-details-views/client-requests-detail-product-view'
import {ClientСustomRequestsView} from '@views/client/client-requests-views/client-custom-requests-view'
import {ClientRequestsNichesView} from '@views/client/client-requests-views/client-requests-niches-view'
import {ClientRequestsProductsView} from '@views/client/client-requests-views/client-requests-products-view/client-requests-products-view'
import {ClientSettingsView} from '@views/client/client-settings-view'
import {ClientSubUsersView} from '@views/client/client-users-views/sub-users-view'
import {ClientWarehouseView} from '@views/client/client-warehouse-view'
import {DocumentationView} from '@views/documentation'
import {FreelancerDashboardView} from '@views/freelancer/freelancer-dashboard-view'
import {FreelancerFinancesViews} from '@views/freelancer/freelancer-finances-views'
import {FreelancerMyCustomRequestsView} from '@views/freelancer/freelancer-my-requests-views/freelancer-my-custom-requests-view/freelancer-my-custom-requests-view'
import {FreelancerMyNichesRequestsView} from '@views/freelancer/freelancer-my-requests-views/freelancer-my-niches-requests-view'
import {FreelancerMyProductsRequestsView} from '@views/freelancer/freelancer-my-requests-views/freelancer-my-products-requests-view'
import {FreelancerRequestDetailCustomView} from '@views/freelancer/freelancer-requests-details-views/freelancer-requests-detail-custom-view'
import {FreelancerСustomRequestsView} from '@views/freelancer/freelancer-requests-views/freelancer-custom-requests-view'
import {FreelancerVacantCustomRequestsView} from '@views/freelancer/freelancer-vacant-requests-views/freelancer-vacant-custom-requests-view'
import {FreelancerVacantNichesRequestsView} from '@views/freelancer/freelancer-vacant-requests-views/freelancer-vacant-niches-requests-view'
import {FreelancerVacantProductsRequestsView} from '@views/freelancer/freelancer-vacant-requests-views/freelancer-vacant-products-requests-view'
import {UserProfileView} from '@views/overall/user-profile-view/user-profile-view'
import {RegistrationView} from '@views/registration'
import {ResearcherDashboardView} from '@views/researcher/researcher-dashboard-view'
import {ResearcherFinancesViews} from '@views/researcher/researcher-finances-views'
import {ResearcherMyCustomRequestsView} from '@views/researcher/researcher-my-requests-views/researcher-my-custom-requests-view/researcher-my-custom-requests-view'
import {ResearcherMyNichesRequestsView} from '@views/researcher/researcher-my-requests-views/researcher-my-niches-requests-view'
import {ResearcherMyProductsRequestsView} from '@views/researcher/researcher-my-requests-views/researcher-my-products-requests-view'
import {ResearcherProductView} from '@views/researcher/researcher-product-view/researcher-product-view'
import {ResearcherProductsView} from '@views/researcher/researcher-products-view'
import {ResearcherRequestDetailCustomView} from '@views/researcher/researcher-requests-details-views/researcher-requests-detail-custom-view'
import {ResearcherRequestDetailNicheView} from '@views/researcher/researcher-requests-details-views/researcher-requests-detail-niche-view'
import {ResearcherRequestDetailProductView} from '@views/researcher/researcher-requests-details-views/researcher-requests-detail-product-view'
import {ResearcherSettingsView} from '@views/researcher/researcher-settings-view'
import {ResearcherSubUsersView} from '@views/researcher/researcher-users-views/researcher-sub-users-view'
import {ResearcherVacantCustomRequestsView} from '@views/researcher/researcher-vacant-requests-views/researcher-vacant-custom-requests-view'
import {ResearcherVacantNichesRequestsView} from '@views/researcher/researcher-vacant-requests-views/researcher-vacant-niches-requests-view'
import {ResearcherVacantProductsRequestsView} from '@views/researcher/researcher-vacant-requests-views/researcher-vacant-products-requests-view'
import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'
import {SupervisorFinancesViews} from '@views/supervisor/supervisor-finances-views'
import {SupervisorProductView} from '@views/supervisor/supervisor-product-view/supervisor-product-view'
import {SupervisorProductsView} from '@views/supervisor/supervisor-products-view/'
import {SupervisorReadyToCheckView} from '@views/supervisor/supervisor-ready-to-check-view'
import {SupervisorSettingsView} from '@views/supervisor/supervisor-settings-view/supervisor-settings-view'
import {SupervisorSubUsersView} from '@views/supervisor/supervisor-users-views/supervisor-sub-users-view'
import {TermsView} from '@views/terms'
import {WarehouseBatchesView} from '@views/warehouse/warehouse-batches-view/warehouse-batches-view'
import {WarehouseCanceledTasksView} from '@views/warehouse/warehouse-canceled-tasks-view'
import {WarehouseCompletedTasksView} from '@views/warehouse/warehouse-completed-tasks-view'
import {WarehouseDashboardView} from '@views/warehouse/warehouse-dashboard-view'
import {WarehouseFinancesViews} from '@views/warehouse/warehouse-finances-views'
import {WarehouseMyTasksView} from '@views/warehouse/warehouse-my-tasks-view'
import {WarehouseMyWarehouseView} from '@views/warehouse/warehouse-my-warehouse-view'
import {WarehouseSubUsersView} from '@views/warehouse/warehouse-users-views/warehouse-sub-users-view'
import {WarehouseVacantTasksView} from '@views/warehouse/warehouse-vacant-tasks-view'

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

  {
    routePath: '/terms',
    component: TermsView,
    exact: false,
  },
]

export const overallRoutesConfigs = [
  {
    routePath: '/profile',
    component: UserProfileView,
    exact: false,
  },
]

export const privateRoutesConfigs = [
  {
    routePath: '/buyer/dashboard',
    component: BuyerDashboardView,
    exact: false,
    permission: [UserRole.BUYER],
  },

  {
    routePath: '/buyer/products',
    component: BuyerProductsView,
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
    routePath: '/buyer/my-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
  },
  {
    routePath: '/buyer/free-orders',
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
    routePath: '/buyer/finances',
    component: BuyerFinancesViews,
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
    routePath: '/researcher/my-requests/products',
    component: ResearcherMyProductsRequestsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/my-requests/niches',
    component: ResearcherMyNichesRequestsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/my-requests/custom',
    component: ResearcherMyCustomRequestsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/requests/products',
    component: ResearcherVacantProductsRequestsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/requests/custom',
    component: ResearcherVacantCustomRequestsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/requests/niches',
    component: ResearcherVacantNichesRequestsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/product',
    component: ResearcherProductView,
    exact: false,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/product-search-request',
    component: ResearcherRequestDetailProductView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/niche-search-request',
    component: ResearcherRequestDetailNicheView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/custom-search-request',
    component: ResearcherRequestDetailCustomView,
    exact: true,
    permission: [UserRole.RESEARCHER],
  },

  {
    routePath: '/researcher/users/sub-users',
    component: ResearcherSubUsersView,
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
    routePath: '/researcher/finances',
    component: ResearcherFinancesViews,
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
    routePath: '/client/exchange/requests/products',
    component: ClientRequestsProductsView,
    exact: false,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/exchange/requests/niches',
    component: ClientRequestsNichesView,
    exact: false,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/exchange/requests/custom',
    component: ClientСustomRequestsView,
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
    routePath: '/client/integrations/daily',
    component: ClientDailySellerBoardView,
    exact: false,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/integrations/last-30-day',
    component: ClientLast30DaySellerBoardView,
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
    routePath: '/client/settings',
    component: ClientSettingsView,
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
    routePath: '/client/product-search-request',
    component: ClientRequestDetailProductView,
    exact: true,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/niche-search-request',
    component: ClientRequestDetailNicheView,
    exact: true,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/custom-search-request',
    component: ClientRequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/users/sub-users',
    component: ClientSubUsersView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/orders-notifications',
    component: ClientOrdersNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
  },
  {
    routePath: '/client/finances',
    component: ClientFinancesViews,
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
    routePath: '/supervisor/users/sub-users',
    component: SupervisorSubUsersView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
  },
  {
    routePath: '/supervisor/finances',
    component: SupervisorFinancesViews,
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
    component: WarehouseBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/my-warehouse',
    component: WarehouseMyWarehouseView,
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
    routePath: '/warehouse/users/sub-users',
    component: WarehouseSubUsersView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },

  {
    routePath: '/warehouse/canceled-tasks',
    component: WarehouseCanceledTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/warehouse',
    component: WarehouseBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },
  {
    routePath: '/warehouse/finances',
    component: WarehouseFinancesViews,
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
    routePath: '/admin/orders/order',
    component: AdminOrderView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/permissions',
    component: AdminUserPermissionsView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/orders',
    component: AdminOrdersViews,
    exact: true,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/product',
    component: AdminProductView,
    exact: false,
    permission: [UserRole.ADMIN],
  },
  {
    routePath: '/admin/warehouse/tasks',
    component: AdminWarehouseTasksView,
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
    routePath: '/admin/finances',
    component: AdminFinancesViews,
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

  {
    routePath: '/freelancer/dashboard',
    component: FreelancerDashboardView,
    exact: false,
    permission: [UserRole.FREELANCER],
  },
  {
    routePath: '/freelancer/my-requests/products',
    component: FreelancerMyProductsRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/my-requests/niches',
    component: FreelancerMyNichesRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/requests/products',
    component: FreelancerVacantProductsRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/exchange/requests/custom',
    component: FreelancerСustomRequestsView,
    exact: false,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/requests/niches',
    component: FreelancerVacantNichesRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/requests/custom',
    component: FreelancerVacantCustomRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/custom-search-request',
    component: FreelancerRequestDetailCustomView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/my-requests/custom',
    component: FreelancerMyCustomRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/finances',
    component: FreelancerFinancesViews,
    exact: false,
    permission: [UserRole.FREELANCER],
  },
]
