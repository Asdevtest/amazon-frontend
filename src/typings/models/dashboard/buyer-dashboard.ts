export interface IBuyerDashboard {
  products?: IBuyerDashboardProducts
  orders?: IBuyerDashboardOrders
  pendingOrders?: IBuyerDashboardPendingOrders
  finances?: IBuyerDashboardFinances
}

export interface IBuyerDashboardProducts {
  all?: number
  success?: number
  paid?: number
  newSearchFromSupervisor?: number
  newSearchFromClient?: number
  inProcessOfSearching?: number
  canceled?: number
}

export interface IBuyerDashboardOrders {
  inProcess?: number
  free?: number
  completed?: number
  all?: number
  paid?: number
  canceled?: number
  notPaid?: number
  needTrackNumber?: number
  inbound?: number
  confirmationRequired?: number
  closedAndCanceled?: number
}

export interface IBuyerDashboardPendingOrders {
  pending?: number
  readyToBuy?: number
}
export interface IBuyerDashboardFinances {
  accruals?: number
  fines?: number
  refunds?: number
}
