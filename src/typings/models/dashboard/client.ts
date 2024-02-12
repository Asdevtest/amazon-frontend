export interface IClientDashboard {
  orders?: IDashboardOrders
  shops?: IDashboardShops
  requests?: IDashboardRequest
  products?: IDashboardProducts
  batch?: IDashboardBatch
  boxes?: IDashboardBox
}

export interface IDashboardOrders {
  all?: number
  paid?: number
  canceled?: number
}

export interface IDashboardShops {
  all?: number
  moderating?: number
  booked?: number
}

export interface IDashboardRequest {
  all?: number
  inProcess?: number
  noProposals?: number
}

export interface IDashboardProducts {
  all?: number
  paid?: number
}

export interface IDashboardBatch {
  isBeingCollected?: number
}

export interface IDashboardBox {
  inStock?: number
  requestedSendToBatch?: number
  inBatchOnTheWay?: number
}
