import {t} from '@utils/translations'

import {TranslationKey} from './translations/translation-key'

export const ResearcherDashboardCardDataKey = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  SUCCESS_PRODUCTS: 'SUCCESS_PRODUCTS',

  REJECTED_PRODUCTS: 'REJECTED_PRODUCTS',
  ON_SUPERVISOR_CHECKING: 'ON_SUPERVISOR_CHECKING',
  ON_SUPPLIER_SEEKING_BY_BUYER: 'ON_SUPPLIER_SEEKING_BY_BUYER',
  NO_STATUS: 'NO_STATUS',

  REPLENISH: 'REPLENISH',
  FINES: 'FINES',
}

export const getResearcherDashboardCardConfig = textConsts => [
  {
    key: 'PRODUCTS',
    title: textConsts.productsTitle,
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.ALL_PRODUCTS,
        title: textConsts.allProducts,
        color: '#006CFF',
        route: '/researcher/products',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: textConsts.successProduts,
        color: '#00B746',
        route: '/researcher/products',
      },

      {
        dataKey: ResearcherDashboardCardDataKey.REJECTED_PRODUCTS,
        title: textConsts.rejectedProduts,
        color: '#BC3030',
        route: '/researcher/products',
      },

      {
        dataKey: ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING,
        title: textConsts.onSupervisor,
        color: '#00B746',
        route: '/researcher/products',
      },

      {
        dataKey: ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER,
        title: textConsts.seekingByBuyer,
        color: '#ffc107',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.NO_STATUS,
        title: textConsts.noStatus,
        color: '#4dbd74',
        route: '/researcher/products',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: textConsts.financesTitle,
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.REPLENISH,
        title: textConsts.replenish,
        color: '#00B746',
        route: '/researcher/finances',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.FINES,
        title: textConsts.fines,
        color: '#BC3030',
        route: '/researcher/finances',
      },
    ],
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
  IS_BEING_COLLECTED: 'IS_BEING_COLLECTED',
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
        color: '#00B746',
        route: '/client/orders',
      },
      {
        dataKey: ClientDashboardCardDataKey.CANCELED_ORDERS,
        title: textConsts.canceledOrdersSectionItemTitle,
        color: '#BC3030',
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
        color: '#C69109',
        route: '/client/warehouse',
      },
      {
        dataKey: ClientDashboardCardDataKey.READY_TO_SEND,
        title: textConsts.readyToSend,
        color: '#C69109',
        route: '/client/boxes-ready-to-batch',
      },
      {
        dataKey: ClientDashboardCardDataKey.IS_BEING_COLLECTED,
        title: textConsts.awaitingBoxes,
        color: '#ffc107',
        route: '/client/awaiting-batch',
      },

      {
        dataKey: ClientDashboardCardDataKey.SEND_BOXES,
        title: textConsts.sendBoxes,
        color: '#00B746',
        route: '/client/batches',
      },
    ],
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

  CANCELED_TASKS: 'CANCELED_TASKS',
}
export const getWarehouseDashboardCardConfig = () => [
  {
    key: 'TASKS',
    title: t(TranslationKey.Tasks),
    items: [
      {
        dataKey: WarehouseDashboardCardDataKey.VACANT_TASKS,
        title: t(TranslationKey['Number of vacant tasks']),
        color: '#0056B2',
        route: '/warehouse/vacant-tasks',
      },
      {
        dataKey: WarehouseDashboardCardDataKey.TASKS_MY,
        title: t(TranslationKey['My tasks']),
        color: '#0056B2',
        route: '/warehouse/my-tasks',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.COMPLETED_TASKS,
        title: t(TranslationKey['Completed tasks']),
        color: '#4dbd74',
        route: '/warehouse/completed-tasks',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.CANCELED_TASKS,
        title: t(TranslationKey['Canceled tasks']),
        color: '#BC3030',
        route: '/warehouse/canceled-tasks',
      },
    ],
  },

  {
    key: 'WAREHOUSE',
    title: t(TranslationKey.Warehouse),
    items: [
      {
        dataKey: WarehouseDashboardCardDataKey.BOXES_IN_STORE,
        title: t(TranslationKey['Boxes in store']),
        color: '#63C2DE',
        route: '/warehouse/my-warehouse',
      },
    ],
  },

  {
    key: 'BATCHES',
    title: t(TranslationKey.Batches),
    items: [
      {
        dataKey: WarehouseDashboardCardDataKey.SENT_BATCHES,
        title: t(TranslationKey.Sent),
        color: '#C69109',
        route: '/warehouse/boxes',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.NOT_SENT_BATCHES,
        title: t(TranslationKey['Not sent']),
        color: '#00B746',
        route: '/warehouse/boxes',
      },
    ],
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
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  SUCCESS_PRODUCTS: 'SUCCESS_PRODUCTS',
  PAYED_PRODUCTS: 'PAYED_PRODUCTS',

  NEW_PRODUCTS_AT_SUPERVISOR: 'NEW_PRODUCTS_AT_SUPERVISOR',
  NEW_PRODUCTS_AT_CLIENT: 'NEW_PRODUCTS_AT_CLIENT',

  IN_SEARCH_PRODUCTS: 'IN_SEARCH_PRODUCTS',
  REJECTED_PRODUCTS: 'REJECTED_PRODUCTS',

  IN_PROCESS_ORDERS: 'IN_PROCESS_ORDERS',
  FREE_ORDERS: 'FREE_ORDERS',
  CLOSED_ORDERS: 'CLOSED_ORDERS',

  REPLENISH: 'REPLENISH',
  FINES: 'FINES',
}

export const getBuyerDashboardCardConfig = textConsts => [
  {
    key: 'PRODUCTS',
    title: textConsts.productsTitle,
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.ALL_PRODUCTS,
        title: textConsts.allProducts,
        color: '#006CFF',
        route: '/buyer/my-products',
      },
      {
        dataKey: BuyerDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: textConsts.successProduts,
        color: '#00B746',
        route: '/buyer/my-products',
      },
      {
        dataKey: BuyerDashboardCardDataKey.PAYED_PRODUCTS,
        title: textConsts.payedProducts,
        color: '#00B746',
        route: '/buyer/my-products',
      },

      {
        dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR,
        title: textConsts.produtsAtSupervisor,
        color: '#ffc107',
        route: '/buyer/search-supplier-by-supervisor',
      },
      {
        dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: textConsts.produtsAtClient,
        color: '#4dbd74',
        route: '/buyer/search-supplier-by-client',
      },

      {
        dataKey: BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: textConsts.inSearchProduts,
        color: '#ffc107',
        route: '/buyer/my-products',
      },

      {
        dataKey: BuyerDashboardCardDataKey.REJECTED_PRODUCTS,
        title: textConsts.rejectedProduts,
        color: '#BC3030',
        route: '/buyer/my-products',
      },
    ],
  },

  {
    key: 'ORDERS',
    title: textConsts.ordersTitle,
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.IN_PROCESS_ORDERS,
        title: textConsts.inProcessOrders,
        color: '#20a8d8',
        route: '/buyer/my-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.FREE_ORDERS,
        title: textConsts.freeOrders,
        color: '#006CFF',
        route: '/buyer/free-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.CLOSED_ORDERS,
        title: textConsts.rejectedOrders,
        color: '#00B746',
        route: '/buyer/my-orders',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: textConsts.financesTitle,
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.REPLENISH,
        title: textConsts.replenish,
        color: '#00B746',
        route: '/buyer/finances',
      },
      {
        dataKey: BuyerDashboardCardDataKey.FINES,
        title: textConsts.fines,
        color: '#BC3030',
        route: '/buyer/finances',
      },
    ],
  },
]

