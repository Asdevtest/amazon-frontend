export interface ISupervisorDashboard {
  products: ISupervisorDashboardProducts
  checking: ISupervisorDashboardChecking
  finances: ISupervisorDashboardFinances
}
export interface ISupervisorDashboardProducts {
  all: number
  publishedOnExchange: number
  paid: number
  rejected: number
}
export interface ISupervisorDashboardChecking {
  checkFromResearcher: number
  newSearchFromClient: number
  onReview: number
  waitingToCheck: number
  inWorkBuyer: number
}

export interface ISupervisorDashboardFinances {
  accruals: number
  fines: number
  refunds: number
}
