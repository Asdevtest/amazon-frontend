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
import {ClientAwaitingBatchesView} from '@views/client/client-batches-views/client-awaiting-batches-view'
import {ClientBatchesView} from '@views/client/client-batches-views/client-batches-view'
import {ClientReadyBoxesView} from '@views/client/client-batches-views/client-ready-boxes-view'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-views/client-exchange-private-label-view'
import {ClientExchangeView} from '@views/client/client-exchange-views/client-exchange-view'
import {ClientFinancesViews} from '@views/client/client-finances-views'
import {ClientFreelanceView} from '@views/client/client-freelance-view'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientBoxesNotificationsView} from '@views/client/client-notifications-views/client-boxes-notifications-view'
import {ClientBoxesTariffsNotificationsView} from '@views/client/client-notifications-views/client-boxes-tariffs-notifications-view'
import {ClientOrdersNotificationsView} from '@views/client/client-notifications-views/client-orders-notifications-view'
import {ClientOrderView} from '@views/client/client-orders-views/order'
import {ClientOrdersView} from '@views/client/client-orders-views/orders'
import {ClientProductExchangeView} from '@views/client/client-product-exchange-view'
import {ClientProductView} from '@views/client/client-product-view/'
import {ClientSettingsView} from '@views/client/client-settings-view'
import {ClientShopsView} from '@views/client/client-shops-view'
import {ClientWarehouseView} from '@views/client/client-warehouse-view'
import {FreelancerDashboardView} from '@views/freelancer/freelancer-dashboard-view'
import {FreelancerFinancesViews} from '@views/freelancer/freelancer-finances-views'
import {FreelancerFreelanceView} from '@views/freelancer/freelancer-freelance-view'
import {RegistrationView} from '@views/registration'
import {ResearcherDashboardView} from '@views/researcher/researcher-dashboard-view'
import {ResearcherFinancesViews} from '@views/researcher/researcher-finances-views'
import {ResearcherProductView} from '@views/researcher/researcher-product-view/researcher-product-view'
import {ResearcherProductsView} from '@views/researcher/researcher-products-view'
import {AnotherUserProfileView} from '@views/shared/another-user-profile-view'
import {CreateOrEditProposalView} from '@views/shared/create-or-edit-proposal-view'
import {CreateOrEditRequestView} from '@views/shared/create-or-edit-request-view'
import {MyProposalsView} from '@views/shared/my-proposals-view'
import {MyRequestsView} from '@views/shared/my-requests-view'
import {OwnerRequestDetailCustomView} from '@views/shared/owner-requests-detail-custom-view'
import {RequestDetailCustomView} from '@views/shared/servant-requests-detail-custom-view'
import {SubUsersView} from '@views/shared/sub-users-view/sub-users-view'
import {UserProfileView} from '@views/shared/user-profile-view/user-profile-view'
import {VacantRequestsView} from '@views/shared/vacant-requests-view/vacant-requests-view'
import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'
import {SupervisorFinancesViews} from '@views/supervisor/supervisor-finances-views'
import {SupervisorProductView} from '@views/supervisor/supervisor-product-view/supervisor-product-view'
import {SupervisorProductsView} from '@views/supervisor/supervisor-products-view/'
import {SupervisorReadyToCheckByClientView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-by-client-view'
import {SupervisorReadyToCheckView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-view'
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

import {TranslationKey} from './translations/translation-key'
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
    crumbNameKey: TranslationKey.Profile,
  },

  {
    routePath: '/another-user',
    component: AnotherUserProfileView,
    exact: false,
    crumbNameKey: TranslationKey.User,
  },

  // {
  //   routePath: '/requests/my',
  //   component: MyRequestsView,
  //   exact: false,
  //   crumbNameKey: TranslationKey['My requests']
  // },

  // {
  //   routePath: '/requests/my-proposals',
  //   component: MyProposalsView,
  //   exact: false,
  //   crumbNameKey: TranslationKey['My proposals']
  // },

  // {
  //   routePath: '/custom-request',
  //   component: OwnerRequestDetailCustomView,
  //   exact: true,
  //   crumbNameKey: TranslationKey['My request']
  // },

  // {
  //   routePath: '/create-or-edit-request',
  //   component: CreateOrEditRequestView,
  //   exact: false,
  //   crumbNameKey: TranslationKey['Create a request']
  // },

  // {
  //   routePath: '/vacant-requests',
  //   component: VacantRequestsView,
  //   exact: false,
  //   crumbNameKey: TranslationKey['Vacant requests']
  // },

  // {
  //   routePath: '/custom-search-request',
  //   component: RequestDetailCustomView,
  //   exact: false,
  //   crumbNameKey: TranslationKey.Request
  // },

  // {
  //   routePath: '/create-or-edit-proposal',
  //   component: CreateOrEditProposalView,
  //   exact: false,
  //   crumbNameKey: TranslationKey['Proposal Creation']
  // },
]

