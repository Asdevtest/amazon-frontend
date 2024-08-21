import { lazy } from 'react'

import { UserRole } from '@constants/keys/user-roles'
import { navBarActiveCategory, navBarActiveSubCategory } from '@constants/navigation/navbar-active-category'

import { ParsingProdileView } from '@views/shared/parsing/parsing-profile-view'
import { ParsingRequestsView } from '@views/shared/parsing/parsing-requests-view'
import { ParsingView } from '@views/shared/parsing/parsing-view'

import { t } from '@utils/translations'

import { permissionsKeys } from '../keys/permissions'
import { TranslationKey } from '../translations/translation-key'

const AdminAwaitingBatchesView = lazy(() =>
  import('@views/admin/admin-batches-views/admin-awaiting-batches-view').then(module => ({
    default: module.AdminAwaitingBatchesView,
  })),
)
const AdminBatchesView = lazy(() =>
  import('@views/admin/admin-batches-views/admin-batches-view').then(module => ({ default: module.AdminBatchesView })),
)
const AdminSentBatchesView = lazy(() =>
  import('@views/admin/admin-batches-views/admin-sent-batches-view').then(module => ({
    default: module.AdminSentBatchesView,
  })),
)
const AdminDashboardView = lazy(() =>
  import('@views/admin/admin-dashboard-view').then(module => ({ default: module.AdminDashboardView })),
)
const AdminExchangeViews = lazy(() =>
  import('@views/admin/admin-exchange-views').then(module => ({ default: module.AdminExchangeViews })),
)
const AdminFeedbackView = lazy(() =>
  import('@views/admin/admin-feedback-view').then(module => ({ default: module.AdminFeedbackView })),
)
const AdminInventoryView = lazy(() =>
  import('@views/admin/admin-inventory-view').then(module => ({ default: module.AdminInventoryView })),
)
const AdminOrderView = lazy(() =>
  import('@views/admin/admin-orders-views/order').then(module => ({ default: module.AdminOrderView })),
)
const AdminOrdersViews = lazy(() =>
  import('@views/admin/admin-orders-views/orders').then(module => ({ default: module.AdminOrdersViews })),
)
const AdminProductView = lazy(() =>
  import('@views/admin/admin-product-view').then(module => ({ default: module.AdminProductView })),
)
const AdminSettingsView = lazy(() =>
  import('@views/admin/admin-settings-view').then(module => ({ default: module.AdminSettingsView })),
)
const AdminUserPermissionsView = lazy(() =>
  import('@views/admin/admin-user-permissions-view').then(module => ({ default: module.AdminUserPermissionsView })),
)
const AdminUserView = lazy(() =>
  import('@views/admin/admin-users-view/admin-user-view').then(module => ({ default: module.AdminUserView })),
)
const AdminUsersView = lazy(() =>
  import('@views/admin/admin-users-view/admin-users-view').then(module => ({ default: module.AdminUsersView })),
)
const AdminDestinationsView = lazy(() =>
  import('@views/admin/admin-warehouse-views/admin-destinations-view').then(module => ({
    default: module.AdminDestinationsView,
  })),
)
const AdminWarehouseBoxesView = lazy(() =>
  import('@views/admin/admin-warehouse-views/admin-warehouse-boxes-view').then(module => ({
    default: module.AdminWarehouseBoxesView,
  })),
)
const AdminWarehouseTasksView = lazy(() =>
  import('@views/admin/admin-warehouse-views/admin-warehouse-tasks-view').then(module => ({
    default: module.AdminWarehouseTasksView,
  })),
)
const AdminWarehouseView = lazy(() =>
  import('@views/admin/admin-warehouse-views/admin-warehouse-view').then(module => ({
    default: module.AdminWarehouseView,
  })),
)
const AuthView = lazy(() =>
  import('@views/auth').then(module => {
    const Component = module.AuthView

    return { default: props => <Component auth {...props} /> }
  }),
)
const BuyerDashboardView = lazy(() =>
  import('@views/buyer/buyer-dashboard-view').then(module => ({ default: module.BuyerDashboardView })),
)

const BuyerMyProductsView = lazy(() =>
  import('@views/buyer/buyer-my-products-view').then(module => ({ default: module.BuyerMyProductsView })),
)

const BuyerFreeOrdersView = lazy(() =>
  import('@views/buyer/buyer-orders-views/buyer-free-orders-view').then(module => ({
    default: module.BuyerFreeOrdersView,
  })),
)

const BuyerPendingOrdersView = lazy(() =>
  import('@views/buyer/buyer-orders-views/buyer-pending-orders-view').then(module => ({
    default: module.BuyerPendingOrdersView,
  })),
)
const BuyerMyOrdersView = lazy(() =>
  import('@views/buyer/buyer-orders-views/buyer-my-orders-view').then(module => ({
    default: module.BuyerMyOrdersView,
  })),
)
const BuyerProductView = lazy(() =>
  import('@views/buyer/buyer-product-view').then(module => ({ default: module.BuyerProductView })),
)

const BuyerSearchSupplierBySupervisorView = lazy(() =>
  import('@views/buyer/buyer-search-supplier').then(module => ({
    default: module.BuyerSearchSupplierBySupervisorView,
  })),
)

const BuyerIdeasNotificationsView = lazy(() =>
  import('@views/buyer/buyer-notifications-views/buyer-ideas-notifications-view').then(module => ({
    default: module.BuyerIdeasNotificationsView,
  })),
)

const BuyerNotificationsView = lazy(() =>
  import('@views/buyer/buyer-notifications-views/buyer-notifications-view').then(module => ({
    default: module.BuyerNotificationsView,
  })),
)

const ClientAwaitingBatchesView = lazy(() =>
  import('@views/client/client-batches-views/client-awaiting-batches-view').then(module => ({
    default: module.ClientAwaitingBatchesView,
  })),
)
const ClientBatchesView = lazy(() =>
  import('@views/client/client-batches-views/client-batches-view').then(module => ({
    default: module.ClientBatchesView,
  })),
)

const ClientWarehouseTasksView = lazy(() =>
  import('@views/client/client-warehouse-views/client-warehouse-tasks-view').then(module => ({
    default: module.ClientWarehouseTasksView,
  })),
)

const ClientSentBatchesView = lazy(() =>
  import('@views/client/client-batches-views/client-sent-batches-view').then(module => ({
    default: module.ClientSentBatchesView,
  })),
)
const ClientDashboardView = lazy(() =>
  import('@views/client/client-dashboard-view').then(module => ({ default: module.ClientDashboardView })),
)
const ClientExchangePrivateLabelView = lazy(() =>
  import('@views/client/client-exchange-views/client-exchange-private-label-view').then(module => ({
    default: module.ClientExchangePrivateLabelView,
  })),
)
const ClientExchangeView = lazy(() =>
  import('@views/client/client-exchange-views/client-exchange-view').then(module => ({
    default: module.ClientExchangeView,
  })),
)
const ClientFreelanceView = lazy(() =>
  import('@views/client/client-freelance-view').then(module => ({ default: module.ClientFreelanceView })),
)
const ClientInventoryView = lazy(() =>
  import('@views/client/client-inventory-view').then(module => ({ default: module.ClientInventoryView })),
)
const ReportsView = lazy(() =>
  import('@views/shared/reports-view').then(module => {
    const Component = module.ReportsView

    return { default: props => <Component subView {...props} /> }
  }),
)
const ClientBoxesNotificationsView = lazy(() =>
  import('@views/client/client-notifications-views/client-boxes-notifications-view').then(module => ({
    default: module.ClientBoxesNotificationsView,
  })),
)
const ClientBoxesTariffsNotificationsView = lazy(() =>
  import('@views/client/client-notifications-views/client-boxes-tariffs-notifications-view').then(module => ({
    default: module.ClientBoxesTariffsNotificationsView,
  })),
)

