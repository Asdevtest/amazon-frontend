import {lazy} from 'react'

import {permissionsKeys} from './permissions'
// import {AdminAwaitingBatchesView} from '@views/admin/admin-batches-views/admin-awaiting-batches-view'
// import {AdminBatchesView} from '@views/admin/admin-batches-views/admin-batches-view'
// import {AdminSentBatchesView} from '@views/admin/admin-batches-views/admin-sent-batches-view'
// import {AdminDashboardView} from '@views/admin/admin-dashboard-view'
// import {AdminExchangeViews} from '@views/admin/admin-exchange-views'
// import {AdminFeedbackView} from '@views/admin/admin-feedback-view'
// import {AdminInventoryView} from '@views/admin/admin-inventory-view'
// import {AdminOrderView} from '@views/admin/admin-orders-views/order'
// import {AdminOrdersViews} from '@views/admin/admin-orders-views/orders'
// import {AdminProductView} from '@views/admin/admin-product-view'
// import {AdminSettingsView} from '@views/admin/admin-settings-view'
// import {AdminTechnicalView} from '@views/admin/admin-technical-view'
// import {AdminUserPermissionsView} from '@views/admin/admin-user-permissions-view'
// import {AdminUserView} from '@views/admin/admin-users-view/admin-user-view'
// import {AdminUsersView} from '@views/admin/admin-users-view/admin-users-view'
// import {AdminDestinationsView} from '@views/admin/admin-warehouse-views/admin-destinations-view'
// import {AdminWarehouseBoxesView} from '@views/admin/admin-warehouse-views/admin-warehouse-boxes-view'
// import {AdminWarehouseTasksView} from '@views/admin/admin-warehouse-views/admin-warehouse-tasks-view'
// import {AdminWarehouseView} from '@views/admin/admin-warehouse-views/admin-warehouse-view'
// import {AuthView} from '@views/auth'
// import {BuyerDashboardView} from '@views/buyer/buyer-dashboard-view'
// import {BuyerMyProductsView} from '@views/buyer/buyer-my-products-view'
// import {BuyerFreeOrdersView} from '@views/buyer/buyer-orders-views/buyer-free-orders-view'
// import {BuyerMyOrdersView} from '@views/buyer/buyer-orders-views/buyer-my-orders-view'
// import {BuyerProductView} from '@views/buyer/buyer-product-view/'
// import {BuyerSearchSupplierByClientView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-client-view'
// import {BuyerSearchSupplierBySupervisorView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-supervisor-view'
// import {BuyerSearchSupplierForIdeaView} from '@views/buyer/buyer-search-supplier-views/buyer-search-supplier-for-idea-view'
// import {ClientAwaitingBatchesView} from '@views/client/client-batches-views/client-awaiting-batches-view'
// import {ClientBatchesView} from '@views/client/client-batches-views/client-batches-view'
// import {ClientReadyBoxesView} from '@views/client/client-batches-views/client-ready-boxes-view'
// import {ClientSentBatchesView} from '@views/client/client-batches-views/client-sent-batches-view'
// import {ClientDashboardView} from '@views/client/client-dashboard-view'
// import {ClientExchangePrivateLabelView} from '@views/client/client-exchange-views/client-exchange-private-label-view'
// import {ClientExchangeView} from '@views/client/client-exchange-views/client-exchange-view'
// import {ClientFreelanceView} from '@views/client/client-freelance-view'
// import {ClientInventoryView} from '@views/client/client-inventory-view'
// import {ClientBoxesNotificationsView} from '@views/client/client-notifications-views/client-boxes-notifications-view'
// import {ClientBoxesTariffsNotificationsView} from '@views/client/client-notifications-views/client-boxes-tariffs-notifications-view'
// import {ClientNotificationsView} from '@views/client/client-notifications-views/client-notifications-view'
// import {ClientOrdersNotificationsView} from '@views/client/client-notifications-views/client-orders-notifications-view'
// import {ClientOrderView} from '@views/client/client-orders-views/order'
// import {ClientOrdersView} from '@views/client/client-orders-views/orders'
// import {ClientProductExchangeView} from '@views/client/client-product-exchange-view'
// import {ClientProductView} from '@views/client/client-product-view/'
// import {ClientSettingsView} from '@views/client/client-settings-view'
// import {ClientShopView} from '@views/client/client-shop-view'
// import {ClientShopsView} from '@views/client/client-shops-view'
// import {ClientBuyShopsView} from '@views/client/client-trading-shops-views/client-buy-shops-view'
// import {ClientSellShopsView} from '@views/client/client-trading-shops-views/client-sell-shops-view'
// import {ClientTradingShopsView} from '@views/client/client-trading-shops-views/client-trading-shops-view'
// import {CreateOrEditTradingShopView} from '@views/client/client-trading-shops-views/create-or-edit-trading-shop-view'
// import {ClientWarehouseView} from '@views/client/client-warehouse-view'
// import {FreelancerDashboardView} from '@views/freelancer/freelancer-dashboard-view'
// import {FreelancerFreelanceView} from '@views/freelancer/freelancer-freelance-view'
// import {ModeratorAppealView} from '@views/moderator/moderator-appeal-view/moderator-appeal-view'
// // import {ModeratorAppealView} from '@views/moderator/moderator-appeal-view'
// import {ModeratorAppealsView} from '@views/moderator/moderator-appeals-view/moderator-appeals-view'
// import {ModeratorDashboardView} from '@views/moderator/moderator-dashboard-view'
// import {ModeratorMyProductsView} from '@views/moderator/moderator-my-products-view'
// import {ModeratorSettingsView} from '@views/moderator/moderator-settings-view'
// import {RegistrationView} from '@views/registration'
// import {ResearcherDashboardView} from '@views/researcher/researcher-dashboard-view'
// import {ResearcherProductView} from '@views/researcher/researcher-product-view/researcher-product-view'
// import {ResearcherProductsView} from '@views/researcher/researcher-products-view'
// import {AnotherUserProfileView} from '@views/shared/another-user-profile-view'
// import {CreateOrEditProposalView} from '@views/shared/create-or-edit-proposal-view'
// import {CreateOrEditRequestView} from '@views/shared/create-or-edit-request-view'
// import {DealsOnReviewDetailsView} from '@views/shared/deals-on-review-details-view'
// import {DealsOnReviewView} from '@views/shared/deals-on-review-view/deals-on-review-view'
// import {FinancesView} from '@views/shared/finances-view'
// import {MessagesView} from '@views/shared/messages-view'
// import {MyProposalsView} from '@views/shared/my-proposals-view'
// import {MyRequestsView} from '@views/shared/my-requests-view'
// import {OwnerRequestDetailCustomView} from '@views/shared/owner-requests-detail-custom-view'
// import {RequestDetailCustomView} from '@views/shared/servant-requests-detail-custom-view'
// import {SubUsersView} from '@views/shared/sub-users-view/sub-users-view'
// import {UserProfileView} from '@views/shared/user-profile-view/user-profile-view'
// import {UsersView} from '@views/shared/users-view'
// import {VacantDealsDetailsView} from '@views/shared/vacant-deals-details-view'
// import {VacantDealsView} from '@views/shared/vacant-deals-view'
// import {VacantRequestsView} from '@views/shared/vacant-requests-view/vacant-requests-view'
// import {SupervisorDashboardView} from '@views/supervisor/supervisor-dashboard-view'
// import {SupervisorFreelanceView} from '@views/supervisor/supervisor-freelance-view'
// import {SupervisorProductView} from '@views/supervisor/supervisor-product-view/supervisor-product-view'
// import {SupervisorProductsView} from '@views/supervisor/supervisor-products-view/'
// import {SupervisorReadyToCheckByClientView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-by-client-view'
// import {SupervisorReadyToCheckForIdeaView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-for-idea'
// import {SupervisorReadyToCheckView} from '@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-view'
// import {SupervisorSettingsView} from '@views/supervisor/supervisor-settings-view'
// import {TermsView} from '@views/terms'
// import {WarehouseAwaitingBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-awaiting-batches-view'
// import {WarehouseBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-batches-view'
// import {WarehouseSentBatchesView} from '@views/warehouse/warehouse-batches-views/warehouse-sent-batches-view/warehouse-sent-batches-view'
// import {WarehouseDashboardView} from '@views/warehouse/warehouse-dashboard-view'
// import {WarehouseManagementView} from '@views/warehouse/warehouse-management-view'
// import {WarehouseMyWarehouseView} from '@views/warehouse/warehouse-my-warehouse-view'
// import {WarehouseCanceledTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-canceled-tasks-view'
// import {WarehouseCompletedTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-completed-tasks-view'
// import {WarehouseMyTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-my-tasks-view'
// import {WarehouseTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-tasks-view'
// import {WarehouseVacantTasksView} from '@views/warehouse/warehouse-tasks-views/warehouse-vacant-tasks-view'
import {TranslationKey} from './translations/translation-key'
import {UserRole} from './user-roles'