export const privateRoutesConfigs = [
  {
    routePath: '/buyer/dashboard',
    component: BuyerDashboardView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/buyer/search-supplier-by-supervisor',
    component: BuyerSearchSupplierBySupervisorView,
    exact: true,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/buyer/search-supplier-by-client',
    component: BuyerSearchSupplierByClientView,
    exact: true,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/buyer/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Users,
  },
  {
    routePath: '/buyer/search-supplier-by-supervisor/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/buyer/search-supplier-by-client/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/buyer/my-products/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/buyer/my-products',
    component: BuyerMyProductsView,
    exact: true,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['My products'],
  },
  {
    routePath: '/buyer/my-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['My orders'],
  },
  {
    routePath: '/buyer/free-orders',
    component: BuyerFreeOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['Free Orders'],
  },

  {
    routePath: '/buyer/finances',
    component: BuyerFinancesViews,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/researcher/dashboard',
    component: ResearcherDashboardView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey.Dashboard,
  },
  {
    routePath: '/researcher/products',
    component: ResearcherProductsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey['My products'],
  },

  {
    routePath: '/researcher/products/product',
    component: ResearcherProductView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/researcher/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey['Sub users'],
  },

  {
    routePath: '/researcher/finances',
    component: ResearcherFinancesViews,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/client/dashboard',
    component: ClientDashboardView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Dashboard,
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    routePath: '/client/freelance',
    component: ClientFreelanceView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Freelance,
  },

  {
    routePath: '/client/freelance/my-requests',
    component: MyRequestsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['My requests'],
  },

  {
    routePath: '/client/freelance/my-proposals',
    component: MyProposalsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['My proposals'],
  },

  {
    routePath: '/client/freelance/my-requests/custom-request',
    component: OwnerRequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['My request'],
  },

  {
    routePath: '/client/freelance/my-requests/create-request',
    component: CreateOrEditRequestView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Create a request'],
  },

  {
    routePath: '/client/freelance/my-requests/custom-request/edit-request',
    component: CreateOrEditRequestView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Edit a request'],
  },

  {
    routePath: '/client/freelance/vacant-requests',
    component: VacantRequestsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Vacant requests'],
  },

  {
    routePath: '/client/freelance/vacant-requests/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Request,
  },

  {
    routePath: '/client/freelance/my-proposals/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Request,
  },

  {
    routePath: '/client/freelance/my-proposals/edit-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Proposal Edition'],
  },

  {
    routePath: '/client/freelance/vacant-requests/custom-search-request/create-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Proposal Creation'],
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////

  {
    routePath: '/client/inventory',
    component: ClientInventoryView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Inventory,
  },

  {
    routePath: '/client/inventory/product',
    component: ClientProductView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/client/product-exchange',
    component: ClientProductExchangeView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Commodity exchange'],
  },

  {
    routePath: '/client/product-exchange/forks-exchange',
    component: ClientExchangeView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Surebets exchange'],
  },
  {
    routePath: '/client/product-exchange/private-label',
    component: ClientExchangePrivateLabelView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Private Label'],
  },

  {
    routePath: '/client/boxes-ready-to-batch',
    component: ClientReadyBoxesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Boxes ready to send'],
  },

  {
    routePath: '/client/awaiting-batch',
    component: ClientAwaitingBatchesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Awaiting send'],
  },

  {
    routePath: '/client/batches',
    component: ClientBatchesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Sent boxes'],
  },

  {
    routePath: '/client/shops',
    component: ClientShopsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Shops,
  },

  {
    routePath: '/client/warehouse',
    component: ClientWarehouseView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['My warehouse'],
  },
  {
    routePath: '/client/orders',
    component: ClientOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Orders,
  },

  {
    routePath: '/client/settings',
    component: ClientSettingsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Profile,
  },
  {
    routePath: '/client/orders/order',
    component: ClientOrderView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Order,
  },

  {
    routePath: '/client/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['My users'],
  },
  {
    routePath: '/client/orders-notifications',
    component: ClientOrdersNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Order notifications'],
  },

  {
    routePath: '/client/boxes-notifications',
    component: ClientBoxesNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Box notifications'],
  },

  {
    routePath: '/client/tariffs-notifications',
    component: ClientBoxesTariffsNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Box notifications'],
  },

  {
    routePath: '/client/finances',
    component: ClientFinancesViews,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Finances,
  },
  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Dashboard,
  },
  {
    routePath: '/supervisor/products',
    component: SupervisorProductsView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['My products'],
  },

  {
    routePath: '/supervisor/products/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/supervisor/ready-to-check/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/supervisor/ready-to-check-by-client/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Product,
  },
  {
    routePath: '/supervisor/ready-to-check',
    component: SupervisorReadyToCheckView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/supervisor/ready-to-check-by-client',
    component: SupervisorReadyToCheckByClientView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/supervisor/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Users,
  },
  {
    routePath: '/supervisor/finances',
    component: SupervisorFinancesViews,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/warehouse/dashboard',
    component: WarehouseDashboardView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Dashboard,
  },
  {
    routePath: '/warehouse/vacant-tasks',
    component: WarehouseVacantTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['New tasks'],
  },
  {
    routePath: '/warehouse/my-tasks',
    component: WarehouseMyTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['My tasks'],
  },

  {
    routePath: '/warehouse/awaiting-batches',
    component: WarehouseAwaitingBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Awaiting send'],
  },

  {
    routePath: '/warehouse/batches',
    component: WarehouseBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Sent,
  },
  {
    routePath: '/warehouse/my-warehouse',
    component: WarehouseMyWarehouseView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['My warehouse'],
  },

  {
    routePath: '/warehouse/management',
    component: WarehouseManagementView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Warehouse management'],
  },
  {
    routePath: '/warehouse/completed-tasks',
    component: WarehouseCompletedTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Completed tasks'],
  },

  {
    routePath: '/warehouse/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/warehouse/canceled-tasks',
    component: WarehouseCanceledTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Canceled tasks'],
  },
  {
    routePath: '/warehouse/warehouse',
    component: WarehouseBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Sent,
  },
  {
    routePath: '/warehouse/finances',
    component: WarehouseFinancesViews,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Finances,
  },
  {
    routePath: '/admin/dashboard',
    component: AdminDashboardView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Dashboard,
  },
  {
    routePath: '/admin/exchange',
    component: AdminExchangeViews,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Commodity exchange'],
  },
  {
    routePath: '/admin/inventory',
    component: AdminInventoryView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Inventory,
  },
  {
    routePath: '/admin/orders/order',
    component: AdminOrderView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Order,
  },
  {
    routePath: '/admin/permissions',
    component: AdminUserPermissionsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['User permissions'],
  },
  {
    routePath: '/admin/orders',
    component: AdminOrdersViews,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Orders,
  },
  {
    routePath: '/admin/exchange/product',
    component: AdminProductView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Product,
  },

  {
    routePath: '/admin/inventory/product',
    component: AdminProductView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Product,
  },
  {
    routePath: '/admin/tasks',
    component: AdminWarehouseTasksView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Tasks,
  },
  {
    routePath: '/admin/boxes',
    component: AdminWarehouseBoxesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Boxes,
  },

  {
    routePath: '/admin/destinations',
    component: AdminDestinationsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Destinations,
  },

  {
    routePath: '/admin/awaiting-batches',
    component: AdminAwaitingBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Awaiting send'],
  },

  {
    routePath: '/admin/batches',
    component: AdminBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Sent,
  },

  {
    routePath: '/admin/finances',
    component: AdminFinancesViews,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Finances,
  },
  {
    routePath: '/admin/users',
    component: AdminUsersView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Users,
  },
  {
    routePath: '/admin/users/balance',
    component: AdminUserBalanceView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['User balance'],
  },
  {
    routePath: '/admin/settings',
    component: AdminSettingsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Settings,
  },

  {
    routePath: '/freelancer/dashboard',
    component: FreelancerDashboardView,
    exact: false,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/freelancer/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Sub users'],
  },

  {
    routePath: '/freelancer/finances',
    component: FreelancerFinancesViews,
    exact: false,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Finances,
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    routePath: '/freelancer/freelance',
    component: FreelancerFreelanceView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Freelance,
  },

  {
    routePath: '/freelancer/freelance/my-proposals',
    component: MyProposalsView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['My proposals'],
  },

  {
    routePath: '/freelancer/freelance/vacant-requests',
    component: VacantRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Vacant requests'],
  },

  {
    routePath: '/freelancer/freelance/vacant-requests/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Request,
  },

  {
    routePath: '/freelancer/freelance/my-proposals/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Request,
  },

  {
    routePath: '/freelancer/freelance/my-proposals/edit-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Proposal Edition'],
  },

  {
    routePath: '/freelancer/freelance/vacant-requests/custom-search-request/create-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Proposal Creation'],
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////
]
