import {AdminAwaitingBatchesView} from '@views/admin/admin-batches-views/admin-awaiting-batches-view'
import {AdminBatchesView} from '@views/admin/admin-batches-views/admin-batches-view'
import {AdminSentBatchesView} from '@views/admin/admin-batches-views/admin-sent-batches-view'
import {AdminDashboardView} from '@views/admin/admin-dashboard-view'
import {AdminExchangeViews} from '@views/admin/admin-exchange-views'
import {AdminInventoryView} from '@views/admin/admin-inventory-view'
import {AdminOrderView} from '@views/admin/admin-orders-views/order'
import {AdminOrdersViews} from '@views/admin/admin-orders-views/orders'
import {AdminProductView} from '@views/admin/admin-product-view'
import {AdminSettingsView} from '@views/admin/admin-settings-view'
import {AdminUserPermissionsView} from '@views/admin/admin-user-permissions-view'
import {AdminUserView} from '@views/admin/admin-users-view/admin-user-view'
import {AdminUsersView} from '@views/admin/admin-users-view/admin-users-view'
import {AdminDestinationsView} from '@views/admin/admin-warehouse-views/admin-destinations-view'
import {AdminWarehouseBoxesView} from '@views/admin/admin-warehouse-views/admin-warehouse-boxes-view'
import {AdminWarehouseTasksView} from '@views/admin/admin-warehouse-views/admin-warehouse-tasks-view'
import {AdminWarehouseView} from '@views/admin/admin-warehouse-views/admin-warehouse-view'
import {AuthView} from '@views/auth'
import {BuyerDashboardView} from '@views/buyer/buyer-dashboard-view'
import {BuyerMyProductsView} from '@views/buyer/buyer-my-products-view'
import {BuyerFreeOrdersView} from '@views/buyer/buyer-orders-views/buyer-free-orders-view'
import {BuyerMyOrdersView} from '@views/buyer/buyer-orders-views/buyer-my-orders-view'
import {BuyerProductView} from '@views/buyer/buyer-product-view/'
import {BuyerSearchSupplierByClientView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-client-view'
import {BuyerSearchSupplierBySupervisorView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-supervisor-view'
import {ClientAwaitingBatchesView} from '@views/client/client-batches-views/client-awaiting-batches-view'
import {ClientBatchesView} from '@views/client/client-batches-views/client-batches-view'
import {ClientReadyBoxesView} from '@views/client/client-batches-views/client-ready-boxes-view'
import {ClientSentBatchesView} from '@views/client/client-batches-views/client-sent-batches-view'
import {ClientDashboardView} from '@views/client/client-dashboard-view'
import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-views/client-exchange-private-label-view'
import {ClientExchangeView} from '@views/client/client-exchange-views/client-exchange-view'
import {ClientFreelanceView} from '@views/client/client-freelance-view'
import {ClientInventoryView} from '@views/client/client-inventory-view'
import {ClientBoxesNotificationsView} from '@views/client/client-notifications-views/client-boxes-notifications-view'
import {ClientBoxesTariffsNotificationsView} from '@views/client/client-notifications-views/client-boxes-tariffs-notifications-view'
import {ClientNotificationsView} from '@views/client/client-notifications-views/client-notifications-view'
import {ClientOrdersNotificationsView} from '@views/client/client-notifications-views/client-orders-notifications-view'
import {ClientOrderView} from '@views/client/client-orders-views/order'
import {ClientOrdersView} from '@views/client/client-orders-views/orders'
import {ClientProductExchangeView} from '@views/client/client-product-exchange-view'
import {ClientProductView} from '@views/client/client-product-view/'
import {ClientSettingsView} from '@views/client/client-settings-view'
import {ClientShopView} from '@views/client/client-shop-view'
import {ClientShopsView} from '@views/client/client-shops-view'
import {ClientBuyShopsView} from '@views/client/client-trading-shops-views/client-buy-shops-view'
import {ClientSellShopsView} from '@views/client/client-trading-shops-views/client-sell-shops-view'
import {ClientTradingShopsView} from '@views/client/client-trading-shops-views/client-trading-shops-view'
import {CreateOrEditTradingShopView} from '@views/client/client-trading-shops-views/create-or-edit-trading-shop-view'
import {ClientWarehouseView} from '@views/client/client-warehouse-view'
import {FreelancerDashboardView} from '@views/freelancer/freelancer-dashboard-view'
import {FreelancerFreelanceView} from '@views/freelancer/freelancer-freelance-view'
import {ModeratorAppealView} from '@views/moderator/moderator-appeal-view/moderator-appeal-view'
// import {ModeratorAppealView} from '@views/moderator/moderator-appeal-view'
import {ModeratorAppealsView} from '@views/moderator/moderator-appeals-view/moderator-appeals-view'
import {ModeratorDashboardView} from '@views/moderator/moderator-dashboard-view'
import {ModeratorMyProductsView} from '@views/moderator/moderator-my-products-view'
import {ModeratorSettingsView} from '@views/moderator/moderator-settings-view'
import {RegistrationView} from '@views/registration'
import {ResearcherDashboardView} from '@views/researcher/researcher-dashboard-view'
import {ResearcherProductView} from '@views/researcher/researcher-product-view/researcher-product-view'
import {ResearcherProductsView} from '@views/researcher/researcher-products-view'
import {AnotherUserProfileView} from '@views/shared/another-user-profile-view'
import {CreateOrEditProposalView} from '@views/shared/create-or-edit-proposal-view'
import {CreateOrEditRequestView} from '@views/shared/create-or-edit-request-view'
import {DealsOnReviewDetailsView} from '@views/shared/deals-on-review-details-view'
import {DealsOnReviewView} from '@views/shared/deals-on-review-view/deals-on-review-view'
import {FinancesView} from '@views/shared/finances-view'
import {MessagesView} from '@views/shared/messages-view'
import {MyProposalsView} from '@views/shared/my-proposals-view'
import {MyRequestsView} from '@views/shared/my-requests-view'
import {OwnerRequestDetailCustomView} from '@views/shared/owner-requests-detail-custom-view'
import {RequestDetailCustomView} from '@views/shared/servant-requests-detail-custom-view'
import {SubUsersView} from '@views/shared/sub-users-view/sub-users-view'
import {UserProfileView} from '@views/shared/user-profile-view/user-profile-view'
import {UsersView} from '@views/shared/users-view'
import {VacantDealsDetailsView} from '@views/shared/vacant-deals-details-view'
import {VacantDealsView} from '@views/shared/vacant-deals-view'
import {VacantRequestsView} from '@views/shared/vacant-requests-view/vacant-requests-view'
import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'
import {SupervisorFreelanceView} from '@views/supervisor/supervisor-freelance-view'
import {SupervisorProductView} from '@views/supervisor/supervisor-product-view/supervisor-product-view'
import {SupervisorProductsView} from '@views/supervisor/supervisor-products-view/'
import {SupervisorReadyToCheckByClientView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-by-client-view'
import {SupervisorReadyToCheckView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-view'
import {TermsView} from '@views/terms'
import {WarehouseAwaitingBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-awaiting-batches-view'
import {WarehouseBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-batches-view'
import {WarehouseSentBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-sent-batches-view/warehouse-sent-batches-view'
import {WarehouseDashboardView} from '@views/warehouse/warehouse-dashboard-view'
import {WarehouseManagementView} from '@views/warehouse/warehouse-management-view'
import {WarehouseMyWarehouseView} from '@views/warehouse/warehouse-my-warehouse-view'
import {WarehouseCanceledTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-canceled-tasks-view'
import {WarehouseCompletedTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-completed-tasks-view'
import {WarehouseMyTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-my-tasks-view'
import {WarehouseTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-tasks-view'
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
    routePath: '/buyer/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/buyer/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['My users'],
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
    component: FinancesView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/buyer/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Messages,
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
    routePath: '/researcher/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/researcher/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey['My users'],
  },

  {
    routePath: '/researcher/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/researcher/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey.Messages,
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
    routePath: '/client/trading-shops',
    component: ClientTradingShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Trading stores'],
  },

  {
    routePath: '/client/trading-shops/buy-shops',
    component: ClientBuyShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Buy Shop'],
  },

  {
    routePath: '/client/trading-shops/sell-shops',
    component: ClientSellShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Sell the Shop'],
  },

  {
    routePath: '/client/trading-shops/sell-shops/create-trading-shop',
    component: CreateOrEditTradingShopView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Create an ad to sell your store'],
  },

  {
    routePath: '/client/trading-shops/sell-shops/edit-trading-shop',
    component: CreateOrEditTradingShopView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Edit ad for store sale'],
  },

  {
    routePath: '/client/trading-shops/sell-shops/shop',
    component: ClientShopView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Shop,
  },

  {
    routePath: '/client/trading-shops/buy-shops/shop',
    component: ClientShopView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Shop,
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
    routePath: '/client/inventory/archive',
    component: ClientInventoryView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Archive,
  },

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
    routePath: '/client/batches',
    component: ClientBatchesView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Batches,
  },

  {
    routePath: '/client/batches/boxes-ready-to-batch',
    component: ClientReadyBoxesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Boxes ready to send'],
  },

  {
    routePath: '/client/batches/awaiting-batch',
    component: ClientAwaitingBatchesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Awaiting send'],
  },

  {
    routePath: '/client/batches/sent-batches',
    component: ClientSentBatchesView,
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
    routePath: '/client/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/client/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['My users'],
  },

  {
    routePath: '/client/notifications',
    component: ClientNotificationsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Notifications,
  },
  {
    routePath: '/client/notifications/orders-notifications',
    component: ClientOrdersNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['On orders'],
  },

  {
    routePath: '/client/notifications/boxes-notifications',
    component: ClientBoxesNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['On boxes'],
  },

  {
    routePath: '/client/notifications/tariffs-notifications',
    component: ClientBoxesTariffsNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['On boxes tariffs'],
  },

  {
    routePath: '/client/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/client/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/supervisor/freelance',
    component: SupervisorFreelanceView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Freelance,
  },

  {
    routePath: '/supervisor/freelance/vacant-deals',
    component: VacantDealsView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['Vacant deals'],
  },

  {
    routePath: '/supervisor/freelance/deals-on-review',
    component: DealsOnReviewView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['Deals on review'],
  },

  {
    routePath: '/supervisor/freelance/vacant-deals/deal-details',
    component: VacantDealsDetailsView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Deal,
  },

  {
    routePath: '/supervisor/freelance/deals-on-review/deal-on-review',
    component: DealsOnReviewDetailsView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Deal,
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
    routePath: '/supervisor/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/supervisor/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['My users'],
  },
  {
    routePath: '/supervisor/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/supervisor/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/warehouse/dashboard',
    component: WarehouseDashboardView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/warehouse/tasks',
    component: WarehouseTasksView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Tasks,
  },

  {
    routePath: '/warehouse/tasks/vacant-tasks',
    component: WarehouseVacantTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['New tasks'],
  },
  {
    routePath: '/warehouse/tasks/my-tasks',
    component: WarehouseMyTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['My tasks'],
  },

  {
    routePath: '/warehouse/tasks/completed-tasks',
    component: WarehouseCompletedTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Completed tasks'],
  },

  {
    routePath: '/warehouse/tasks/canceled-tasks',
    component: WarehouseCanceledTasksView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Canceled tasks'],
  },

  {
    routePath: '/warehouse/batches',
    component: WarehouseBatchesView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Batches,
  },

  {
    routePath: '/warehouse/batches/awaiting-batches',
    component: WarehouseAwaitingBatchesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Awaiting send'],
  },

  {
    routePath: '/warehouse/batches/sent-batches',
    component: WarehouseSentBatchesView,
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
    routePath: '/warehouse/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/warehouse/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['My users'],
  },

  {
    routePath: '/warehouse/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/warehouse/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Messages,
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
    routePath: '/admin/warehouse',
    component: AdminWarehouseView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Warehouse,
  },
  {
    routePath: '/admin/warehouse/tasks',
    component: AdminWarehouseTasksView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Tasks,
  },
  {
    routePath: '/admin/warehouse/boxes',
    component: AdminWarehouseBoxesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Boxes,
  },

  {
    routePath: '/admin/warehouse/destinations',
    component: AdminDestinationsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Destinations,
  },

  {
    routePath: '/admin/batches',
    component: AdminBatchesView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Batches,
  },

  {
    routePath: '/admin/batches/awaiting-batches',
    component: AdminAwaitingBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Awaiting send'],
  },

  {
    routePath: '/admin/batches/sent-batches',
    component: AdminSentBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Sent,
  },

  {
    routePath: '/admin/finances',
    component: FinancesView,
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
    routePath: '/admin/users/user',
    component: AdminUserView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.User,
  },

  {
    routePath: '/admin/settings',
    component: AdminSettingsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Settings,
  },

  {
    routePath: '/admin/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/freelancer/dashboard',
    component: FreelancerDashboardView,
    exact: false,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/freelancer/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/freelancer/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['My users'],
  },

  {
    routePath: '/freelancer/finances',
    component: FinancesView,
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

  {
    routePath: '/freelancer/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/moderator/dashboard',
    component: ModeratorDashboardView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/moderator/appeals',
    component: ModeratorAppealsView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Appeals,
  },

  {
    routePath: '/moderator/appeals/appeal',
    component: ModeratorAppealView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Appeal,
  },

  {
    routePath: '/moderator/my-products',
    component: ModeratorMyProductsView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey['My products'],
  },

  {
    routePath: '/moderator/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Users,
  },

  {
    routePath: '/moderator/users/sub-users',
    component: SubUsersView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey['My users'],
  },

  {
    routePath: '/moderator/settings',
    component: ModeratorSettingsView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Settings,
  },

  {
    routePath: '/moderator/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Messages,
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////
]