const ClientOrdersNotificationsView = lazy(() =>
  import('@views/client/client-notifications-views/client-orders-notifications-view').then(module => ({
    default: module.ClientOrdersNotificationsView,
  })),
)

const ClientFreelanceNotificationsView = lazy(() =>
  import('@views/client/client-notifications-views/client-freelance-notifications-view').then(module => ({
    default: module.ClientFreelanceNotificationsView,
  })),
)

const ClientMyOrdersView = lazy(() =>
  import('@views/client/client-orders-views/client-my-orders-view').then(module => ({
    default: module.ClientMyOrdersView,
  })),
)

const ClientOrderView = lazy(() =>
  import('@views/client/client-orders-views/order').then(module => ({ default: module.ClientOrderView })),
)
const ClientOrdersView = lazy(() =>
  import('@views/client/client-orders-views/orders').then(module => ({ default: module.ClientOrdersView })),
)
const ClientProductView = lazy(() =>
  import('@views/client/client-product-view').then(module => ({ default: module.ClientProductView })),
)
// const ClientSettingsView = lazy(() =>
//   import('@views/client/client-settings-view').then(module => ({default: module.ClientSettingsView})),
// )
const ClientShopView = lazy(() =>
  import('@views/client/client-shop-view').then(module => ({ default: module.ClientShopView })),
)

const ClientShopsView = lazy(() =>
  import('@views/client/client-shops-view').then(module => ({ default: module.ClientShopsView })),
)
const ClientShopsReportView = lazy(() =>
  import('@views/client/client-shops-report').then(module => ({ default: module.ClientShopsReportView })),
)

const ParsingReports = lazy(() =>
  import('@views/client/parsing-reports').then(module => ({ default: module.ParsingReports })),
)

const ClientBuyShopsView = lazy(() =>
  import('@views/client/client-trading-shops-views/client-buy-shops-view').then(module => ({
    default: module.ClientBuyShopsView,
  })),
)
const ClientSellShopsView = lazy(() =>
  import('@views/client/client-trading-shops-views/client-sell-shops-view').then(module => ({
    default: module.ClientSellShopsView,
  })),
)
const ClientTradingShopsView = lazy(() =>
  import('@views/client/client-trading-shops-views/client-trading-shops-view').then(module => ({
    default: module.ClientTradingShopsView,
  })),
)
const CreateOrEditTradingShopView = lazy(() =>
  import('@views/client/client-trading-shops-views/create-or-edit-trading-shop-view').then(module => ({
    default: module.CreateOrEditTradingShopView,
  })),
)

const ClientWarehouseView = lazy(() =>
  import('@views/client/client-warehouse-views/client-warehouse-view').then(module => ({
    default: module.ClientWarehouseView,
  })),
)

const ClientInStockBoxesView = lazy(() =>
  import('@views/client/client-warehouse-views/client-in-stock-boxes-view').then(module => ({
    default: module.ClientInStockBoxesView,
  })),
)
const FreelancerDashboardView = lazy(() =>
  import('@views/freelancer/freelancer-dashboard-view').then(module => ({ default: module.FreelancerDashboardView })),
)
const FreelancerFreelanceView = lazy(() =>
  import('@views/freelancer/freelancer-freelance-view').then(module => ({ default: module.FreelancerFreelanceView })),
)
const ModeratorAppealView = lazy(() =>
  import('@views/moderator/moderator-appeal-view/moderator-appeal-view').then(module => ({
    default: module.ModeratorAppealView,
  })),
)
// const rt ModeratorAppealView} from '@views/moderator/moderator-appeal-view'
const ModeratorAppealsView = lazy(() =>
  import('@views/moderator/moderator-appeals-view/moderator-appeals-view').then(module => ({
    default: module.ModeratorAppealsView,
  })),
)
const ModeratorDashboardView = lazy(() =>
  import('@views/moderator/moderator-dashboard-view').then(module => ({ default: module.ModeratorDashboardView })),
)
const ModeratorMyProductsView = lazy(() =>
  import('@views/moderator/moderator-my-products-view').then(module => ({ default: module.ModeratorMyProductsView })),
)
const PatchNoutesView = lazy(() =>
  import('@views/shared/patch-noutes-view').then(module => ({ default: module.PatchNoutesView })),
)
const ModeratorSettingsView = lazy(() =>
  import('@views/moderator/moderator-settings-view').then(module => ({ default: module.ModeratorSettingsView })),
)
const RegistrationView = lazy(() =>
  import('@views/auth').then(module => {
    const Component = module.AuthView

    return { default: props => <Component auth={false} {...props} /> }
  }),
)
const ResearcherDashboardView = lazy(() =>
  import('@views/researcher/researcher-dashboard-view').then(module => ({ default: module.ResearcherDashboardView })),
)
const ResearcherProductView = lazy(() =>
  import('@views/researcher/researcher-product-view/researcher-product-view').then(module => ({
    default: module.ResearcherProductView,
  })),
)
const ResearcherProductsView = lazy(() =>
  import('@views/researcher/researcher-products-view').then(module => ({ default: module.ResearcherProductsView })),
)
const AnotherUserProfileView = lazy(() =>
  import('@views/shared/another-user-profile-view').then(module => ({ default: module.AnotherUserProfileView })),
)
const CreateOrEditProposalView = lazy(() =>
  import('@views/shared/create-or-edit-proposal-view').then(module => ({ default: module.CreateOrEditProposalView })),
)
const MyServicesView = lazy(() =>
  import('@views/shared/my-services-view').then(module => ({ default: module.MyServicesView })),
)

const CreateOrEditServicesView = lazy(() =>
  import('@views/shared/create-or-edit-services-view').then(module => ({ default: module.CreateOrEditServicesView })),
)

const ServicesDetailCustomView = lazy(() =>
  import('@views/shared/services-detail-custom-view').then(module => ({ default: module.ServicesDetailCustomView })),
)

const CreateOrEditRequestView = lazy(() =>
  import('@views/shared/create-or-edit-request-view').then(module => ({ default: module.CreateOrEditRequestView })),
)
const DealsOnReviewDetailsView = lazy(() =>
  import('@views/shared/deals-on-review-details-view').then(module => ({ default: module.DealsOnReviewDetailsView })),
)
const DealsOnReviewView = lazy(() =>
  import('@views/shared/deals-on-review-view/deals-on-review-view').then(module => ({
    default: module.DealsOnReviewView,
  })),
)
const FinancesView = lazy(() =>
  import('@views/shared/finances-view').then(module => ({ default: module.FinancesView })),
)
const MessagesView = lazy(() =>
  import('@views/shared/messages-view').then(module => ({ default: module.MessagesView })),
)

const MyProposalsView = lazy(() =>
  import('@views/shared/my-proposals-view').then(module => {
    const Component = module.MyProposalsView

    return { default: props => <Component allProposals={false} {...props} /> }
  }),
)

const AllProposalsView = lazy(() =>
  import('@views/shared/my-proposals-view').then(module => {
    const Component = module.MyProposalsView

    return { default: props => <Component allProposals {...props} /> }
  }),
)

