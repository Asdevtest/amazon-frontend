import {AdminAwaitingBatchesView} from '@views/admin/admin-batches-views/admin-awaiting-batches-view'
import {AdminBatchesView} from '@views/admin/admin-batches-views/admin-batches-view'
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
import {AdminDestinationsView} from '@views/admin/admin-warehouse-views/admin-destinations-view'
import {AdminWarehouseBoxesView} from '@views/admin/admin-warehouse-views/admin-warehouse-boxes-view'
import {AdminWarehouseTasksView} from '@views/admin/admin-warehouse-views/admin-warehouse-tasks-view'
import {AuthView} from '@views/auth'
import {BuyerDashboardView} from '@views/buyer/buyer-dashboard-view'
import {BuyerFinancesViews} from '@views/buyer/buyer-finances-views'
import {BuyerMyProductsView} from '@views/buyer/buyer-my-products-view'
import {BuyerFreeOrdersView} from '@views/buyer/buyer-orders-views/buyer-free-orders-view'
import {BuyerMyOrdersView} from '@views/buyer/buyer-orders-views/buyer-my-orders-view'
import {BuyerProductView} from '@views/buyer/buyer-product-view/'
import {BuyerSearchSupplierByClientView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-client-view'
import {BuyerSearchSupplierBySupervisorView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-supervisor-view'
import {BuyerSubUsersView} from '@views/buyer/buyer-users-views/buyer-sub-users-view'
import {ClientAwaitingBatchesView} from '@views/client/client-batches-views/client-awaiting-batches-view'
import {ClientBatchesView} from '@views/client/client-batches-views/client-batches-view'
import {ClientReadyBoxesView} from '@views/client/client-batches-views/client-ready-boxes-view'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-views/client-exchange-private-label-view'
import {ClientExchangeView} from '@views/client/client-exchange-views/client-exchange-view'
import {ClientFinancesViews} from '@views/client/client-finances-views'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientBoxesNotificationsView} from '@views/client/client-notifications-views/client-boxes-notifications-view'
import {ClientBoxesTariffsNotificationsView} from '@views/client/client-notifications-views/client-boxes-tariffs-notifications-view'
import {ClientOrdersNotificationsView} from '@views/client/client-notifications-views/client-orders-notifications-view'
import {ClientOrderView} from '@views/client/client-orders-views/order'
import {ClientOrdersView} from '@views/client/client-orders-views/orders'
import {ClientProductView} from '@views/client/client-product-view/'
import {ClientSettingsView} from '@views/client/client-settings-view'
import {ClientShopsView} from '@views/client/client-shops-view'
import {ClientSubUsersView} from '@views/client/client-users-views/sub-users-view'
import {ClientWarehouseView} from '@views/client/client-warehouse-view'
import {FreelancerDashboardView} from '@views/freelancer/freelancer-dashboard-view'
import {FreelancerFinancesViews} from '@views/freelancer/freelancer-finances-views'
import {FreelancerSubUsersView} from '@views/freelancer/freelancer-users-views/freelancer-sub-users-view'
import {RegistrationView} from '@views/registration'
import {ResearcherDashboardView} from '@views/researcher/researcher-dashboard-view'
import {ResearcherFinancesViews} from '@views/researcher/researcher-finances-views'
// import {ResearcherMyCustomRequestsView} from '@views/researcher/researcher-my-requests-views/researcher-my-custom-requests-view/researcher-my-custom-requests-view'
// import {ResearcherMyProductsRequestsView} from '@views/researcher/researcher-my-requests-views/researcher-my-products-requests-view'
import {ResearcherProductView} from '@views/researcher/researcher-product-view/researcher-product-view'
import {ResearcherProductsView} from '@views/researcher/researcher-products-view'
import {ResearcherSubUsersView} from '@views/researcher/researcher-users-views/researcher-sub-users-view'
// import {ResearcherRequestDetailCustomView} from '@views/researcher/researcher-requests-details-views/researcher-requests-detail-custom-view'
// import {ResearcherRequestDetailNicheView} from '@views/researcher/researcher-requests-details-views/researcher-requests-detail-niche-view'
// import {ResearcherRequestDetailProductView} from '@views/researcher/researcher-requests-details-views/researcher-requests-detail-product-view'
// import {ResearcherSettingsView} from '@views/researcher/researcher-settings-view'
// import {ResearcherSubUsersView} from '@views/researcher/researcher-users-views/researcher-sub-users-view'
// import {ResearcherVacantCustomRequestsView} from '@views/researcher/researcher-vacant-requests-views/researcher-vacant-custom-requests-view'
// import {ResearcherVacantNichesRequestsView} from '@views/researcher/researcher-vacant-requests-views/researcher-vacant-niches-requests-view'
// import {ResearcherVacantProductsRequestsView} from '@views/researcher/researcher-vacant-requests-views/researcher-vacant-products-requests-view'
import {AnotherUserProfileView} from '@views/shared/another-user-profile-view'
import {CreateOrEditProposalView} from '@views/shared/create-or-edit-proposal-view'
import {CreateOrEditRequestView} from '@views/shared/create-or-edit-request-view'
import {MyProposalsView} from '@views/shared/my-proposals-view'
import {MyRequestsView} from '@views/shared/my-requests-view'
import {OwnerRequestDetailCustomView} from '@views/shared/owner-requests-detail-custom-view'
import {RequestDetailCustomView} from '@views/shared/servant-requests-detail-custom-view'
import {UserProfileView} from '@views/shared/user-profile-view/user-profile-view'
import {VacantRequestsView} from '@views/shared/vacant-requests-view/vacant-requests-view'
import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'
import {SupervisorFinancesViews} from '@views/supervisor/supervisor-finances-views'
import {SupervisorProductView} from '@views/supervisor/supervisor-product-view/supervisor-product-view'
import {SupervisorProductsView} from '@views/supervisor/supervisor-products-view/'
import {SupervisorReadyToCheckByClientView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-by-client-view'
import {SupervisorReadyToCheckView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-view'
// import {SupervisorSettingsView} from '@views/supervisor/supervisor-settings-view/supervisor-settings-view'
import {SupervisorSubUsersView} from '@views/supervisor/supervisor-users-views/supervisor-sub-users-view'
import {TermsView} from '@views/terms'
import {WarehouseAwaitingBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-awaiting-batches-view'
import {WarehouseBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-batches-view/warehouse-batches-view'
import {WarehouseDashboardView} from '@views/warehouse/warehouse-dashboard-view'
import {WarehouseFinancesViews} from '@views/warehouse/warehouse-finances-views'
import {WarehouseManagementView} from '@views/warehouse/warehouse-management-view'
import {WarehouseMyWarehouseView} from '@views/warehouse/warehouse-my-warehouse-view'
import {WarehouseCanceledTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-canceled-tasks-view'
import {WarehouseCompletedTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-completed-tasks-view'
import {WarehouseMyTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-my-tasks-view'
import {WarehouseVacantTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-vacant-tasks-view'
import {WarehouseSubUsersView} from '@views/warehouse/warehouse-users-views/warehouse-sub-users-view'

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

  {
    routePath: '/another-user',
    component: AnotherUserProfileView,
    exact: false,
  },

  {
    routePath: '/requests/my',
    component: MyRequestsView,
    exact: false,
  },

  {
    routePath: '/requests/my-proposals',
    component: MyProposalsView,
    exact: false,
  },

  {
    routePath: '/custom-request',
    component: OwnerRequestDetailCustomView,
    exact: true,
  },

  {
    routePath: '/create-or-edit-request',
    component: CreateOrEditRequestView,
    exact: false,
  },

  {
    routePath: '/vacant-requests',
    component: VacantRequestsView,
    exact: false,
  },

  {
    routePath: '/custom-search-request',
    component: RequestDetailCustomView,
    exact: false,
  },

  {
    routePath: '/create-or-edit-proposal',
    component: CreateOrEditProposalView,
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
    routePath: '/buyer/search-supplier-by-supervisor',
    component: BuyerSearchSupplierBySupervisorView,
    exact: false,
    permission: [UserRole.BUYER],
  },

  {
    routePath: '/buyer/search-supplier-by-client',
    component: BuyerSearchSupplierByClientView,
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

  // {
  //   routePath: '/researcher/my-requests/products',
  //   component: ResearcherMyProductsRequestsView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  // {
  //   routePath: '/researcher/my-requests/niches',
  //   component: ResearcherMyNichesRequestsView,
  //   exact: true,
  //   permission: [ UserRole.RESEARCHER ]
  // },

  // {
  //   routePath: '/researcher/my-requests/custom',
  //   component: ResearcherMyCustomRequestsView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  // {
  //   routePath: '/researcher/requests/products',
  //   component: ResearcherVacantProductsRequestsView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  // {
  //   routePath: '/researcher/requests/custom',
  //   component: ResearcherVacantCustomRequestsView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  // {
  //   routePath: '/researcher/requests/niches',
  //   component: ResearcherVacantNichesRequestsView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  {
    routePath: '/researcher/product',
    component: ResearcherProductView,
    exact: false,
    permission: [UserRole.RESEARCHER],
  },

  // {
  //   routePath: '/researcher/product-search-request',
  //   component: ResearcherRequestDetailProductView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  // {
  //   routePath: '/researcher/niche-search-request',
  //   component: ResearcherRequestDetailNicheView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  // {
  //   routePath: '/researcher/custom-search-request',
  //   component: ResearcherRequestDetailCustomView,
  //   exact: true,
  //   permission: [UserRole.RESEARCHER],
  // },

  {
    routePath: '/researcher/users/sub-users',
    component: ResearcherSubUsersView,
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
    routePath: '/client/boxes-ready-to-batch',
    component: ClientReadyBoxesView,
    exact: false,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/awaiting-batch',
    component: ClientAwaitingBatchesView,
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
    routePath: '/client/shops',
    component: ClientShopsView,
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
    routePath: '/client/boxes-notifications',
    component: ClientBoxesNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
  },

  {
    routePath: '/client/tariffs-notifications',
    component: ClientBoxesTariffsNotificationsView,
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
  // {
  //   routePath: '/supervisor/settings',
  //   component: SupervisorSettingsView,
  //   exact: false,
  //   permission: [UserRole.SUPERVISOR],
  // },
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
    routePath: '/supervisor/ready-to-check-by-client',
    component: SupervisorReadyToCheckByClientView,
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
    routePath: '/warehouse/awaiting-batches',
    component: WarehouseAwaitingBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
  },

  {
    routePath: '/warehouse/batches',
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
    routePath: '/warehouse/management',
    component: WarehouseManagementView,
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
    routePath: '/admin/warehouse/destinations',
    component: AdminDestinationsView,
    exact: false,
    permission: [UserRole.ADMIN],
  },

  {
    routePath: '/admin/awaiting-batches',
    component: AdminAwaitingBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
  },

  {
    routePath: '/admin/batches',
    component: AdminBatchesView,
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
    routePath: '/freelancer/users/sub-users',
    component: FreelancerSubUsersView,
    exact: false,
    permission: [UserRole.FREELANCER],
  },

  {
    routePath: '/freelancer/finances',
    component: FreelancerFinancesViews,
    exact: false,
    permission: [UserRole.FREELANCER],
  },
]
