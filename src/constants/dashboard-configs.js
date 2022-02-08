export const ResearcherDashboardCardDataKey = {
  PRODUCTS: 'PRODUCTS',
  CUR_BALANCE: 'CUR_BALANCE',
  FINES: 'FINES',
}
export const getResearcherDashboardCardConfig = textConsts => [
  {
    dataKey: ResearcherDashboardCardDataKey.PRODUCTS,
    title: textConsts.myProductsCardTitle,
    color: '#63c2de',
    route: '/researcher/products',
  },
  {
    dataKey: ResearcherDashboardCardDataKey.CUR_BALANCE,
    title: textConsts.curBalanceCardTitle,
    color: '#4dbd74',
  },
  {
    dataKey: ResearcherDashboardCardDataKey.FINES,
    title: textConsts.finesCardTitle,
    color: '#f86c6b',
  },
]

export const FreelancerDashboardCardDataKey = {
  REQUESTS: 'REQUESTS',
  CUR_BALANCE: 'CUR_BALANCE',
  FINES: 'FINES',
}
export const getFreelancerDashboardCardConfig = textConsts => [
  {
    dataKey: FreelancerDashboardCardDataKey.REQUESTS,
    title: textConsts.myRequestsCardTitle,
    color: '#63c2de',
    route: '/freelancer/exchange/requests/custom',
  },
  {
    dataKey: FreelancerDashboardCardDataKey.CUR_BALANCE,
    title: textConsts.curBalanceCardTitle,
    color: '#4dbd74',
  },
  {
    dataKey: FreelancerDashboardCardDataKey.FINES,
    title: textConsts.finesCardTitle,
    color: '#f86c6b',
  },
]

export const SupervisorDashboardCardDataKey = {
  NEW_PRODUCTS: 'NEW_PRODUCTS',
  ME_CHECKING: 'ME_CHECKING',

  SUPLIER_FOUNDED: 'SUPLIER_FOUNDED',
  COMPLETE_SUCCESS: 'COMPLETE_SUCCESS',
  PURCHASED: 'PURCHASED',

  ACCURED: 'ACCURED',
  FINES: 'FINES',
}
export const getSupervisorDashboardCardConfig = textConsts => [
  {
    dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS,
    title: textConsts.newProductsCardTitle,
    color: '#63c2de',
    route: '/supervisor/ready-to-check',
  },
  {
    dataKey: SupervisorDashboardCardDataKey.ME_CHECKING,
    title: textConsts.meCheckingCardTitle,
    color: '#FFC107',
    route: '/supervisor/products',
  },

  {
    dataKey: SupervisorDashboardCardDataKey.SUPLIER_FOUNDED,
    title: textConsts.suplierFoundedCardTitle,
    color: '#4d23c2',
  },
  {
    dataKey: SupervisorDashboardCardDataKey.COMPLETE_SUCCESS,
    title: textConsts.completeSuccessCardTitle,
    color: '#236dc2',
  },
  {
    dataKey: SupervisorDashboardCardDataKey.PURCHASED,
    title: textConsts.purchasedCardTitle,
    color: '#5fc2b0',
  },

  {
    dataKey: SupervisorDashboardCardDataKey.ACCURED,
    title: textConsts.accuredCardTitle,
    color: '#4dbd74',
  },
  {
    dataKey: SupervisorDashboardCardDataKey.FINES,
    title: textConsts.finesCardTitle,
    color: '#f86c6b',
  },
]

