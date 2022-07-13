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

export const getResearcherDashboardCardConfig = () => [
  {
    key: 'PRODUCTS',
    title: t(TranslationKey.Products),
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),
        color: '#006CFF',
        route: '/researcher/products',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: t(TranslationKey.Completed),
        color: '#00B746',
        route: '/researcher/products',
      },

      {
        dataKey: ResearcherDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey['Rejected by supervisor/buyer']),
        color: '#BC3030',
        route: '/researcher/products',
      },

      {
        dataKey: ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING,
        title: t(TranslationKey["At the supervisor's check"]),
        color: '#00B746',
        route: '/researcher/products',
      },

      {
        dataKey: ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER,
        title: t(TranslationKey["Buyer's search for a supplier"]),
        color: '#ffc107',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.NO_STATUS,
        title: t(TranslationKey['No status']),
        color: '#4dbd74',
        route: '/researcher/products',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),
        color: '#00B746',
        route: '/researcher/finances',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
        color: '#BC3030',
        route: '/researcher/finances',
      },
    ],
  },
]

export const FreelancerDashboardCardDataKey = {
  REPLENISH: 'REPLENISH',
  FINES: 'FINES',
}
export const getFreelancerDashboardCardConfig = () => [
  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),
        color: '#00B746',
        route: '/freelancer/finances',
      },
      {
        dataKey: ResearcherDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
        color: '#BC3030',
        route: '/freelancer/finances',
      },
    ],
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
export const getClientDashboardCardConfig = () => [
  {
    key: 'inventory',
    title: t(TranslationKey.Inventory),
    items: [
      {
        dataKey: ClientDashboardCardDataKey.IN_INVENTORY,
        title: t(TranslationKey['Goods in inventory']),
        color: '#20a8d8',
        route: '/client/inventory',
      },
      {
        dataKey: ClientDashboardCardDataKey.REPURCHASE_ITEMS,
        title: t(TranslationKey['Purchased product cards']),
        color: '#4dbd74',
        route: '/client/inventory',
      },
    ],
  },

  {
    key: 'order',
    title: t(TranslationKey.Orders),
    items: [
      {
        dataKey: ClientDashboardCardDataKey.ALL_ORDERS,
        title: t(TranslationKey['Made orders']),
        color: '#ffc107',
        route: '/client/orders',
      },
      {
        dataKey: ClientDashboardCardDataKey.PAID_ORDERS,
        title: t(TranslationKey['Paid orders']),
        color: '#00B746',
        route: '/client/orders',
      },
      {
        dataKey: ClientDashboardCardDataKey.CANCELED_ORDERS,
        title: t(TranslationKey['Canceled orders']),
        color: '#BC3030',
        route: '/client/orders',
      },
    ],
  },
  {
    key: 'boxes',
    title: t(TranslationKey.Warehouse),
    items: [
      {
        dataKey: ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE,
        title: t(TranslationKey['Boxes in store']),
        color: '#C69109',
        route: '/client/warehouse',
      },
      {
        dataKey: ClientDashboardCardDataKey.READY_TO_SEND,
        title: t(TranslationKey['Boxes ready to send']),
        color: '#C69109',
        route: '/client/boxes-ready-to-batch',
      },
      {
        dataKey: ClientDashboardCardDataKey.IS_BEING_COLLECTED,
        title: t(TranslationKey['Awaiting send']),
        color: '#ffc107',
        route: '/client/awaiting-batch',
      },

      {
        dataKey: ClientDashboardCardDataKey.SEND_BOXES,
        title: t(TranslationKey['Sent boxes']),
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
  REQUESTED_SEND_TO_BATCH: 'REQUESTED_SEND_TO_BATCH',

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

      {
        dataKey: WarehouseDashboardCardDataKey.REQUESTED_SEND_TO_BATCH,
        title: t(TranslationKey['Requested shipments']),
        color: '#C69109',
        route: '/warehouse/my-warehouse',
      },
    ],
  },

  {
    key: 'BATCHES',
    title: t(TranslationKey.Batches),
    items: [
      {
        dataKey: WarehouseDashboardCardDataKey.NOT_SENT_BATCHES,
        title: t(TranslationKey['Awaiting send']),
        color: '#C69109',
        route: '/warehouse/awaiting-batches',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.SENT_BATCHES,
        title: t(TranslationKey.Sent),
        color: '#00B746',
        route: '/warehouse/batches',
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

export const getAdminDashboardCardConfig = () => [
  {
    key: 'inventory',
    title: t(TranslationKey.Products),
    items: [
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK,
        title: t(TranslationKey['Waiting for checks']),
        color: '#20a8d8',
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED,
        title: t(TranslationKey['Taken for review by supervisors']),
        color: '#63c2de',
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_CHECKED,
        title: t(TranslationKey['Confirmed by supervisors']),
        color: '#4dbd74',
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_REJECTED,
        title: t(TranslationKey['Rejected by supervisors']),
        color: '#ffc107',
      },
    ],
  },

  {
    key: 'suppliers-seek-statuses',
    title: t(TranslationKey['Accruals and fines']),
    items: [
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_RESEARCHERS,
        title: t(TranslationKey['Accrued to managers']),
        color: '#4dbd74',
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_SUPERVISORS,
        title: t(TranslationKey['Accrued to supervisors']),
        color: '#20a8d8',
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_SUPERVISORS_FINES,
        title: t(TranslationKey['Fines for supervisors']),
        color: '#f86c6b',
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_RESEARCHERS_FINES,
        title: t(TranslationKey['Fines for managers']),
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

export const getBuyerDashboardCardConfig = () => [
  {
    key: 'PRODUCTS',
    title: t(TranslationKey.Products),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),
        color: '#006CFF',
        route: '/buyer/my-products',
      },
      {
        dataKey: BuyerDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: t(TranslationKey.Completed),
        color: '#00B746',
        route: '/buyer/my-products',
      },
      {
        dataKey: BuyerDashboardCardDataKey.PAYED_PRODUCTS,
        title: t(TranslationKey.Paid),
        color: '#00B746',
        route: '/buyer/my-products',
      },

      {
        dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR,
        title: t(TranslationKey['New search from the supervisor']),
        color: '#ffc107',
        route: '/buyer/search-supplier-by-supervisor',
      },
      {
        dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: t(TranslationKey['New search from the client']),
        color: '#4dbd74',
        route: '/buyer/search-supplier-by-client',
      },

      {
        dataKey: BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: t(TranslationKey['In the process of searching']),
        color: '#ffc107',
        route: '/buyer/my-products',
      },

      {
        dataKey: BuyerDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey.Rejected),
        color: '#BC3030',
        route: '/buyer/my-products',
      },
    ],
  },

  {
    key: 'ORDERS',
    title: t(TranslationKey.Orders),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.IN_PROCESS_ORDERS,
        title: t(TranslationKey['In the process of processing']),
        color: '#20a8d8',
        route: '/buyer/my-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.FREE_ORDERS,
        title: t(TranslationKey.Free),
        color: '#006CFF',
        route: '/buyer/free-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.CLOSED_ORDERS,
        title: t(TranslationKey.Completed),
        color: '#00B746',
        route: '/buyer/my-orders',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),
        color: '#00B746',
        route: '/buyer/finances',
      },
      {
        dataKey: BuyerDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
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

export const getSupervisorDashboardCardConfig = () => [
  {
    key: 'PRODUCTS',
    title: t(TranslationKey.Products),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),
        color: '#006CFF',
        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: t(TranslationKey['Published on the stock exchange']),
        color: '#FFC7C7',
        route: '/supervisor/products',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.PAYED_PRODUCTS,
        title: t(TranslationKey.Paid),
        color: '#00B746',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER,
        title: t(TranslationKey['To check from the resercher']),
        color: '#ffc107',
        route: '/supervisor/ready-to-check',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: t(TranslationKey['New search from the client']),
        color: '#4dbd74',
        route: '/supervisor/ready-to-check-by-client',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.ON_CHECKING,
        title: t(TranslationKey['On review']),
        color: '#FFC7C7',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.AWAIT_SOLVE,
        title: t(TranslationKey['Waiting to be checked']),
        color: '#ffc107',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: t(TranslationKey['In the work of a Bayer']),
        color: '#ffc107',
        route: '/supervisor/products',
      },

      {
        dataKey: SupervisorDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey.Rejected),
        color: '#BC3030',
        route: '/supervisor/products',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),
        color: '#00B746',
        route: '/supervisor/finances',
      },
      {
        dataKey: SupervisorDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
        color: '#BC3030',
        route: '/supervisor/finances',
      },
    ],
  },
]
