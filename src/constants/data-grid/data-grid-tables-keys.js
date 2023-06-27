export const DataGridTablesKeys = {
  ADMIN_USERS: 'adminUsersDataGridState',
  ADMIN_INVENTORY: 'adminInventoryDataGridState',
  ADMIN_ORDERS: 'adminOrdersDataGridState',
  ADMIN_TASKS: 'adminTasksDataGridState',
  ADMIN_BOXES: 'adminBoxesDataGridState',
  ADMIN_USER_FINANCES: 'adminUserFinancesDataGridState',
  // ADMIN_BATCHES: 'adminBatchesDataGridState',
  ADMIN_DESTINATIONS: 'adminDestinationsDataGridState',
  ADMIN_TAGS: 'adminTagsDataGridState',

  ADMIN_SINGLE_PERMISSIONS: 'adminSinglePermissionsDataGridState',
  ADMIN_GROUP_PERMISSIONS: 'adminGroupPermissionsDataGridState',

  ADMIN_EXCHANGE_CREATED: 'adminExchangeCreatedDataGridState',
  ADMIN_EXCHANGE_CHECKED_BY_SUPERVISOR: 'adminExchangeChekedBySupervisorDataGridState',
  ADMIN_EXCHANGE_SUPPLIER_SEARCHING: 'adminExchangeSupplierSearchingDataGridState',
  ADMIN_EXCHANGE_BUYER_WORK: 'adminExchangeBuyerWorkDataGridState',
  ADMIN_EXCHANGE_SUPPLIER_FOUNDED: 'adminExchangeSupplierFoundedDataGridState',
  ADMIN_EXCHANGE_SUPPLIER_NOT_FOUNDED: 'adminExchangeSupplierNotFoundedDataGridState',
  ADMIN_EXCHANGE_HIGH_PRICE: 'adminExchangeHighPriceDataGridState',
  ADMIN_EXCHANGE_PUBLISHED: 'adminExchangePublishedDataGridState',
  ADMIN_EXCHANGE_CANCELED: 'adminExchangeCanceledDataGridState',

  ADMIN_AWAITING_BATCHES: 'adminAwaitingBatchesDataGridState',
  ADMIN_BATCHES: 'adminBatchesDataGridState',
  ADMIN_FEEDBACK: 'adminFeedbackDataGridState',

  COMPLETE_SUPPLIER_WAS_NOT_FOUND: 'adminExchangeCompleteSupplierNotFoundedDataGridState',
  COMPLETE_PRICE_WAS_NOT_ACCEPTABLE: 'adminExchangeCompletePriceWasNotAcceptableDataGridState',

  WAREHOUSE_VACANT_TASKS: 'warehouseVacantTasksDataGridState',
  WAREHOUSE_MY_TASKS: 'warehouseMyTasksDataGridState',
  WAREHOUSE_COMPLETED_TASKS: 'warehouseCompletedTasksDataGridState',
  WAREHOUSE_CANCELED_TASKS: 'warehouseCanceledTasksDataGridState',
  WAREHOUSE_SUB_USERS: 'warehouseSubUsersDataGridState',

  WAREHOUSE_AWAITING_BATCHES: 'warehouseAwaitingBatchesDataGridState',
  WAREHOUSE_BATCHES: 'warehouseBatchesDataGridState',

  WAREHOUSE_LOGISTICS_TARIFFS: 'warehouseLogisticsTariffsDataGridState',
  WAREHOUSE_SELF_TARIFFS: 'warehouseSelfTariffsDataGridState',

  RESEARCHER_PRODUCTS: 'researcherProductsDataGridState',
  RESEARCHER_PRODUCT_VACANT_REQUESTS: 'researcherProductVacantRequestsDataGridState',
  RESEARCHER_NICHE_VACANT_REQUESTS: 'researcherNicheVacantRequestsDataGridState',
  RESEARCHER_CUSTOM_VACANT_REQUESTS: 'researcherCustomVacantRequestsDataGridState',
  RESEARCHER_PRODUCT_MY_REQUESTS: 'researcherProductMyRequestsDataGridState',
  RESEARCHER_NICHE_MY_REQUESTS: 'researcherNicheMyRequestsDataGridState',
  RESEARCHER_CUSTOM_MY_REQUESTS: 'researcherCustomMyRequestsDataGridState',
  RESEARCHER_SUB_USERS: 'researcherSubUsersDataGridState',

  SUPERVISOR_PRODUCTS: 'supervisorProductsDataGridState',
  SUPERVISOR_SUB_USERS: 'supervisorSubUsersDataGridState',
  SUPERVISOR_SETTINGS: 'supervisorSettingsDataGridState',

  BUYER_PRODUCTS: 'buyerProductsDataGridState',
  BUYER_MY_ORDERS_: 'buyerMyOrdersDataGridState',

  BUYER_MY_ORDERS_NOT_PAID: 'buyerMyOrdersNotPaidDataGridState',
  BUYER_MY_ORDERS_NEED_TRACK_NUMBER: 'buyerMyOrdersNeedTrackNumberDataGridState',
  BUYER_MY_ORDERS_INBOUND: 'buyerMyOrdersInboundDataGridState',
  BUYER_MY_ORDERS_CONFIRMATION_REQUIRED: 'buyerMyOrdersConfirmationRequiredDataGridState',
  BUYER_MY_ORDERS_CLOSED_AND_CANCELED: 'buyerMyOrdersClosedAndCanceledDataGridState',
  BUYER_MY_ORDERS_ALL_ORDERS: 'buyerMyOrdersAllDataGridState',

  BUYER_FREE_ORDERS: 'buyerFreeOrdersDataGridState',
  BUYER_SUB_USERS: 'buyerSubUsersDataGridState',
  BUYER_BATCHES: 'buyerBatchesDataGridState',

  CLIENT_EXCHANGE: 'clientExchangeCreatedDataGridState',
  CLIENT_INVENTORY: 'clientInventoryDataGridState',
  CLIENT_ORDERS: 'clientOrdersDataGridState',
  CLIENT_PENDING_ORDERS: 'clientPendingOrdersDataGridState',
  CLIENT_ORDERS_NOTIFICATIONS: 'clientOrdersNotificationsDataGridState',
  CLIENT_BOXES_NOTIFICATIONS: 'clientBoxesNotificationsDataGridState',
  CLIENT_IDEAS_NOTIFICATIONS: 'clientIdeasNotificationsDataGridState',
  CLIENT_FREELANCE_NOTIFICATIONS: 'clientFreelanceNotificationsDataGridState',

  CLIENT_WAREHOUSE: 'clientWarehouseDataGridState',
  CLIENT_WAREHOUSE_BOXES: 'clientWarehouseBoxesDataGridState',
  CLIENT_WAREHOUSE_TASKS: 'clientWarehouseTasksDataGridState',
  CLIENT_PRODUCT_SEARCH_REQUESTS: 'clientProductSearchRequestsDataGridState',
  CLIENT_NICHE_SEARCH_REQUESTS: 'clientNicheSearchRequestsDataGridState',

  CLIENT_SUB_USERS: 'clientSubUsersDataGridState',
  CLIENT_DAILY_SELLER_BOARD: 'clientDailySellerBoardDataGridState',
  CLIENT_LAST_30_DAY_SELLER_BOARD: 'clientLast30DaySellerBoardDataGridState',
  CLIENT_SHOPS: 'clientShopsDataGridState',

  CLIENT_BATCHES: 'clientBatchesDataGridState',
  CLIENT_AWAITING_BATCHES: 'clientAwaitingBatchesDataGridState',
  CLIENT_BOXES_READY_TO_BATCH: 'clientReadyToBatchDataGridState',

  FREELANCER_CUSTOM_MY_REQUESTS: 'freelancerCustomMyRequestsDataGridState',
  FREELANCER_CUSTOM_VACANT_REQUESTS: 'freelancerCustomVacantRequestsDataGridState',
  FREELANCER_CUSTOM_SEARCH_REQUESTS: 'freelancerCustomSearchRequestsDataGridState',
  FREELANCER_SUB_USERS: 'freelancerSubUsersDataGridState',

  OVERALL_CUSTOM_SEARCH_REQUESTS: 'overallCustomSearchRequestsDataGridState',
  OVERALL_SUB_USERS: 'overallSubUsersDataGridState',
  SHARED_FINANCES: 'overallSharedFinancesDataGridState',

  PROFILE_VAC_PRODUCTS: 'profileVacProductsDataGridState',

  PRODUCT_FREELANCE: 'productFreelanceDataGridState',

  SUB_WAREHOUSE_LOGISTICS_TARIFFS: 'subWarehouseLogisticsTariffsDataGridState',
}