export const ClientDashboardCardDataKey = {
  IN_INVENTORY: 'IN_INVENTORY',
  FULL_COST: 'FULL_COST',
  REPURCHASE_ITEMS: 'REPURCHASE_ITEMS',
  NOT_PAID_ORDERS: 'NOT_PAID_ORDERS',
  PAID_ORDERS: 'PAID_ORDERS',
  CANCELED_ORDERS: 'CANCELED_ORDERS',
  SOLD_ITEMS_ON_EXCHANGE: 'SOLD_ITEMS_ON_EXCHANGE',
  ACCURED_TO_RESERCHERS: 'ACCURED_TO_RESERCHERS',
  DISPUTS_FOR_PRODUCTS: 'DISPUTS_FOR_PRODUCTS',

  IN_INVENTORY_BY_CLIENT: 'IN_INVENTORY_BY_CLIENT',
  ALL_ORDERS: 'ALL_ORDERS',
  BOXES_IN_WAREHOUSE: 'BOXES_IN_WAREHOUSE',
  READY_TO_SEND: 'READY_TO_SEND',
  SEND_BOXES: 'SEND_BOXES',
}
export const getClientDashboardCardConfig = textConsts => [
  {
    key: 'inventory',
    title: textConsts.inventoryTitle,
    items: [
      {
        dataKey: ClientDashboardCardDataKey.IN_INVENTORY,
        title: textConsts.itemsInInventorySectionItemTitle,
        color: '#20a8d8',
        route: '/client/inventory',
      },
      {
        dataKey: ClientDashboardCardDataKey.IN_INVENTORY_BY_CLIENT,
        title: textConsts.productsByClient,
        color: '#63c2de',
        route: '/client/inventory',
      },
      {
        dataKey: ClientDashboardCardDataKey.REPURCHASE_ITEMS,
        title: textConsts.productPaid,
        color: '#4dbd74',
        route: '/client/inventory',
      },
    ],
  },

  {
    key: 'order',
    title: textConsts.ordersTitle,
    items: [
      {
        dataKey: ClientDashboardCardDataKey.ALL_ORDERS,
        title: textConsts.allOrders,
        color: '#ffc107',
        route: '/client/orders',
      },
      {
        dataKey: ClientDashboardCardDataKey.PAID_ORDERS,
        title: textConsts.paidOrdersSectionItemTitle,
        color: '#f86c6b',
        route: '/client/orders',
      },
      {
        dataKey: ClientDashboardCardDataKey.CANCELED_ORDERS,
        title: textConsts.canceledOrdersSectionItemTitle,
        color: '#20a8d8',
        route: '/client/orders',
      },
    ],
  },
  {
    key: 'boxes',
    title: textConsts.boxesTitle,
    items: [
      {
        dataKey: ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE,
        title: textConsts.boxesInWarehouse,
        color: '#63c2de',
        route: '/client/warehouse',
      },
      {
        dataKey: ClientDashboardCardDataKey.READY_TO_SEND,
        title: textConsts.readyToSend,
        color: '#4dbd74',
      },
      {
        dataKey: ClientDashboardCardDataKey.SEND_BOXES,
        title: textConsts.sendBoxes,
        color: '#f86c6b',
      },
    ],
  },
]

export const ClientInventoryDashboardCardDataKey = {
  PRODUCTS_IN_INVENTORY: 'PRODUCTS_IN_INVENTORY',
  PRODUCTS_BOUGHT_ON_EXCHANGE: 'PRODUCTS_BOUGHT_ON_EXCHANGE',
  PRODUCTS_ADDED: 'PRODUCTS_ADDED',
  ORDERS_CHECKOUT: 'ORDERS_CHECKOUT',
  BOUGHT_FOR_LAST_30_DAYS: 'BOUGHT_FOR_LAST_30_DAYS',
}

export const getClientInventoryDashboardCardConfig = textConsts => [
  {
    dataKey: ClientInventoryDashboardCardDataKey.PRODUCTS_IN_INVENTORY,
    title: textConsts.productsInInventoryDashboardCard,
    color: '#63c2de',
  },
  {
    dataKey: ClientInventoryDashboardCardDataKey.PRODUCTS_BOUGHT_ON_EXCHANGE,
    title: textConsts.productsBoughtOnExchangeDashboardCard,
    color: '#FFC107',
  },
  {
    dataKey: ClientInventoryDashboardCardDataKey.PRODUCTS_ADDED,
    title: textConsts.productsAddedDashboardCard,
    color: '#4dbd74',
  },
  {
    dataKey: ClientInventoryDashboardCardDataKey.ORDERS_CHECKOUT,
    title: textConsts.ordersChackoutDashboardCard,
    color: '#f86c6b',
  },
  {
    dataKey: ClientInventoryDashboardCardDataKey.BOUGHT_FOR_LAST_30_DAYS,
    title: textConsts.productsBoughtLast30DaysDashboardCard,
    color: '#f86c6b',
  },
]