const ServiceExchangeView = lazy(() =>
  import('@views/shared/service-exchange-view').then(module => ({ default: module.ServiceExchangeView })),
)

const MyRequestsView = lazy(() =>
  import('@views/shared/my-requests-view').then(module => ({ default: module.MyRequestsView })),
)

const OwnerRequestDetailCustomView = lazy(() =>
  import('@views/shared/owner-requests-detail-custom-view').then(module => ({
    default: module.OwnerRequestDetailCustomView,
  })),
)
const RequestDetailCustomView = lazy(() =>
  import('@views/shared/servant-requests-detail-custom-view').then(module => ({
    default: module.RequestDetailCustomView,
  })),
)

const SourceFilesView = lazy(() =>
  import('@views/freelancer/source-files-view').then(module => ({
    default: module.SourceFilesView,
  })),
)

const ServiceDetailsView = lazy(() =>
  import('@views/shared/services-detail-view').then(module => ({
    default: module.ServiceDetailsView,
  })),
)

const SubUsersView = lazy(() =>
  import('@views/shared/sub-users-view/sub-users-view').then(module => ({ default: module.SubUsersView })),
)
const UserProfileView = lazy(() =>
  import('@views/shared/user-profile-view/user-profile-view').then(module => ({ default: module.UserProfileView })),
)
const UsersView = lazy(() => import('@views/shared/users-view').then(module => ({ default: module.UsersView })))

const VacantRequestsView = lazy(() =>
  import('@views/shared/vacant-requests-view/vacant-requests-view').then(module => ({
    default: module.VacantRequestsView,
  })),
)
const SupervisorDashboardView = lazy(() =>
  import('@views/supervisor/supervisor-dashboard-view').then(module => ({ default: module.SupervisorDashboardView })),
)
const SupervisorProductView = lazy(() =>
  import('@views/supervisor/supervisor-product-view/supervisor-product-view').then(module => ({
    default: module.SupervisorProductView,
  })),
)
const SupervisorProductsView = lazy(() =>
  import('@views/supervisor/supervisor-products-view').then(module => ({ default: module.SupervisorProductsView })),
)

const SupervisorSettingsView = lazy(() =>
  import('@views/supervisor/supervisor-settings-view').then(module => ({
    default: module.SupervisorSettingsView,
  })),
)
const SupervisorReadyToCheckByClientView = lazy(() =>
  import('@views/supervisor/supervisor-ready-to-check-view').then(module => {
    const Component = module.SupervisorReadyToCheckView

    return { default: props => <Component isCreatedByClient {...props} /> }
  }),
)
const SupervisorReadyToCheckView = lazy(() =>
  import('@views/supervisor/supervisor-ready-to-check-view').then(module => {
    const Component = module.SupervisorReadyToCheckView

    return { default: props => <Component isCreatedByClient={false} {...props} /> }
  }),
)

const WarehouseAwaitingBatchesView = lazy(() =>
  import('@views/warehouse/warehouse-batches-views/warehouse-my-batches-view').then(module => {
    const Component = module.WarehouseMyBatchesView

    return { default: props => <Component isSentBatches={false} {...props} /> }
  }),
)
const WarehouseBatchesView = lazy(() =>
  import('@views/warehouse/warehouse-batches-views/warehouse-batches-view').then(module => ({
    default: module.WarehouseBatchesView,
  })),
)
const WarehouseSentBatchesView = lazy(() =>
  import('@views/warehouse/warehouse-batches-views/warehouse-my-batches-view').then(module => {
    const Component = module.WarehouseMyBatchesView

    return { default: props => <Component isSentBatches {...props} /> }
  }),
)
const WarehouseDashboardView = lazy(() =>
  import('@views/warehouse/warehouse-dashboard-view').then(module => ({ default: module.WarehouseDashboardView })),
)
const WarehouseManagementView = lazy(() =>
  import('@views/warehouse/warehouse-management-view').then(module => ({ default: module.WarehouseManagementView })),
)
const WarehouseMyWarehouseView = lazy(() =>
  import('@views/warehouse/warehouse-my-warehouse-view').then(module => ({ default: module.WarehouseMyWarehouseView })),
)
const WarehouseCanceledTasksView = lazy(() =>
  import('@views/warehouse/warehouse-tasks-views/warehouse-canceled-tasks-view').then(module => ({
    default: module.WarehouseCanceledTasksView,
  })),
)
const WarehouseCompletedTasksView = lazy(() =>
  import('@views/warehouse/warehouse-tasks-views/warehouse-completed-tasks-view').then(module => ({
    default: module.WarehouseCompletedTasksView,
  })),
)
const WarehouseMyTasksView = lazy(() =>
  import('@views/warehouse/warehouse-tasks-views/warehouse-my-tasks-view').then(module => ({
    default: module.WarehouseMyTasksView,
  })),
)
const WarehouseTasksView = lazy(() =>
  import('@views/warehouse/warehouse-tasks-views/warehouse-tasks-view').then(module => ({
    default: module.WarehouseTasksView,
  })),
)
const WarehouseVacantTasksView = lazy(() =>
  import('@views/warehouse/warehouse-tasks-views/warehouse-vacant-tasks-view').then(module => ({
    default: module.WarehouseVacantTasksView,
  })),
)

const CategoryRootView = lazy(() =>
  import('@views/shared/category-root-view/category-root-view').then(module => ({
    default: module.CategoryRootView,
  })),
)

const ClientIdeasView = lazy(() =>
  import('@views/client/client-ideas-view/client-ideas-view').then(module => ({
    default: module.ClientIdeasView,
  })),
)

const GeneralNotificationsView = lazy(() =>
  import('@views/shared/general-notifications-view').then(module => ({
    default: module.GeneralNotificationsView,
  })),
)

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
]

export const overallRoutesConfigs = [
  {
    routePath: `/profile`,
    component: UserProfileView,
    exact: false,
    crumbNameKey: TranslationKey.Profile,

    navigationInfo: {
      activeCategory: '',
      activeSubCategory: '',
      title: () => t(TranslationKey.Profile),
    },
  },

  {
    routePath: '/another-user',
    component: AnotherUserProfileView,
    exact: false,
    crumbNameKey: TranslationKey.User,

    navigationInfo: {
      activeCategory: '',
      activeSubCategory: '',
      title: () => t(TranslationKey.User),
    },
  },
]

