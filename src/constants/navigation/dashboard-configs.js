import { t } from '@utils/translations'

import { TranslationKey } from '../translations/translation-key'

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
    subTitle: t(TranslationKey['Your product list data']),
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),
        color: '#006CFF',
        route: '/researcher/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [],
            },
          ],
        },
      },
      // {
      //   dataKey: ResearcherDashboardCardDataKey.SUCCESS_PRODUCTS,
      //   title: t(TranslationKey.Completed),
      //   color: '#00B746',
      //   route: '/researcher/products',
      //   dataGridFilter: {
      //     items: [
      //       {
      //         columnField: 'status',
      //         operatorValue: 'isAnyOf',
      //         value: [TranslationKey['Search complete']],
      //       },
      //     ],
      //   },
      // },

      {
        dataKey: ResearcherDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey['Rejected by supervisor/buyer']),
        isNegative: true,
        route: '/researcher/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Rejected by Supervisor'], TranslationKey['Supplier price does not fit']],
            },
          ],
        },
      },

      {
        dataKey: ResearcherDashboardCardDataKey.ON_SUPERVISOR_CHECKING,
        title: t(TranslationKey["At the supervisor's check"]),

        route: '/researcher/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [
                TranslationKey['Product on check with Supervisor'],
                TranslationKey['Product checked by Supervisor'],
              ],
            },
          ],
        },
      },

      // {
      //   dataKey: ResearcherDashboardCardDataKey.ON_SUPPLIER_SEEKING_BY_BUYER,
      //   title: t(TranslationKey["Buyer's search for a supplier"]),

      //   route: '/researcher/products',
      //   dataGridFilter: {
      //     items: [
      //       {
      //         columnField: 'status',
      //         operatorValue: 'isAnyOf',
      //         value: [
      //           TranslationKey['Buyer found a supplier'],
      //           TranslationKey['Is in search of a Buyer'],
      //           TranslationKey['Product at the Buyer in work'],
      //         ],
      //       },
      //     ],
      //   },
      // },
      // {
      //   dataKey: ResearcherDashboardCardDataKey.NO_STATUS,
      //   title: t(TranslationKey['No status']),

      //   route: '/researcher/products',
      //   dataGridFilter: {
      //     items: [{columnField: 'status', operatorValue: 'isAnyOf', value: [TranslationKey['New product']]}],
      //   },
      // },
    ],
  },

  // {
  //   key: 'FINANCES',
  //   title: t(TranslationKey.Finances),
  //   subTitle: t(TranslationKey['Accrual data']),
  //   items: [
  //     {
  //       dataKey: ResearcherDashboardCardDataKey.REPLENISH,
  //       title: t(TranslationKey.Accruals),

  //       route: '/researcher/finances',
  //       dataGridFilter: {
  //         items: [
  //           {
  //             columnField: 'sum',
  //             operatorValue: '>=',
  //             value: '0',
  //           },
  //         ],
  //       },
  //     },
  //     {
  //       dataKey: ResearcherDashboardCardDataKey.FINES,
  //       title: t(TranslationKey.Fines),
  //       isNegative: true,
  //       route: '/researcher/finances',
  //       dataGridFilter: {
  //         items: [
  //           {
  //             columnField: 'sum',
  //             operatorValue: '<',
  //             value: '0',
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // },
]

