export interface IResearcherDasboard {
  products?: IResearcherDasboardProducts
  finances?: IResearcherDasboardFinances
}

export interface IResearcherDasboardProducts {
  all?: number
  completed?: number
  rejected?: number
  inWork?: number
  searchSupplierFromBuyer?: number
  withoutStatus?: number
}

export interface IResearcherDasboardFinances {
  accruals?: number
  fines?: number
  refunds?: number
}
