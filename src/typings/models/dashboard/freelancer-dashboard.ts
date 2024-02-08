export interface IFreelancerDashboard {
  finances?: IFreelancerDashboardFinances
}

export interface IFreelancerDashboardFinances {
  accruals?: number
  fines?: number
  refunds?: number
}