export const FreelancerDashboardCardDataKey = {
  REPLENISH: 'REPLENISH',
  FINES: 'FINES',
}
export const getFreelancerDashboardCardConfig = () => [
  {
    key: 'FINANCES',
    subTitle: t(TranslationKey['Accrual data']),
    title: t(TranslationKey.Finances),
    items: [
      {
        dataKey: ResearcherDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),
        color: '#00B746',
        route: '/freelancer/finances',
        dataGridFilter: {
          items: [
            {
              columnField: 'sum',
              operatorValue: '>=',
              value: '0',
            },
          ],
        },
      },
      {
        dataKey: ResearcherDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
        isNegative: true,
        route: '/freelancer/finances',
        dataGridFilter: {
          items: [
            {
              columnField: 'sum',
              operatorValue: '<',
              value: '0',
            },
          ],
        },
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
  PUBLISHED_STORES: 'PUBLISHED_STORES',
  MODERATING: 'MODERATING',
  BOOKED: 'BOOKED',
  ALL_REQUESTS: 'ALL_REQUESTS',
  REQUESTS_IN_WORK: 'REQUESTS_IN_WORK',
  REQUESTS_WITHOUT_PROPOSAL: 'REQUESTS_WITHOUT_PROPOSAL',
}

export const getClientDashboardCardConfig = () => ({
  inventory: {
    key: 'inventory',
    title: t(TranslationKey.Inventory),
    subTitle: t(TranslationKey['Your product list data']),
    route: '/client/inventory',
    items: [
      {
        dataKey: ClientDashboardCardDataKey.IN_INVENTORY,
        title: t(TranslationKey['Goods in inventory']),
        route: '/client/inventory',
      },
      {
        dataKey: ClientDashboardCardDataKey.REPURCHASE_ITEMS,
        title: t(TranslationKey['Purchased product cards']),
        route: '/client/inventory',
      },
    ],
  },
  orders: {
    key: 'order',
    title: t(TranslationKey.Orders),
    items: [
      {
        dataKey: ClientDashboardCardDataKey.ALL_ORDERS,
        title: t(TranslationKey['Made orders']),
        color: '#ffc107',
        route: '/client/my-orders/orders',
        dataGridFilter: {
          items: [],
        },
      },
      {
        dataKey: ClientDashboardCardDataKey.PAID_ORDERS,
        title: t(TranslationKey['Paid orders']),
        color: '#00B746',
        route: '/client/my-orders/orders',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [
                TranslationKey['Paid to supplier'],
                TranslationKey['Track number issued'],
                TranslationKey['In stock'],
              ],
            },
          ],
        },
      },

      {
        dataKey: ClientDashboardCardDataKey.CANCELED_ORDERS,
        title: t(TranslationKey['Canceled orders']),
        color: '#BC3030',
        route: '/client/my-orders/orders',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Canceled by Buyer'], TranslationKey['Canceled by Client']],
            },
          ],
        },
      },
    ],
  },
  boxes: {
    key: 'boxes',
    title: t(TranslationKey.Warehouse),
    items: [
      {
        dataKey: ClientDashboardCardDataKey.BOXES_IN_WAREHOUSE,
        title: t(TranslationKey['Boxes in store']),
        icon: '/assets/icons/warehouse.svg',
        route: '/client/warehouse/in-stock',
      },
      {
        dataKey: ClientDashboardCardDataKey.READY_TO_SEND,
        title: t(TranslationKey['Boxes ready to send']),
        icon: '/assets/icons/party.svg',
        subIcon: '/assets/icons/check.svg',
        color: '#C69109',
        route: '/client/warehouse/boxes-ready-to-batch',
      },
      {
        dataKey: ClientDashboardCardDataKey.IS_BEING_COLLECTED,
        title: t(TranslationKey['Awaiting send']),
        icon: '/assets/icons/party.svg',
        subIcon: '/assets/icons/clock.svg',
        color: '#ffc107',
        route: '/client/batches/awaiting-batch',
      },

      {
        dataKey: ClientDashboardCardDataKey.SEND_BOXES,
        title: t(TranslationKey['Sent boxes']),
        icon: '/assets/icons/party.svg',
        subIcon: '/assets/icons/ship.svg',
        color: '#00B746',
        route: '/client/batches/sent-batches',
      },
    ],
  },
  stores: {
    key: 'store',
    title: t(TranslationKey['Trading stores']),
    route: '/client/trading-shops/sell-shops/create-trading-traiding-shop',
    items: [
      {
        dataKey: ClientDashboardCardDataKey.PUBLISHED_STORES,
        title: t(TranslationKey['Published stores']),
      },
      {
        dataKey: ClientDashboardCardDataKey.MODERATING,
        title: t(TranslationKey['In moderation']),
      },
      {
        dataKey: ClientDashboardCardDataKey.BOOKED,
        title: t(TranslationKey['In the reservation']),
      },
    ],
  },
  freelance: {
    key: 'freelance',
    title: t(TranslationKey.Freelance),
    route: '/client/freelance/my-requests/create-request',
    items: [
      {
        dataKey: ClientDashboardCardDataKey.ALL_REQUESTS,
        title: t(TranslationKey['Total requests']),
        color: '#ffc107',
      },
      {
        dataKey: ClientDashboardCardDataKey.REQUESTS_IN_WORK,
        title: t(TranslationKey['Requests in the works']),
        color: '#00B746',
      },
      {
        dataKey: ClientDashboardCardDataKey.REQUESTS_WITHOUT_PROPOSAL,
        title: t(TranslationKey['Requests without proposals']),
        color: '#BC3030',
      },
    ],
  },
})

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
    subTitle: t(TranslationKey['Your task data']),
    items: [
      {
        dataKey: WarehouseDashboardCardDataKey.VACANT_TASKS,
        title: t(TranslationKey['Number of vacant tasks']),
        color: '#0056B2',
        route: '/warehouse/tasks/vacant-tasks',
      },
      {
        dataKey: WarehouseDashboardCardDataKey.TASKS_MY,
        title: t(TranslationKey['My tasks']),
        color: '#0056B2',
        route: '/warehouse/tasks/my-tasks',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.COMPLETED_TASKS,
        title: t(TranslationKey['Completed tasks']),
        color: '#4dbd74',
        route: '/warehouse/tasks/completed-tasks',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.CANCELED_TASKS,
        title: t(TranslationKey['Canceled tasks']),
        isNegative: true,
        route: '/warehouse/tasks/canceled-tasks',
      },
    ],
  },

  {
    key: 'WAREHOUSE',
    title: t(TranslationKey.Warehouse),
    subTitle: t(TranslationKey['Your warehouse data']),
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
    subTitle: t(TranslationKey['Batch data']),
    items: [
      {
        dataKey: WarehouseDashboardCardDataKey.NOT_SENT_BATCHES,
        title: t(TranslationKey['Awaiting send']),
        color: '#C69109',
        route: '/warehouse/batches/awaiting-batches',
      },

      {
        dataKey: WarehouseDashboardCardDataKey.SENT_BATCHES,
        title: t(TranslationKey.Sent),
        color: '#00B746',
        route: '/warehouse/batches/sent-batches',
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
    subTitle: t(TranslationKey['Your product list data']),
    items: [
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_WAITING_TO_CHECK,
        title: t(TranslationKey['Waiting for checks']),
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_BEING_CHECKED,
        title: t(TranslationKey['Taken for review by supervisors']),
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_CHECKED,
        title: t(TranslationKey['Confirmed by supervisors']),
      },
      {
        dataKey: AdminDashboardCardDataKey.EXCHANGE_REJECTED,
        title: t(TranslationKey['Rejected by supervisors']),
        isNegative: true,
      },
    ],
  },

  {
    key: 'suppliers-seek-statuses',
    title: t(TranslationKey.Finances),
    subTitle: t(TranslationKey['Accrual data']),
    items: [
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_RESEARCHERS,
        title: t(TranslationKey['Accrued to managers']),
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_ACCRUED_TO_SUPERVISORS,
        title: t(TranslationKey['Accrued to supervisors']),
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_SUPERVISORS_FINES,
        title: t(TranslationKey['Fines for supervisors']),
        isNegative: true,
      },
      {
        dataKey: AdminDashboardCardDataKey.FINANCES_RESEARCHERS_FINES,
        title: t(TranslationKey['Fines for managers']),
        isNegative: true,
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

  MY_ORDERS_NOT_PAID: 'MY_ORDERS_NOT_PAID',
  MY_ORDERS_NEED_TRACK_NUMBER: 'MY_ORDERS_NEED_TRACK_NUMBER',
  MY_ORDERS_INBOUND: 'MY_ORDERS_INBOUND',
  MY_ORDERS_CONFIRMATION_REQUIRED: 'MY_ORDERS_CONFIRMATION_REQUIRED',
  MY_ORDERS_CLOSED_AND_CANCELED: 'MY_ORDERS_CLOSED_AND_CANCELED',
  FREE_ORDERS: 'FREE_ORDERS',
  MY_ORDERS_ALL_ORDERS: 'MY_ORDERS_ALL_ORDERS',

  PENDING_ORDERS_PEDING: 'PENDING_ORDERS_PEDING',
  PENDING_ORDERS_READY_TO_BUY: 'PENDING_ORDERS_READY_TO_BUY',

  FINANCES_ACCRUALS: 'ACCRUALS',
  FINANCES_FINES: 'FINES',
  FINANCES_REFUNDS: 'REFUNDS',
}

export const getBuyerDashboardCardConfig = () => [
  {
    key: 'PRODUCTS',
    title: t(TranslationKey.Products),
    subTitle: t(TranslationKey['Your product list data']),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),

        route: '/buyer/my-products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [],
            },
          ],
        },
      },
      {
        dataKey: BuyerDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: t(TranslationKey.Completed),

        route: '/buyer/my-products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Search complete']],
            },
          ],
        },
      },
      {
        dataKey: BuyerDashboardCardDataKey.PAYED_PRODUCTS,
        title: t(TranslationKey.Paid),

        route: '/buyer/my-products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Product purchased'], TranslationKey['Paid by the Client']],
            },
          ],
        },
      },

      {
        dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_SUPERVISOR,
        title: t(TranslationKey['New search from the supervisor']),

        route: '/buyer/search-supplier-by-supervisor',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Is in search of a Buyer']],
            },
          ],
        },
      },
      {
        dataKey: BuyerDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: t(TranslationKey['New search from the client']),

        route: '/buyer/search-supplier-by-client',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Is in search of a Buyer']],
            },
          ],
        },
      },

      {
        dataKey: BuyerDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: t(TranslationKey['In the process of searching']),

        route: '/buyer/my-products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Is in search of a Buyer'], TranslationKey['Product at the Buyer in work']],
            },
          ],
        },
      },

      {
        dataKey: BuyerDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey.Rejected),
        isNegative: true,
        route: '/buyer/my-products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [
                TranslationKey['Supplier was not found'],
                TranslationKey['Supplier price does not fit'],
                TranslationKey['Not published'],
              ],
            },
          ],
        },
      },
    ],
  },

  {
    key: 'ORDERS',
    title: t(TranslationKey.Orders),
    subTitle: t(TranslationKey['Your order data']),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.MY_ORDERS_NOT_PAID,
        title: t(TranslationKey['Not paid']),
        color: '#006CFF',
        route: '/buyer/not-paid-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.MY_ORDERS_NEED_TRACK_NUMBER,
        title: t(TranslationKey['Need track number']),
        color: '#006CFF',
        route: '/buyer/need-track-number-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.MY_ORDERS_INBOUND,
        title: t(TranslationKey.Inbound),
        color: '#006CFF',
        route: '/buyer/inbound-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.MY_ORDERS_CONFIRMATION_REQUIRED,
        title: t(TranslationKey['Confirmation required']),
        color: '#006CFF',
        route: '/buyer/confirmation-required-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.MY_ORDERS_CLOSED_AND_CANCELED,
        title: t(TranslationKey['Closed and canceled']),
        color: '#006CFF',
        route: '/buyer/closed-and-canceled-orders',
      },
      {
        dataKey: BuyerDashboardCardDataKey.MY_ORDERS_ALL_ORDERS,
        title: t(TranslationKey['All orders']),
        color: '#006CFF',
        route: '/buyer/all-orders',
      },
    ],
  },

  {
    key: 'PENDING ORDERS',
    title: t(TranslationKey['Pending orders']),
    subTitle: t(TranslationKey['Pending orders data']),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.PENDING_ORDERS_PEDING,
        title: t(TranslationKey.Pending),
        route: '/buyer/pending-orders',
        color: '#006CFF',
      },
      {
        dataKey: BuyerDashboardCardDataKey.PENDING_ORDERS_READY_TO_BUY,
        title: t(TranslationKey['Ready to buy']),
        route: '/buyer/pending-orders',
        color: '#006CFF',
      },
    ],
  },

  {
    key: 'FREE ORDERS',
    title: t(TranslationKey['Free Orders']),
    subTitle: t(TranslationKey['Free orders data']),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.FREE_ORDERS,
        title: t(TranslationKey['Free Orders']),
        route: '/buyer/free-orders',
        color: '#006CFF',
      },
    ],
  },

  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    subTitle: t(TranslationKey['Accrual data']),
    items: [
      {
        dataKey: BuyerDashboardCardDataKey.FINANCES_ACCRUALS,
        title: t(TranslationKey.Accruals),

        route: '/buyer/finances',
        dataGridFilter: {
          items: [
            {
              columnField: 'sum',
              operatorValue: '>=',
              value: '0',
            },
          ],
        },
      },
      {
        dataKey: BuyerDashboardCardDataKey.FINANCES_FINES,
        title: t(TranslationKey.Fines),
        isNegative: true,
        route: '/buyer/finances',
        dataGridFilter: {
          items: [
            {
              columnField: 'sum',
              operatorValue: '<',
              value: '0',
            },
          ],
        },
      },
      {
        dataKey: BuyerDashboardCardDataKey.FINANCES_REFUNDS,
        title: t(TranslationKey['Order returns']),
        isNegative: true,
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
    subTitle: t(TranslationKey['Your product list data']),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.ALL_PRODUCTS,
        title: t(TranslationKey['Total products']),

        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [],
            },
          ],
        },
      },
      {
        dataKey: SupervisorDashboardCardDataKey.SUCCESS_PRODUCTS,
        title: t(TranslationKey['Published on the stock exchange']),

        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Search complete']],
            },
          ],
        },
      },
      {
        dataKey: SupervisorDashboardCardDataKey.PAYED_PRODUCTS,
        title: t(TranslationKey.Paid),

        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Product purchased'], TranslationKey['Paid by the Client']],
            },
          ],
        },
      },

      {
        dataKey: SupervisorDashboardCardDataKey.REJECTED_PRODUCTS,
        title: t(TranslationKey.Rejected),
        isNegative: true,
        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [
                TranslationKey['Supplier was not found'],
                TranslationKey['Supplier was not found (сhecked)'],
                TranslationKey['Supplier price does not fit'],
                TranslationKey['Supplier price does not fit (сhecked)'],
                TranslationKey['Not published'],
              ],
            },
          ],
        },
      },
    ],
  },

  {
    key: 'CHECK',
    title: t(TranslationKey.Checking),
    subTitle: t(TranslationKey['Data on product checks']),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_RESEARCHER,
        title: t(TranslationKey['To check from the resercher']),

        route: '/supervisor/ready-to-check',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Product on check with Supervisor']],
            },
          ],
        },
      },
      {
        dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS_AT_CLIENT,
        title: t(TranslationKey['New search from the client']),

        route: '/supervisor/ready-to-check-by-client',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Product on check with Supervisor']],
            },
          ],
        },
      },
      {
        dataKey: SupervisorDashboardCardDataKey.ON_CHECKING,
        title: t(TranslationKey['On review']),

        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [
                TranslationKey['Buyer found a supplier'],
                TranslationKey['Product checked by Supervisor'],
                TranslationKey['Buyer found a supplier'],
              ],
            },
          ],
        },
      },
      {
        dataKey: SupervisorDashboardCardDataKey.AWAIT_SOLVE,
        title: t(TranslationKey['Waiting to be checked']),

        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [
                TranslationKey['Product on check with Supervisor'],
                TranslationKey['Researcher found supplier'],
                TranslationKey['Buyer found a supplier'],
                TranslationKey['Supplier was not found'],
                TranslationKey['Supplier price does not fit'],
              ],
            },
          ],
        },
      },

      {
        dataKey: SupervisorDashboardCardDataKey.IN_SEARCH_PRODUCTS,
        title: t(TranslationKey['In the work of a Buyer']),

        route: '/supervisor/products',
        dataGridFilter: {
          items: [
            {
              columnField: 'status',
              operatorValue: 'isAnyOf',
              value: [TranslationKey['Is in search of a Buyer'], TranslationKey['Product at the Buyer in work']],
            },
          ],
        },
      },
    ],
  },

  {
    key: 'FINANCES',
    title: t(TranslationKey.Finances),
    subTitle: t(TranslationKey['Accrual data']),
    items: [
      {
        dataKey: SupervisorDashboardCardDataKey.REPLENISH,
        title: t(TranslationKey.Accruals),

        route: '/supervisor/finances',
        dataGridFilter: {
          items: [
            {
              columnField: 'sum',
              operatorValue: '>=',
              value: '0',
            },
          ],
        },
      },
      {
        dataKey: SupervisorDashboardCardDataKey.FINES,
        title: t(TranslationKey.Fines),
        isNegative: true,
        route: '/supervisor/finances',
        dataGridFilter: {
          items: [
            {
              columnField: 'sum',
              operatorValue: '<',
              value: '0',
            },
          ],
        },
      },
    ],
  },
]