export const privateRoutesConfigs = [
  {
    routePath: '/buyer/dashboard',
    component: BuyerDashboardView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_DASHBOARD_BUYER,
    crumbNameKey: TranslationKey.Dashboard,
    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },

  {
    routePath: '/buyer/search-supplier-by-supervisor',
    component: BuyerSearchSupplierBySupervisorView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_VAC_ORDERS_BUYER,

    crumbNameKey: TranslationKey['Supplier search'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_NEW_PRODUCTS,
      activeSubCategory: 0,
      title: () => `${t(TranslationKey['Supplier search'])} - ${t(TranslationKey['From the Supervisor'])}`,
    },
  },

  {
    routePath: '/buyer/search-supplier-by-client',
    component: BuyerSearchSupplierBySupervisorView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER,
    crumbNameKey: TranslationKey['Supplier search'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_NEW_PRODUCTS,
      activeSubCategory: 1,
      title: () => `${t(TranslationKey['Supplier search'])} - ${t(TranslationKey['From the Client'])}`,
    },
  },

  {
    routePath: '/buyer/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_USERS_BUYER,

    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/buyer/users/sub-users',
    component: SubUsersView,
    exact: false,
    permissionKey: permissionsKeys.buyer.SHOW_USERS_BUYER,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey['My users'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['My users']),
    },
  },
  {
    routePath: '/buyer/search-supplier-by-supervisor/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/buyer/search-supplier-by-client/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/buyer/my-products/product',
    component: BuyerProductView,
    exact: false,
    permission: [UserRole.BUYER],
    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/buyer/my-products',
    component: BuyerMyProductsView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_PRODUCTS_BUYER,

    crumbNameKey: TranslationKey['My products'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey['My products']),
    },
  },

  {
    routePath: '/buyer/pending-orders',
    component: BuyerPendingOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_PENDING_ORDERS_BUYER,

    crumbNameKey: TranslationKey['Pending orders'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_PENDING_ORDERS,
      activeSubCategory: '',
      title: () => t(TranslationKey['Pending orders']),
    },
  },

  {
    routePath: '/buyer/all-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_BUYER,

    crumbNameKey: TranslationKey['All orders'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_ALL_ORDERS,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['All orders'])}`,
    },
  },
  {
    routePath: '/buyer/not-paid-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_NOT_PAID_BUYER,

    crumbNameKey: TranslationKey['Not paid'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NOT_PAID,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['Not paid'])}`,
    },
  },
  {
    routePath: '/buyer/ready-for-payment-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_READY_FOR_PAYMENT_BUYER,

    crumbNameKey: TranslationKey['Ready for payment'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_READY_FOR_PAYMENT,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['Ready for payment'])}`,
    },
  },
  {
    routePath: '/buyer/partially-paid-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    // permissionKey: permissionsKeys.buyer.SHOW_ORDERS_READY_FOR_PAYMENT_BUYER,
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_PARTIALLY_PAID_BUYER,

    crumbNameKey: TranslationKey['Partially paid'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_PARTIALLY_PAID,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['Partially paid'])}`,
    },
  },
  {
    routePath: '/buyer/need-track-number-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_NEED_TRACK_NUMBER_BUYER,

    crumbNameKey: TranslationKey['Need track number'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_NEED_TRACK_NUMBER,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['Need track number'])}`,
    },
  },
  {
    routePath: '/buyer/inbound-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_INBOUND_BUYER,

    crumbNameKey: TranslationKey.Inbound,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_INBOUND,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey.Inbound)}`,
    },
  },
  {
    routePath: '/buyer/confirmation-required-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_CONFIRMATION_REQUIRED_BUYER,

    crumbNameKey: TranslationKey['Confirmation required'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CONFIRMATION_REQUIRED,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['Confirmation required'])}`,
    },
  },
  {
    routePath: '/buyer/closed-and-canceled-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_CLOSED_AND_CANCELED_BUYER,

    crumbNameKey: TranslationKey['Closed and canceled'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BUYER_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_ORDERS_CLOSED_AND_CANCELED,
      title: () => `${t(TranslationKey['My orders'])} - ${t(TranslationKey['Closed and canceled'])}`,
    },
  },

  {
    routePath: '/buyer/free-orders',
    component: BuyerFreeOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_VAC_ORDERS_BUYER,

    crumbNameKey: TranslationKey['Free orders'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FREE_ORDERS,
      activeSubCategory: '',
      title: () => t(TranslationKey['Free orders']),
    },
  },

  {
    routePath: '/buyer/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_PAYMENTS_BUYER,

    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },

  {
    routePath: '/buyer/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.BUYER],

    permissionKey: permissionsKeys.buyer.SHOW_CHAT_BUYER,

    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/buyer/notifications',
    component: BuyerNotificationsView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_NOTIFICATIONS_BUYER,

    crumbNameKey: TranslationKey.Notifications,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Notifications),
    },
  },

  {
    routePath: '/buyer/notifications/ideas-notifications',
    component: BuyerIdeasNotificationsView,
    exact: false,
    permission: [UserRole.BUYER],

    permissionKey: permissionsKeys.buyer.SHOW_NOTIFICATIONS_BUYER,

    crumbNameKey: TranslationKey['On ideas'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['Notifications on ideas']),
    },
  },

  {
    routePath: '/buyer/notifications/general-notifications-view',
    component: GeneralNotificationsView,
    exact: false,
    permission: [UserRole.BUYER],

    permissionKey: permissionsKeys.buyer.SHOW_NOTIFICATIONS_BUYER,

    crumbNameKey: TranslationKey['General notifications'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_GENERAL_NOTIFICATIONS,
      title: () => t(TranslationKey['General notifications']),
    },
  },

  {
    routePath: '/researcher/dashboard',
    component: ResearcherDashboardView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_DASHBOARD_RESEARCHER,

    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },
  {
    routePath: '/researcher/products',
    component: ResearcherProductsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_PRODUCTS_RESEARCHER,

    crumbNameKey: TranslationKey['My products'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey['My products']),
    },
  },

  {
    routePath: '/researcher/products/product',
    component: ResearcherProductView,
    exact: false,
    permission: [UserRole.RESEARCHER],

    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/researcher/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_USERS_RESEARCHER,

    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/researcher/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    crumbNameKey: TranslationKey['My users'],
    permissionKey: permissionsKeys.researcher.SHOW_USERS_RESEARCHER,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/researcher/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_PAYMENTS_RESEARCHER,

    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },

  {
    routePath: '/researcher/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_CHAT_RESEARCHER,

    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/client/dashboard',
    component: ClientDashboardView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_DASHBOARD_CLIENT,

    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },

  {
    routePath: '/client/freelance',
    component: ClientFreelanceView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey.Freelance,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Freelance),
    },
  },

  {
    routePath: '/client/freelance/my-requests',
    component: MyRequestsView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_FREELANCE_REQUESTS_CLIENT,

    crumbNameKey: TranslationKey['My requests'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS,
      title: () => t(TranslationKey['My requests']),
    },
  },

  {
    routePath: '/client/freelance/my-proposals',
    component: MyProposalsView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['My proposals'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
      title: () => t(TranslationKey['My proposals']),
    },
  },

  {
    routePath: '/client/freelance/service-exchange',
    component: ServiceExchangeView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_EXCHANGE_CLIENT,

    crumbNameKey: TranslationKey['Service exchange'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_SERVICE_EXCHANGE,
      title: () => t(TranslationKey['My proposals']),
    },
  },

  {
    routePath: '/client/trading-shops',
    component: ClientTradingShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Trading stores'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: '',
      title: () => t(TranslationKey['Trading stores']),
    },
  },

  {
    routePath: '/client/trading-shops/buy-shops',
    component: ClientBuyShopsView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Buy store'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS,
      title: () => t(TranslationKey['Buy store']),
    },
  },

  {
    routePath: '/client/trading-shops/sell-shops',
    component: ClientSellShopsView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Sell the store'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
      title: () => t(TranslationKey['Sell the store']),
    },
  },

  {
    routePath: '/client/trading-shops/sell-shops/create-trading-traiding-shop',
    component: CreateOrEditTradingShopView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Create an ad to sell your store'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
      title: () => t(TranslationKey['Sell the store']),
    },
  },

  {
    routePath: '/client/trading-shops/sell-shops/edit-trading-traiding-shop',
    component: CreateOrEditTradingShopView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Edit ad for store sale'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
      title: () => t(TranslationKey['Sell the store']),
    },
  },

  {
    routePath: '/client/trading-shops/sell-shops/traiding-shop',
    component: ClientShopView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey.Shop,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_SELL_SHOPS,
      title: () => t(TranslationKey.Shop),
    },
  },

  {
    routePath: '/client/trading-shops/buy-shops/traiding-shop',
    component: ClientShopView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey.Shop,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TRADING_SHOPS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BUY_SHOPS,
      title: () => t(TranslationKey.Shop),
    },
  },

  {
    routePath: '/client/freelance/my-requests/custom-request',
    component: OwnerRequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['My request'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS,
      title: () => t(TranslationKey['My request']),
    },
  },

  {
    routePath: '/client/freelance/my-requests/create-request',
    component: CreateOrEditRequestView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['Create request'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS,
      title: () => t(TranslationKey['Create request']),
    },
  },

  {
    routePath: '/client/freelance/my-requests/custom-request/edit-request',
    component: CreateOrEditRequestView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['Edit a request'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_REQUESTS,
      title: () => t(TranslationKey['Create request']),
    },
  },

  {
    routePath: '/client/freelance/vacant-requests',
    component: VacantRequestsView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['Vacant requests'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey['Vacant requests']),
    },
  },

  {
    routePath: '/client/freelance/vacant-requests/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey.Request,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey.Request),
    },
  },

  {
    routePath: '/client/freelance/my-proposals/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey.Request,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
      title: () => t(TranslationKey.Request),
    },
  },

  {
    routePath: '/client/freelance/my-proposals/edit-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['Proposal Edition'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
      title: () => t(TranslationKey['Proposal Edition']),
    },
  },

  {
    routePath: '/client/freelance/vacant-requests/custom-search-request/create-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

    crumbNameKey: TranslationKey['Proposal Creation'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey['Proposal Creation']),
    },
  },

  {
    routePath: '/client/inventory',
    component: ClientInventoryView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.inventory.SHOW_INVENTORY_CLIENT,
    crumbNameKey: TranslationKey.Inventory,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_INVENTORY,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_INVENTORY,
      title: () => t(TranslationKey.Inventory),
    },
  },

  {
    routePath: '/client/inventory/reports',
    component: ReportsView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.inventory.SHOW_INVENTORY_LISTING_REPORTS,
    crumbNameKey: TranslationKey.Reports,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_INVENTORY,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_INVENTORY_REPORTS,
      title: () => t(TranslationKey.Reports),
    },
  },

  {
    routePath: '/client/inventory/product',
    component: ClientProductView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_INVENTORY_CLIENT,

    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_INVENTORY,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/client/product-exchange',
    // component: ClientProductExchangeView,
    component: CategoryRootView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_VACANT_CLIENT,

    crumbNameKey: TranslationKey['Commodity exchange'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_EXCHANGE,
      activeSubCategory: '',
      title: () => t(TranslationKey.Freelance),
    },
  },

  {
    routePath: '/client/product-exchange/forks-exchange',
    component: ClientExchangeView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_COMEXCHANGE_RESEXCHANGE_CLIENT,

    crumbNameKey: TranslationKey['Research exchange'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_EXCHANGE,
      activeSubCategory: 0,
      title: () => t(TranslationKey['Research exchange']),
    },
  },
  {
    routePath: '/client/product-exchange/private-label',
    component: ClientExchangePrivateLabelView,
    exact: true,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_COMEXCHANGE_PRLABEL_CLIENT,

    crumbNameKey: TranslationKey['Private Label'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_EXCHANGE,
      activeSubCategory: 1,
      title: () => t(TranslationKey['Private Label']),
    },
  },

  {
    routePath: '/client/batches',
    component: ClientBatchesView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_BATCHES_CLIENT,

    crumbNameKey: TranslationKey.Batches,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Batches),
    },
  },

  {
    routePath: '/client/warehouse/tasks',
    component: ClientWarehouseTasksView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_WAREHOUSE_TASKS_CLIENT,

    crumbNameKey: TranslationKey.Tasks,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_TASKS,
      title: () => t(TranslationKey.Tasks),
    },
  },

  {
    routePath: '/client/batches/awaiting-batch',
    component: ClientAwaitingBatchesView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_BATCHES_AWAITINGSEND_CLIENT,

    crumbNameKey: TranslationKey['Awaiting send'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BOXES_AWAITING_BATCH,
      title: () => t(TranslationKey['Awaiting send']),
    },
  },

  {
    routePath: '/client/batches/sent-batches',
    component: ClientSentBatchesView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_BATCHES_SENTBOXES_CLIENT,

    crumbNameKey: TranslationKey['Sent boxes'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BATCHES,
      title: () => t(TranslationKey['Sent boxes']),
    },
  },

  {
    routePath: '/client/batches/sent-batches/archive',
    component: ClientSentBatchesView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_BATCHES_CLIENT,

    crumbNameKey: TranslationKey.Archive,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_BATCHES,
      title: () => t(TranslationKey['Sent boxes']),
    },
  },

  {
    routePath: '/client/shops',
    component: CategoryRootView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_STORES_CLIENT,

    crumbNameKey: TranslationKey.Shops,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SHOPS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Shops),
    },
  },

  {
    routePath: '/client/shops/shops',
    component: ClientShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_SHOPS_CLIENT,

    crumbNameKey: TranslationKey.Shops,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SHOPS,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Shops),
    },
  },

  {
    routePath: '/client/shops/reports',
    component: ClientShopsReportView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_SHOPS_REPORTS_CLIENT,

    crumbNameKey: TranslationKey.Reports,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SHOPS,
      activeSubCategory: 1,
      title: () => t(TranslationKey.Reports),
    },
  },

  {
    routePath: '/client/shops/parsing-reports',
    component: ParsingReports,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Parsing reports'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SHOPS,
      activeSubCategory: 2,
      title: () => 'Parsing reports',
    },
  },

  {
    routePath: '/client/warehouse',
    component: ClientWarehouseView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_WAREHOUSE_CLIENT,

    crumbNameKey: TranslationKey['My warehouse'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: '',
      title: () => t(TranslationKey.Warehouse),
    },
  },

  {
    routePath: '/client/warehouse/in-stock',
    component: ClientInStockBoxesView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_WAREHOUSE_BOXESINSTOCK_CLIENT,

    crumbNameKey: TranslationKey['Boxes in stock'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BOXES,
      title: () => t(TranslationKey['Boxes in stock']),
    },
  },

  {
    routePath: '/client/my-orders',
    component: ClientMyOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_ORDERS_CLIENT,

    crumbNameKey: TranslationKey['My orders'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_ORDERS,
      activeSubCategory: '',
      title: () => t(TranslationKey['My orders']),
    },
  },

  {
    routePath: '/client/my-orders/orders',
    component: ClientOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_ORDERS_CLIENT,

    crumbNameKey: TranslationKey.Orders,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS,
      title: () => t(TranslationKey.Orders),
    },
  },

  {
    routePath: '/client/my-orders/pending-orders',
    component: ClientOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_PENDING_ORDERS_CLIENT,

    crumbNameKey: TranslationKey['Pending orders'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_PENDING_ORDERS,
      title: () => t(TranslationKey['Pending orders']),
    },
  },

  // {
  //   routePath: "/client/settings",
  //   component: ClientSettingsView,
  //   exact: true,
  //   permission: [UserRole.CLIENT],
  //
  //   crumbNameKey: TranslationKey.Profile,
  //
  //   navigationInfo: {
  //     activeCategory: navBarActiveCategory.NAVBAR_SETTINGS,
  //     activeSubCategory: "",
  //     title: () =>  t(TranslationKey.Profile)
  //   }
  // },

  {
    routePath: '/client/my-orders/orders/order',
    component: ClientOrderView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_ORDERS_CLIENT,

    crumbNameKey: TranslationKey.Order,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS,
      title: () => t(TranslationKey.Order),
    },
  },

  {
    routePath: '/client/my-orders/pending-orders/order',
    component: ClientOrderView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_PENDING_ORDERS_CLIENT,

    crumbNameKey: TranslationKey.Order,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_ORDERS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_CLIENT_PENDING_ORDERS,
      title: () => t(TranslationKey.Order),
    },
  },

  {
    routePath: '/client/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_USERS_CLIENT,

    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/client/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_USERS_CLIENT,

    crumbNameKey: TranslationKey['My users'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/client/notifications',
    component: CategoryRootView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_CLIENT,

    crumbNameKey: TranslationKey.Notifications,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Notifications),
    },
  },
  {
    routePath: '/client/notifications/orders-notifications',
    component: ClientOrdersNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_ORDERS_CLIENT,

    crumbNameKey: TranslationKey['On orders'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['Order notifications']),
    },
  },

  {
    routePath: '/client/notifications/boxes-notifications',
    component: ClientBoxesNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_BOXES_CLIENT,

    crumbNameKey: TranslationKey['On boxes'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: 1,
      title: () => t(TranslationKey['Box notifications']),
    },
  },

  {
    routePath: '/client/notifications/tariffs-notifications',
    component: ClientBoxesTariffsNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_BOXESTARIF_CLIENT,

    crumbNameKey: TranslationKey['On boxes tariffs'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: 2,
      title: () => t(TranslationKey['Notifications on box rates']),
    },
  },

  {
    routePath: '/client/notifications/freelance-notifications',
    component: ClientFreelanceNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_REQUESTS_CLIENT,

    crumbNameKey: TranslationKey['Request messages'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: 3, // change to 4 because the ideas-notification are now hidden
      title: () => t(TranslationKey.Notifications),
    },
  },

  {
    routePath: '/client/notifications/general-notifications-view',
    component: GeneralNotificationsView,
    exact: false,
    permission: [UserRole.CLIENT],

    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_GENERAL_CLIENT,

    crumbNameKey: TranslationKey['General notifications'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_GENERAL_NOTIFICATIONS,
      title: () => t(TranslationKey['General notifications']),
    },
  },

  {
    routePath: '/client/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_PAYMENTS_CLIENT,

    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },

  {
    routePath: '/client/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_CHAT_CLIENT,

    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_DASHOBARD_SUPERVISOR,

    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },

  {
    routePath: '/supervisor/freelance/deals-on-review',
    component: DealsOnReviewView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['Deals on review'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DEALS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW,
      title: () => t(TranslationKey['Deals on review']),
    },
  },

  {
    routePath: '/supervisor/freelance/deals-on-review/deal-on-review',
    component: DealsOnReviewDetailsView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Deal,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DEALS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_DEALS_ON_REVIEW,
      title: () => t(TranslationKey['Vacant deals']),
    },
  },

  {
    routePath: '/supervisor/products',
    component: SupervisorProductsView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_PRODUCTS_SUPERVISOR,

    crumbNameKey: TranslationKey['My products'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey['My products']),
    },
  },

  {
    routePath: '/supervisor/products/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/supervisor/ready-to-check/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],

    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/supervisor/ready-to-check-by-client/product',
    component: SupervisorProductView,
    exact: false,
    permission: [UserRole.SUPERVISOR],

    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      activeSubCategory: 1,
      title: () => t(TranslationKey.Product),
    },
  },
  {
    routePath: '/supervisor/ready-to-check',
    component: SupervisorReadyToCheckView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_VAC_BY_RES_SUPERVISOR,

    crumbNameKey: TranslationKey['Supplier search'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_FROM_THE_RESEARCHER,
      title: () => `${t(TranslationKey['Ready to check'])} - ${t(TranslationKey['From the Researcher'])}`,
    },
  },

  {
    routePath: '/supervisor/ready-to-check-by-client',
    component: SupervisorReadyToCheckByClientView,
    exact: true,
    permission: [UserRole.SUPERVISOR],

    permissionKey: permissionsKeys.supervisor.SHOW_VAC_BY_CLIENT_SUPERVISOR,

    crumbNameKey: TranslationKey['Supplier search'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_READY_TO_CHECK,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_FROM_THE_CLIENT,
      title: () => `${t(TranslationKey['Ready to check'])} - ${t(TranslationKey['From the Client'])}`,
    },
  },

  {
    routePath: '/supervisor/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_USERS_SUPERVISOR,

    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/supervisor/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['My users'],
    permissionKey: permissionsKeys.supervisor.SHOW_USERS_SUPERVISOR,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Users),
    },
  },
  {
    routePath: '/supervisor/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_PAYMENTS_SUPERVISOR,

    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },

  {
    routePath: '/supervisor/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_CHAT_SUPERVISOR,

    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/supervisor/settings',
    component: SupervisorSettingsView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_SETTINGS_SUPERVISOR,

    crumbNameKey: TranslationKey.Settings,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SETTINGS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Settings),
    },
  },

  {
    routePath: '/warehouse/dashboard',
    component: WarehouseDashboardView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_DASHBOARD_STOREKEEPER,

    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },

  {
    routePath: '/warehouse/tasks',
    component: WarehouseTasksView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_MY_TASKS_STOREKEEPER,

    crumbNameKey: TranslationKey.Tasks,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TASKS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Tasks),
    },
  },

  {
    routePath: '/warehouse/tasks/vacant-tasks',
    component: WarehouseVacantTasksView,
    exact: false,
    permissionKey: permissionsKeys.storekeeper.SHOW_TASKS_NEWTASKS_STOREKEEPER,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['New tasks'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TASKS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_VAC_TASKS,
      title: () => t(TranslationKey['New tasks']),
    },
  },
  {
    routePath: '/warehouse/tasks/my-tasks',
    component: WarehouseMyTasksView,
    exact: false,
    permissionKey: permissionsKeys.storekeeper.SHOW_TASKS_MYTASKS_STOREKEEPER,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['My tasks'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TASKS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_MY_TASKS,
      title: () => t(TranslationKey['My tasks']),
    },
  },

  {
    routePath: '/warehouse/tasks/completed-tasks',
    component: WarehouseCompletedTasksView,
    exact: false,
    permissionKey: permissionsKeys.storekeeper.SHOW_TASKS_COMPLETTASKS_STOREKEEPER,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Completed tasks'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TASKS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_COMPLETED_TASKS,
      title: () => t(TranslationKey['Completed tasks']),
    },
  },

  {
    routePath: '/warehouse/tasks/canceled-tasks',
    component: WarehouseCanceledTasksView,
    exact: false,
    permissionKey: permissionsKeys.storekeeper.SHOW_TASKS_CANCELTASKS_STOREKEEPER,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Canceled tasks'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_TASKS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_CANCELED_TASKS,
      title: () => t(TranslationKey['Canceled tasks']),
    },
  },

  {
    routePath: '/warehouse/batches',
    component: WarehouseBatchesView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_BATCHES_STOREKEEPER,

    crumbNameKey: TranslationKey.Batches,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Batches),
    },
  },

  {
    routePath: '/warehouse/batches/awaiting-batches',
    component: WarehouseAwaitingBatchesView,
    exact: false,
    permissionKey: permissionsKeys.storekeeper.SHOW_BATCHES_AWAITINGSEND_STOREKEEPER,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey['Awaiting send'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_AWAITING_BATCHES,
      title: () => t(TranslationKey['Awaiting send']),
    },
  },

  {
    routePath: '/warehouse/batches/sent-batches',
    component: WarehouseSentBatchesView,
    exact: false,
    permissionKey: permissionsKeys.storekeeper.SHOW_BATCHES_SENT_STOREKEEPER,
    permission: [UserRole.STOREKEEPER],
    crumbNameKey: TranslationKey.Sent,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_WAREHOUSE_BATCHES,
      title: () => t(TranslationKey.Sent),
    },
  },
  {
    routePath: '/warehouse/my-warehouse',
    component: WarehouseMyWarehouseView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_WAREHOUSE_STOREKEEPER,

    crumbNameKey: TranslationKey['My warehouse'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: '',
      title: () => t(TranslationKey['My warehouse']),
    },
  },

  {
    routePath: '/warehouse/management',
    component: WarehouseManagementView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_MANAGEMENT_STOREKEEPER,

    crumbNameKey: TranslationKey['Warehouse management'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MANAGEMENT,
      activeSubCategory: '',
      title: () => t(TranslationKey['Warehouse management']),
    },
  },

  {
    routePath: '/warehouse/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER,

    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/warehouse/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER,
    crumbNameKey: TranslationKey['My users'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['My users']),
    },
  },

  {
    routePath: '/warehouse/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_PAYMENTS_STOREKEEPER,

    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },

  {
    routePath: '/warehouse/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_CHAT_STOREKEEPER,

    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/admin/dashboard',
    component: AdminDashboardView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },
  {
    routePath: '/admin/exchange',
    component: AdminExchangeViews,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Commodity exchange'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_EXCHANGE,
      activeSubCategory: '',
      title: () => t(TranslationKey['Commodity exchange']),
    },
  },
  {
    routePath: '/admin/inventory',
    component: AdminInventoryView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Inventory,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_INVENTORY,
      activeSubCategory: '',
      title: () => t(TranslationKey.Inventory),
    },
  },
  {
    routePath: '/admin/orders/order',
    component: AdminOrderView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Order,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Order),
    },
  },
  {
    routePath: '/admin/permissions',
    component: AdminUserPermissionsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['User permissions'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_PERMISSIONS,
      activeSubCategory: '',
      title: () => t(TranslationKey['User permissions']),
    },
  },
  {
    routePath: '/admin/orders',
    component: AdminOrdersViews,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Orders,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Orders),
    },
  },
  {
    routePath: '/admin/exchange/product',
    component: AdminProductView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_EXCHANGE,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/admin/inventory/product',
    component: AdminProductView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Product,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_INVENTORY,
      activeSubCategory: '',
      title: () => t(TranslationKey.Product),
    },
  },

  {
    routePath: '/admin/warehouse',
    component: AdminWarehouseView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Warehouse,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: '',
      title: () => t(TranslationKey.Warehouse),
    },
  },
  {
    routePath: '/admin/warehouse/tasks',
    component: AdminWarehouseTasksView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Tasks,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Tasks),
    },
  },
  {
    routePath: '/admin/warehouse/boxes',
    component: AdminWarehouseBoxesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Boxes,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: 1,
      title: () => t(TranslationKey.Boxes),
    },
  },

  {
    routePath: '/admin/warehouse/destinations',
    component: AdminDestinationsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Destinations,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_WAREHOUSE,
      activeSubCategory: 2,
      title: () => t(TranslationKey.Destinations),
    },
  },

  {
    routePath: '/admin/parsing',
    component: ParsingView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Parsing,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_PARSING,
      activeSubCategory: '',
      title: () => t(TranslationKey.Parsing),
    },
  },

  {
    routePath: '/admin/parsing/profiles',
    component: ParsingProdileView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Profiles,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_PARSING,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Profiles),
    },
  },

  {
    routePath: '/admin/parsing/requests',
    component: ParsingRequestsView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Requests,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_PARSING,
      activeSubCategory: 1,
      title: () => t(TranslationKey.Requests),
    },
  },

  {
    routePath: '/admin/batches',
    component: AdminBatchesView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Batches,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Batches),
    },
  },

  {
    routePath: '/admin/batches/awaiting-batches',
    component: AdminAwaitingBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Awaiting send'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: 0,
      title: () => t(TranslationKey['Awaiting send']),
    },
  },

  {
    routePath: '/admin/batches/sent-batches',
    component: AdminSentBatchesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Sent,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_BATCHES,
      activeSubCategory: 1,
      title: () => t(TranslationKey.Sent),
    },
  },

  {
    routePath: '/admin/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },
  {
    routePath: '/admin/users',
    component: AdminUsersView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/admin/users/user',
    component: AdminUserView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.User,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.User),
    },
  },

  {
    routePath: '/admin/settings',
    component: AdminSettingsView,
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Settings,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SETTINGS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Settings),
    },
  },

  {
    routePath: '/admin/feedback',
    component: AdminFeedbackView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Feedback,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FEEDBACK,
      activeSubCategory: '',
      title: () => t(TranslationKey.Feedback),
    },
  },

  {
    routePath: '/admin/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/admin/updated',
    component: PatchNoutesView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Patch notes'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_UPDATED,
      activeSubCategory: '',
      title: () => t(TranslationKey['Patch notes']),
    },
  },

  {
    routePath: '/freelancer/dashboard',
    component: FreelancerDashboardView,
    exact: false,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_DASHBOARD_FREELANCER,
    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },

  {
    routePath: '/freelancer/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/freelancer/users/sub-users',
    component: SubUsersView,
    exact: false,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_USERS_FREELANCER,
    crumbNameKey: TranslationKey['My users'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['My users']),
    },
  },

  {
    routePath: '/freelancer/finances',
    component: FinancesView,
    exact: false,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_PAYMENTS_FREELANCER,
    crumbNameKey: TranslationKey.Finances,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FINANCES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Finances),
    },
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    routePath: '/freelancer/freelance',
    component: FreelancerFreelanceView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Freelance,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Freelance),
    },
  },

  {
    routePath: '/freelancer/freelance/my-proposals',
    component: MyProposalsView,
    exact: true,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_PROPOSALS_FREELANCER,
    crumbNameKey: TranslationKey['My proposals'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
      title: () => t(TranslationKey['My proposals']),
    },
  },

  {
    routePath: '/freelancer/freelance/all-proposals',
    component: AllProposalsView,
    exact: true,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_FREELANCE_ALLPROPOSALS_FREELANCER,
    crumbNameKey: TranslationKey['All proposals'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_ALL_PROPOSALS,
      title: () => t(TranslationKey['All proposals']),
    },
  },

  {
    routePath: '/freelancer/freelance/vacant-requests',
    component: VacantRequestsView,
    exact: true,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_VAC_REQUESTS_FREELANCER,
    crumbNameKey: TranslationKey['Vacant requests'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey['Vacant requests']),
    },
  },

  {
    routePath: '/freelancer/freelance/vacant-requests/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Request,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey.Request),
    },
  },

  {
    routePath: '/freelancer/freelance/source-files',
    component: SourceFilesView,
    exact: true,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_SOURCES_FREELANCER,
    crumbNameKey: TranslationKey['Source Files'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_SOURCE_FILES,
      title: () => t(TranslationKey['Vacant requests']),
    },
  },

  {
    routePath: '/freelancer/freelance/my-proposals/custom-search-request',
    component: RequestDetailCustomView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Request,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_PROPOSALS,
      title: () => t(TranslationKey.Request),
    },
  },

  {
    routePath: '/freelancer/freelance/my-proposals/edit-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Proposal Edition'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey['Proposal Edition']),
    },
  },

  {
    routePath: '/freelancer/freelance/vacant-requests/custom-search-request/create-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Proposal Creation'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey['Proposal Creation']),
    },
  },

  {
    routePath: '/freelancer/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_CHAT_FREELANCER,
    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  {
    routePath: '/freelancer/freelance/my-services',
    component: MyServicesView,
    exact: true,
    permission: [UserRole.FREELANCER],
    permissionKey: permissionsKeys.freelancer.SHOW_ANNOUNCEMENTS_FREELANCER,
    crumbNameKey: TranslationKey['My services'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES,
      title: () => t(TranslationKey['My services']),
    },
  },

  {
    routePath: '/freelancer/freelance/my-services/create-service',
    component: CreateOrEditServicesView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Create service'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES,
      title: () => t(TranslationKey['Create service']),
    },
  },

  {
    routePath: '/freelancer/freelance/my-services/service-detailds',
    component: ServiceDetailsView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Service details'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES,
      title: () => t(TranslationKey['Service details']),
    },
  },

  {
    routePath: '/freelancer/freelance/my-services/service-detailds/edit-service',
    component: CreateOrEditServicesView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Edit service'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES,
      title: () => t(TranslationKey['Edit service']),
    },
  },

  {
    routePath: '/freelancer/freelance/my-services/service-detailds/custom-service-type',
    component: ServicesDetailCustomView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey.Request,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_MY_SERVICES,
      title: () => t(TranslationKey.Request),
    },
  },

  {
    routePath: '/freelancer/freelance/my-services/service-detailds/custom-service-type/create-proposal',
    component: CreateOrEditProposalView,
    exact: true,
    permission: [UserRole.FREELANCER],
    crumbNameKey: TranslationKey['Proposal Creation'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_REQUESTS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_VACANT_REQUESTS,
      title: () => t(TranslationKey['Proposal Creation']),
    },
  },

  {
    routePath: '/freelancer/notifications',
    component: CategoryRootView,
    exact: true,
    permission: [UserRole.FREELANCER],

    permissionKey: permissionsKeys.freelancer.SHOW_NOTIFICATIONS_FREELANCER,

    crumbNameKey: TranslationKey.Notifications,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Notifications),
    },
  },

  {
    routePath: '/freelancer/notifications/freelance-notifications',
    component: ClientFreelanceNotificationsView,
    exact: false,
    permission: [UserRole.FREELANCER],

    permissionKey: permissionsKeys.freelancer.SHOW_NOTIFICATIONS_REQUESTS_FREELANCER,

    crumbNameKey: TranslationKey['Request messages'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: 0,
      title: () => t(TranslationKey.Notifications),
    },
  },

  {
    routePath: '/freelancer/notifications/general-notifications-view',
    component: GeneralNotificationsView,
    exact: false,
    permission: [UserRole.FREELANCER],

    permissionKey: permissionsKeys.freelancer.SHOW_NOTIFICATIONS_GENERAL_FREELANCER,

    crumbNameKey: TranslationKey['General notifications'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_ORDERS_NOTIFICATIONS,
      activeSubCategory: navBarActiveSubCategory.SUB_NAVBAR_GENERAL_NOTIFICATIONS,
      title: () => t(TranslationKey['General notifications']),
    },
  },

  {
    routePath: '/moderator/dashboard',
    component: ModeratorDashboardView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Dashboard,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_DASHBOARD,
      activeSubCategory: '',
      title: () => t(TranslationKey.Dashboard),
    },
  },

  {
    routePath: '/moderator/appeals',
    component: ModeratorAppealsView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Appeals,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_APPEALS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Appeals),
    },
  },

  {
    routePath: '/moderator/appeals/appeal',
    component: ModeratorAppealView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Appeal,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_APPEALS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Appeals),
    },
  },

  {
    routePath: '/moderator/my-products',
    component: ModeratorMyProductsView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey['My products'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MY_PRODUCTS,
      activeSubCategory: '',
      title: () => t(TranslationKey['My products']),
    },
  },

  {
    routePath: '/moderator/updated',
    component: PatchNoutesView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey['Patch notes'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_UPDATED,
      activeSubCategory: '',
      title: () => t(TranslationKey['Patch notes']),
    },
  },

  {
    routePath: '/moderator/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Users,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Users),
    },
  },

  {
    routePath: '/moderator/users/sub-users',
    component: SubUsersView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey['My users'],

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_USERS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['My users']),
    },
  },

  {
    routePath: '/moderator/settings',
    component: ModeratorSettingsView,
    exact: true,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Settings,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_SETTINGS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Settings),
    },
  },

  {
    routePath: '/moderator/feedback',
    component: AdminFeedbackView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Feedback,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_FEEDBACK,
      activeSubCategory: '',
      title: () => t(TranslationKey.Feedback),
    },
  },

  {
    routePath: '/moderator/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.MODERATOR],
    crumbNameKey: TranslationKey.Messages,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_MESSAGES,
      activeSubCategory: '',
      title: () => t(TranslationKey.Messages),
    },
  },

  // * Client Ideas

  {
    routePath: '/client/ideas',
    component: CategoryRootView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey.Ideas,

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: '',
      title: () => t(TranslationKey.Ideas),
    },
  },

  {
    routePath: '/client/ideas/new',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_NEW_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['New ideas']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 0,
      title: () => t(TranslationKey['New ideas']),
    },
  },

  {
    routePath: '/client/ideas/on-checking',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_ON_CHECKING_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['On checking']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 1,
      title: () => t(TranslationKey['On checking']),
    },
  },

  {
    routePath: '/client/ideas/search-suppliers',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_SEARCH_SUPPLIER_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['Search for suppliers']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 2,
      title: () => t(TranslationKey['Search for suppliers']),
    },
  },

  {
    routePath: '/client/ideas/create-card',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_CREATE_CARD_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['Creating a product card']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 3,
      title: () => t(TranslationKey['Creating a product card']),
    },
  },

  {
    routePath: '/client/ideas/add-asin',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_ADD_ASIN_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['Adding ASIN']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 4,
      title: () => t(TranslationKey['Adding ASIN']),
    },
  },

  {
    routePath: '/client/ideas/realized',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_REALIZED_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['Realized ideas']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 5,
      title: () => t(TranslationKey['Realized ideas']),
    },
  },

  {
    routePath: '/client/ideas/closed',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_CLOSED_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey['Rejected and closed']),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 6,
      title: () => t(TranslationKey['Rejected and closed']),
    },
  },

  {
    routePath: '/client/ideas/all',
    component: ClientIdeasView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.ideas.SHOW_ALL_IDEAS_CLIENT,
    crumbNameKey: t(TranslationKey.All),

    navigationInfo: {
      activeCategory: navBarActiveCategory.NAVBAR_IDEAS,
      activeSubCategory: 7,
      title: () => t(TranslationKey.All),
    },
  },
]