export const SupervisorDashboardCardDataKey = {
  ALL_PRODUCTS: 'ALL_PRODUCTS',
  SUCCESS_PRODUCTS: 'SUCCESS_PRODUCTS',
  PAYED_PRODUCTS: 'PAYED_PRODUCTS',

  NEW_PRODUCTS_AT_RESEARCHER: 'NEW_PRODUCTS_AT_RESEARCHER',
  NEW_PRODUCTS_AT_CLIENT: 'NEW_PRODUCTS_AT_CLIENT',
  AWAIT_SOLVE: 'AWAIT_SOLVE',

  ON_CHECKING: 'ON_CHECKING',

  IN_SEARCH_PRODUCTS: 'IN_SEARCH_PRODUCTS',
  REJECTED_PRODUCTS: 'REJECTED_PRODUCTS',

  REPLENISH: 'REPLENISH',
  FINES: 'FINES',
}

export const getSupervisorDashboardCardConfig = textConsts => [
  {
    key: 'PRODUCTS',
    title: textConsts.productsTitle,
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.ALL_PRODUCTS,
        title: textConsts.allProducts,
        color: '#006CFF',
        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: textConsts.successProduts,
        color: '#FFC7C7',
        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.PAYED_PRODUCTS,
        title: textConsts.payedProducts,
        color: '#00B746',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER,
        title: textConsts.produtsAtResearcher,
        color: '#ffc107',
        route: '/supervisor/ready-to-check',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: textConsts.produtsAtClient,
        color: '#4dbd74',
        route: '/supervisor/ready-to-check-by-client',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.ON_CHECKING,
        title: textConsts.onChecking,
        color: '#FFC7C7',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.AWAIT_SOLVE,
        title: textConsts.awaitingSolve,
        color: '#ffc107',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: textConsts.inSearchProduts,
        color: '#ffc107',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.REJECTED_PRODUCTS,
        title: textConsts.rejectedProduts,
        color: '#BC3030',
        route: '/supervisor/products',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: textConsts.financesTitle,
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.REPLENISH,
        title: textConsts.replenish,
        color: '#00B746',
        route: '/supervisor/finances',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.FINES,
        title: textConsts.fines,
        color: '#BC3030',
        route: '/supervisor/finances',
      },
    ],
  },
]