export const WarehouseDashboardCardDataKey = {
  VACANT_TASKS: 'VACANT_TASKS',
  COMPLETED_TASKS: 'COMPLETED_TASKS',
  MY_STATS: 'MY_STATS',
  MY_PAYMENTS: 'MY_PAYMENTS',
  BOXES_IN_STORE: 'BOXES_IN_STORE',
  SENT_BATCHES: 'SENT_BATCHES',
  NOT_SENT_BATCHES: 'NOT_SENT_BATCHES',
  TASKS_MY: 'TASKS_MY',
}
export const getWarehouseDashboardCardConfig = textConsts => [
  {
    dataKey: WarehouseDashboardCardDataKey.VACANT_TASKS,
    title: textConsts.vacantTasksCardTitle,
    color: '#63c2de',
    route: '/warehouse/vacant-tasks',
  },
  {
    dataKey: WarehouseDashboardCardDataKey.TASKS_MY,
    title: textConsts.tasksMyCardTitle,
    color: '#FFC107',
    route: '/warehouse/my-tasks',
  },

  {
    dataKey: WarehouseDashboardCardDataKey.COMPLETED_TASKS,
    title: textConsts.comletedTasksCardTitle,
    color: '#4dbd74',
    route: '/warehouse/completed-tasks',
  },

  {
    dataKey: WarehouseDashboardCardDataKey.BOXES_IN_STORE,
    title: textConsts.boxesInStore,
    color: '#f86c6b',
  },

  {
    dataKey: WarehouseDashboardCardDataKey.SENT_BATCHES,
    title: textConsts.sentBatches,
    color: '#20a8d8',
  },

  {
    dataKey: WarehouseDashboardCardDataKey.NOT_SENT_BATCHES,
    title: textConsts.notSentBatches,
    color: '#20a8d8',
  },
]

export const AdminDashboardCardDataKey = {
  EXCHANGE_WAITING_TO_CHECK: 'EXCHANGE_WAITING_TO_CHECK',
  EXCHANGE_BEING_CHECKED: 'EXCHANGE_BEING_CHECKED',
  EXCHANGE_CHECKED: 'EXCHANGE_CHECKED',
  EXCHANGE_REJECTED: 'EXCHANGE_REJECTED',
  FINANCES_ACCRUED_TO_RESEARCHERS: 'FINANCES_ACCRUED_TO_RESEARCHERS',
  FINANCES_ACCRUED_TO_SUPERVISORS: 'FINANCES_ACCRUED_TO_SUPERVISORS',
  FINANCES_SUPERVISORS_FINES: 'FINANCES_SUPERVISORS_FINES',
  FINANCES_RESEARCHERS_FINES: 'FINANCES_RESEARCHERS_FINES',
}

export const getAdminDashboardCardConfig = textConsts => [
  {
    key: 'inventory',
    title: textConsts.productsTitle,
    items: [
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK,
        title: textConsts.prodcutsWaitingToCheckBySupervisorsTitle,
        color: '#20a8d8',
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED,
        title: textConsts.productsBeingCheckedBySupervisorsTitle,
        color: '#63c2de',
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_CHECKED,
        title: textConsts.productsCheckedBySupervisorsTitle,
        color: '#4dbd74',
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_REJECTED,
        title: textConsts.productsRejectedBySupervisorsTitle,
        color: '#ffc107',
      },
    ],
  },

  {
    key: 'suppliers-seek-statuses',
    title: textConsts.accrualsAndFinesTitle,
    items: [
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_RESEARCHERS,
        title: textConsts.accruedToManagersTitle,
        color: '#4dbd74',
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_SUPERVISORS,
        title: textConsts.accruedToSupervisorsTitle,
        color: '#20a8d8',
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_SUPERVISORS_FINES,
        title: textConsts.supervisorsFinesTitle,
        color: '#f86c6b',
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_RESEARCHERS_FINES,
        title: textConsts.managersFinesTitle,
        color: '#f86c6b',
      },
    ],
  },
]

export const BuyerDashboardCardDataKey = {
  NEW_PRODUCTS_AT_SUPERVISOR: 'NEW_PRODUCTS_AT_SUPERVISOR',
  NEW_PRODUCTS_AT_CLIENT: 'NEW_PRODUCTS_AT_CLIENT',
  ME_PRODUCTS: 'ME_PRODUCTS',
  ME_ORDERS: 'ME_ORDERS',
  FREE_ORDERS: 'FREE_ORDERS',
}

export const getBuyerDashboardCardConfig = textConsts => [
  {
    dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR,
    title: textConsts.newProductsSupervisor,
    color: '#63c2de',
    route: '/buyer/search-supplier-by-supervisor',
  },

  {
    dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
    title: textConsts.newProductsClient,
    color: '#64h9de',
    route: '/buyer/search-supplier-by-client',
  },
  {
    dataKey: BuyerDashboardCardDataKey.ME_PRODUCTS,
    title: textConsts.myProductCardTitle,
    color: '#FFC107',
    route: '/buyer/my-products',
  },
  {
    dataKey: BuyerDashboardCardDataKey.ME_ORDERS,
    title: textConsts.myOrdersCardTitle,
    color: '#4dbd74',
    route: '/buyer/my-orders',
  },
  {
    dataKey: BuyerDashboardCardDataKey.FREE_ORDERS,
    title: textConsts.freeOrdersCardTitle,
    color: '#f86c6b',
    route: '/buyer/free-orders',
  },
]