const AdminAwaitingBatchesView = lazy(() =>
  import('@views/admin/admin-batches-views/admin-awaiting-batches-view').then(module => ({
    default: module.AdminAwaitingBatchesView,
  })),
)
const AdminBatchesView = lazy(() =>
  import('@views/admin/admin-batches-views/admin-batches-view').then(module => ({default: module.AdminBatchesView})),
)
const AdminSentBatchesView = lazy(() =>
  import('@views/admin/admin-batches-views/admin-sent-batches-view').then(module => ({
    default: module.AdminSentBatchesView,
  })),
)
const AdminDashboardView = lazy(() =>
  import('@views/admin/admin-dashboard-view').then(module => ({default: module.AdminDashboardView})),
)
const AdminExchangeViews = lazy(() =>
  import('@views/admin/admin-exchange-views').then(module => ({default: module.AdminExchangeViews})),
)
const AdminFeedbackView = lazy(() =>
  import('@views/admin/admin-feedback-view').then(module => ({default: module.AdminFeedbackView})),
)
const AdminInventoryView = lazy(() =>
  import('@views/admin/admin-inventory-view').then(module => ({default: module.AdminInventoryView})),
)
const AdminOrderView = lazy(() =>
  import('@views/admin/admin-orders-views/order').then(module => ({default: module.AdminOrderView})),
)
const AdminOrdersViews = lazy(() =>
  import('@views/admin/admin-orders-views/orders').then(module => ({default: module.AdminOrdersViews})),
)
const AdminProductView = lazy(() =>
  import('@views/admin/admin-product-view').then(module => ({default: module.AdminProductView})),
)
const AdminSettingsView = lazy(() =>
  import('@views/admin/admin-settings-view').then(module => ({default: module.AdminSettingsView})),
)
const AdminTechnicalView = lazy(() =>
  import('@views/admin/admin-technical-view').then(module => ({default: module.AdminTechnicalView})),
)
const AdminUserPermissionsView = lazy(() =>
  import('@views/admin/admin-user-permissions-view').then(module => ({default: module.AdminUserPermissionsView})),
)
const AdminUserView = lazy(() =>
  import('@views/admin/admin-users-view/admin-user-view').then(module => ({default: module.AdminUserView})),
)
const AdminUsersView = lazy(() =>
  import('@views/admin/admin-users-view/admin-users-view').then(module => ({default: module.AdminUsersView})),
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
const AuthView = lazy(() => import('@views/auth').then(module => ({default: module.AuthView})))

const BuyerDashboardView = lazy(() =>
  import('@views/buyer/buyer-dashboard-view').then(module => ({default: module.BuyerDashboardView})),
)

const BuyerMyProductsView = lazy(() =>
  import('@views/buyer/buyer-my-products-view').then(module => ({default: module.BuyerMyProductsView})),
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
  import('@views/buyer/buyer-orders-views/buyer-my-orders-view').then(module => ({default: module.BuyerMyOrdersView})),
)
const BuyerProductView = lazy(() =>
  import('@views/buyer/buyer-product-view/').then(module => ({default: module.BuyerProductView})),
)
const BuyerSearchSupplierByClientView = lazy(() =>
  import('@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-client-view').then(module => ({
    default: module.BuyerSearchSupplierByClientView,
  })),
)
const BuyerSearchSupplierBySupervisorView = lazy(() =>
  import('@views/buyer/buyer-search-supplier-views/buyer-search-supplier-by-supervisor-view').then(module => ({
    default: module.BuyerSearchSupplierBySupervisorView,
  })),
)
const BuyerSearchSupplierForIdeaView = lazy(() =>
  import('@views/buyer/buyer-search-supplier-views/buyer-search-supplier-for-idea-view').then(module => ({
    default: module.BuyerSearchSupplierForIdeaView,
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
const ClientReadyBoxesView = lazy(() =>
  import('@views/client/client-warehouse-views/client-ready-boxes-view').then(module => ({
    default: module.ClientReadyBoxesView,
  })),
)
const ClientSentBatchesView = lazy(() =>
  import('@views/client/client-batches-views/client-sent-batches-view').then(module => ({
    default: module.ClientSentBatchesView,
  })),
)
const ClientDashboardView = lazy(() =>
  import('@views/client/client-dashboard-view').then(module => ({default: module.ClientDashboardView})),
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
  import('@views/client/client-freelance-view').then(module => ({default: module.ClientFreelanceView})),
)
const ClientInventoryView = lazy(() =>
  import('@views/client/client-inventory-view').then(module => ({default: module.ClientInventoryView})),
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
const ClientNotificationsView = lazy(() =>
  import('@views/client/client-notifications-views/client-notifications-view').then(module => ({
    default: module.ClientNotificationsView,
  })),
)
const ClientOrdersNotificationsView = lazy(() =>
  import('@views/client/client-notifications-views/client-orders-notifications-view').then(module => ({
    default: module.ClientOrdersNotificationsView,
  })),
)
const ClientOrderView = lazy(() =>
  import('@views/client/client-orders-views/order').then(module => ({default: module.ClientOrderView})),
)
const ClientOrdersView = lazy(() =>
  import('@views/client/client-orders-views/orders').then(module => ({default: module.ClientOrdersView})),
)
const ClientProductExchangeView = lazy(() =>
  import('@views/client/client-product-exchange-view').then(module => ({default: module.ClientProductExchangeView})),
)
const ClientProductView = lazy(() =>
  import('@views/client/client-product-view/').then(module => ({default: module.ClientProductView})),
)
const ClientSettingsView = lazy(() =>
  import('@views/client/client-settings-view').then(module => ({default: module.ClientSettingsView})),
)
const ClientShopView = lazy(() =>
  import('@views/client/client-shop-view').then(module => ({default: module.ClientShopView})),
)
const ClientShopsView = lazy(() =>
  import('@views/client/client-shops-view').then(module => ({default: module.ClientShopsView})),
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
  import('@views/freelancer/freelancer-dashboard-view').then(module => ({default: module.FreelancerDashboardView})),
)
const FreelancerFreelanceView = lazy(() =>
  import('@views/freelancer/freelancer-freelance-view').then(module => ({default: module.FreelancerFreelanceView})),
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
  import('@views/moderator/moderator-dashboard-view').then(module => ({default: module.ModeratorDashboardView})),
)
const ModeratorMyProductsView = lazy(() =>
  import('@views/moderator/moderator-my-products-view').then(module => ({default: module.ModeratorMyProductsView})),
)
const ModeratorSettingsView = lazy(() =>
  import('@views/moderator/moderator-settings-view').then(module => ({default: module.ModeratorSettingsView})),
)
const RegistrationView = lazy(() => import('@views/registration').then(module => ({default: module.RegistrationView})))
const ResearcherDashboardView = lazy(() =>
  import('@views/researcher/researcher-dashboard-view').then(module => ({default: module.ResearcherDashboardView})),
)
const ResearcherProductView = lazy(() =>
  import('@views/researcher/researcher-product-view/researcher-product-view').then(module => ({
    default: module.ResearcherProductView,
  })),
)
const ResearcherProductsView = lazy(() =>
  import('@views/researcher/researcher-products-view').then(module => ({default: module.ResearcherProductsView})),
)
const AnotherUserProfileView = lazy(() =>
  import('@views/shared/another-user-profile-view').then(module => ({default: module.AnotherUserProfileView})),
)
const CreateOrEditProposalView = lazy(() =>
  import('@views/shared/create-or-edit-proposal-view').then(module => ({default: module.CreateOrEditProposalView})),
)
const CreateOrEditRequestView = lazy(() =>
  import('@views/shared/create-or-edit-request-view').then(module => ({default: module.CreateOrEditRequestView})),
)
const DealsOnReviewDetailsView = lazy(() =>
  import('@views/shared/deals-on-review-details-view').then(module => ({default: module.DealsOnReviewDetailsView})),
)
const DealsOnReviewView = lazy(() =>
  import('@views/shared/deals-on-review-view/deals-on-review-view').then(module => ({
    default: module.DealsOnReviewView,
  })),
)
const FinancesView = lazy(() => import('@views/shared/finances-view').then(module => ({default: module.FinancesView})))
const MessagesView = lazy(() => import('@views/shared/messages-view').then(module => ({default: module.MessagesView})))
const MyProposalsView = lazy(() =>
  import('@views/shared/my-proposals-view').then(module => ({default: module.MyProposalsView})),
)
const MyRequestsView = lazy(() =>
  import('@views/shared/my-requests-view').then(module => ({default: module.MyRequestsView})),
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
const SubUsersView = lazy(() =>
  import('@views/shared/sub-users-view/sub-users-view').then(module => ({default: module.SubUsersView})),
)
const UserProfileView = lazy(() =>
  import('@views/shared/user-profile-view/user-profile-view').then(module => ({default: module.UserProfileView})),
)
const UsersView = lazy(() => import('@views/shared/users-view').then(module => ({default: module.UsersView})))
const VacantDealsDetailsView = lazy(() =>
  import('@views/shared/vacant-deals-details-view').then(module => ({default: module.VacantDealsDetailsView})),
)
const VacantDealsView = lazy(() =>
  import('@views/shared/vacant-deals-view').then(module => ({default: module.VacantDealsView})),
)
const VacantRequestsView = lazy(() =>
  import('@views/shared/vacant-requests-view/vacant-requests-view').then(module => ({
    default: module.VacantRequestsView,
  })),
)
const SupervisorDashboardView = lazy(() =>
  import('@views/supervisor/supervisor-dashboard-view').then(module => ({default: module.SupervisorDashboardView})),
)
const SupervisorFreelanceView = lazy(() =>
  import('@views/supervisor/supervisor-freelance-view').then(module => ({default: module.SupervisorFreelanceView})),
)
const SupervisorProductView = lazy(() =>
  import('@views/supervisor/supervisor-product-view/supervisor-product-view').then(module => ({
    default: module.SupervisorProductView,
  })),
)
const SupervisorProductsView = lazy(() =>
  import('@views/supervisor/supervisor-products-view/').then(module => ({default: module.SupervisorProductsView})),
)
const SupervisorReadyToCheckByClientView = lazy(() =>
  import('@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-by-client-view').then(module => ({
    default: module.SupervisorReadyToCheckByClientView,
  })),
)
const SupervisorReadyToCheckForIdeaView = lazy(() =>
  import('@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-for-idea').then(module => ({
    default: module.SupervisorReadyToCheckForIdeaView,
  })),
)
const SupervisorReadyToCheckView = lazy(() =>
  import('@views/supervisor/supervisor-ready-to-check-views/supervisor-ready-to-check-view').then(module => ({
    default: module.SupervisorReadyToCheckView,
  })),
)
const SupervisorSettingsView = lazy(() =>
  import('@views/supervisor/supervisor-settings-view').then(module => ({default: module.SupervisorSettingsView})),
)
const TermsView = lazy(() => import('@views/terms').then(module => ({default: module.TermsView})))
const WarehouseAwaitingBatchesView = lazy(() =>
  import('@views/warehouse/warehouse-batches-views/warehouse-awaiting-batches-view').then(module => ({
    default: module.WarehouseAwaitingBatchesView,
  })),
)
const WarehouseBatchesView = lazy(() =>
  import('@views/warehouse/warehouse-batches-views/warehouse-batches-view').then(module => ({
    default: module.WarehouseBatchesView,
  })),
)
const WarehouseSentBatchesView = lazy(() =>
  import('@views/warehouse/warehouse-batches-views/warehouse-sent-batches-view/warehouse-sent-batches-view').then(
    module => ({default: module.WarehouseSentBatchesView}),
  ),
)
const WarehouseDashboardView = lazy(() =>
  import('@views/warehouse/warehouse-dashboard-view').then(module => ({default: module.WarehouseDashboardView})),
)
const WarehouseManagementView = lazy(() =>
  import('@views/warehouse/warehouse-management-view').then(module => ({default: module.WarehouseManagementView})),
)
const WarehouseMyWarehouseView = lazy(() =>
  import('@views/warehouse/warehouse-my-warehouse-view').then(module => ({default: module.WarehouseMyWarehouseView})),
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
    routePath: `/profile`,
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
]

export const privateRoutesConfigs = [
  {
    routePath: '/buyer/dashboard',
    component: BuyerDashboardView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_DASHBOARD_BUYER,
    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/buyer/search-supplier-by-supervisor',
    component: BuyerSearchSupplierBySupervisorView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_VAC_ORDERS_BUYER,

    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/buyer/search-supplier-by-client',
    component: BuyerSearchSupplierByClientView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_VAC_BY_CLIENT_BUYER,
    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/buyer/search-supplier-for-idea',
    component: BuyerSearchSupplierForIdeaView,
    exact: true,
    permission: [UserRole.BUYER],

    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/buyer/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_USERS_BUYER,

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
    permissionKey: permissionsKeys.buyer.SHOW_PRODUCTS_BUYER,

    crumbNameKey: TranslationKey['My products'],
  },

  {
    routePath: '/buyer/pending-orders',
    component: BuyerPendingOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_PENDING_ORDERS_BUYER,

    crumbNameKey: TranslationKey['Pending orders'],
  },

  {
    routePath: '/buyer/all-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_BUYER,

    crumbNameKey: TranslationKey['All orders'],
  },
  {
    routePath: '/buyer/not-paid-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_NOT_PAID_BUYER,

    crumbNameKey: TranslationKey['Not paid'],
  },
  {
    routePath: '/buyer/need-track-number-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_NEED_TRACK_NUMBER_BUYER,

    crumbNameKey: TranslationKey['Need track number'],
  },
  {
    routePath: '/buyer/inbound-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_INBOUND_BUYER,

    crumbNameKey: TranslationKey.Inbound,
  },
  {
    routePath: '/buyer/confirmation-required-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_CONFIRMATION_REQUIRED_BUYER,

    crumbNameKey: TranslationKey['Confirmation required'],
  },
  {
    routePath: '/buyer/closed-and-canceled-orders',
    component: BuyerMyOrdersView,
    exact: false,
    permission: [UserRole.BUYER],
    permissionKey: permissionsKeys.buyer.SHOW_ORDERS_CLOSED_AND_CANCELED_BUYER,

    crumbNameKey: TranslationKey['Closed and canceled'],
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
    permissionKey: permissionsKeys.buyer.SHOW_PAYMENTS_BUYER,

    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/buyer/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.BUYER],

    permissionKey: permissionsKeys.buyer.SHOW_CHAT_BUYER,

    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/researcher/dashboard',
    component: ResearcherDashboardView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_DASHBOARD_RESEARCHER,

    crumbNameKey: TranslationKey.Dashboard,
  },
  {
    routePath: '/researcher/products',
    component: ResearcherProductsView,
    exact: true,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_PRODUCTS_RESEARCHER,

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
    permissionKey: permissionsKeys.researcher.SHOW_USERS_RESEARCHER,

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
    permissionKey: permissionsKeys.researcher.SHOW_PAYMENTS_RESEARCHER,

    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/researcher/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.RESEARCHER],
    permissionKey: permissionsKeys.researcher.SHOW_CHAT_RESEARCHER,

    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/client/dashboard',
    component: ClientDashboardView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_DASHBOARD_CLIENT,

    crumbNameKey: TranslationKey.Dashboard,
  },

  // ////////////////////////////////////////////////////////////////////////////////////////////////////

  {
    routePath: '/client/freelance',
    component: ClientFreelanceView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_FREELANCE_CLIENT,

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
    permissionKey: permissionsKeys.client.SHOW_TRADING_SHOPS_CLIENT,

    crumbNameKey: TranslationKey['Trading stores'],
  },

  {
    routePath: '/client/trading-shops/buy-shops',
    component: ClientBuyShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Buy store'],
  },

  {
    routePath: '/client/trading-shops/sell-shops',
    component: ClientSellShopsView,
    exact: true,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Sell the store'],
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
    permissionKey: permissionsKeys.client.SHOW_INVENTORY_CLIENT,

    crumbNameKey: TranslationKey.Archive,
  },

  {
    routePath: '/client/inventory',
    component: ClientInventoryView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_INVENTORY_CLIENT,

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
    crumbNameKey: TranslationKey['Deal exchange'],
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
    permissionKey: permissionsKeys.client.SHOW_BATCHES_CLIENT,

    crumbNameKey: TranslationKey.Batches,
  },

  {
    routePath: '/client/warehouse/boxes-ready-to-batch',
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
    permissionKey: permissionsKeys.client.SHOW_SHOPS_CLIENT,

    crumbNameKey: TranslationKey.Shops,
  },

  {
    routePath: '/client/warehouse',
    component: ClientWarehouseView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_WAREHOUSE_CLIENT,

    crumbNameKey: TranslationKey['My warehouse'],
  },

  {
    routePath: '/client/warehouse/in-stock',
    component: ClientInStockBoxesView,
    exact: false,
    permission: [UserRole.CLIENT],
    crumbNameKey: TranslationKey['Boxes in stock'],
  },
  {
    routePath: '/client/orders',
    component: ClientOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_ORDERS_CLIENT,

    crumbNameKey: TranslationKey.Orders,
  },

  {
    routePath: '/client/pending-orders',
    component: ClientOrdersView,
    exact: true,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_PENDING_ORDERS_CLIENT,

    crumbNameKey: TranslationKey['Pending orders'],
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
    routePath: '/client/pending-orders/order',
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
    permissionKey: permissionsKeys.client.SHOW_USERS_CLIENT,

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
    permissionKey: permissionsKeys.client.SHOW_NOTIFICATIONS_CLIENT,

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
    permissionKey: permissionsKeys.client.SHOW_PAYMENTS_CLIENT,

    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/client/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.CLIENT],
    permissionKey: permissionsKeys.client.SHOW_CHAT_CLIENT,

    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/supervisor/dashboard',
    component: SupervisorDashboardView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_DASHOBARD_SUPERVISOR,

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
    permissionKey: permissionsKeys.supervisor.SHOW_PRODUCTS_SUPERVISOR,

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
    permissionKey: permissionsKeys.supervisor.SHOW_VAC_PRODUCTS_SUPERVISOR,

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
    routePath: '/supervisor/ready-to-check-for-idea',
    component: SupervisorReadyToCheckForIdeaView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    crumbNameKey: TranslationKey['Supplier search'],
  },

  {
    routePath: '/supervisor/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_USERS_SUPERVISOR,

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
    permissionKey: permissionsKeys.supervisor.SHOW_PAYMENTS_SUPERVISOR,

    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/supervisor/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_CHAT_SUPERVISOR,

    crumbNameKey: TranslationKey.Messages,
  },

  {
    routePath: '/supervisor/settings',
    component: SupervisorSettingsView,
    exact: false,
    permission: [UserRole.SUPERVISOR],
    permissionKey: permissionsKeys.supervisor.SHOW_SETTINGS_SUPERVISOR,

    crumbNameKey: TranslationKey.Settings,
  },

  {
    routePath: '/warehouse/dashboard',
    component: WarehouseDashboardView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_DASHBOARD_STOREKEEPER,

    crumbNameKey: TranslationKey.Dashboard,
  },

  {
    routePath: '/warehouse/tasks',
    component: WarehouseTasksView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_MY_TASKS_STOREKEEPER,

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
    permissionKey: permissionsKeys.storekeeper.SHOW_BATCHES_STOREKEEPER,

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
    permissionKey: permissionsKeys.storekeeper.SHOW_WAREHOUSE_STOREKEEPER,

    crumbNameKey: TranslationKey['My warehouse'],
  },

  {
    routePath: '/warehouse/management',
    component: WarehouseManagementView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_MANAGEMENT_STOREKEEPER,

    crumbNameKey: TranslationKey['Warehouse management'],
  },

  {
    routePath: '/warehouse/users',
    component: UsersView,
    exact: true,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_USERS_STOREKEEPER,

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
    permissionKey: permissionsKeys.storekeeper.SHOW_PAYMENTS_STOREKEEPER,

    crumbNameKey: TranslationKey.Finances,
  },

  {
    routePath: '/warehouse/messages',
    component: MessagesView,
    exact: false,
    permission: [UserRole.STOREKEEPER],
    permissionKey: permissionsKeys.storekeeper.SHOW_CHAT_STOREKEEPER,

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
    exact: true,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Settings,
  },

  {
    routePath: '/admin/settings/technical-works',
    component: AdminTechnicalView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey['Technical work and notices'],
  },

  {
    routePath: '/admin/feedback',
    component: AdminFeedbackView,
    exact: false,
    permission: [UserRole.ADMIN],
    crumbNameKey: TranslationKey.Feedback,
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
