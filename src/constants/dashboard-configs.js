export const ResearcherDashboardCardDataKey = {
  PRODUCTS: 'PRODUCTS',
  CUR_BALANCE: 'CUR_BALANCE',
  FINES: 'FINES',
}
export const getResearcherDashboardCardConfig = textConsts => [
  {dataKey: ResearcherDashboardCardDataKey.PRODUCTS, title: textConsts.myProductsCardTitle, color: '#63c2de'},
  {dataKey: ResearcherDashboardCardDataKey.CUR_BALANCE, title: textConsts.curBalanceCardTitle, color: '#4dbd74'},
  {dataKey: ResearcherDashboardCardDataKey.FINES, title: textConsts.finesCardTitle, color: '#f86c6b'},
]

export const SupervisorDashboardCardDataKey = {
  NEW_PRODUCTS: 'NEW_PRODUCTS',
  ME_CHECKING: 'ME_CHECKING',
  ACCURED: 'ACCURED',
  FINES: 'FINES',
}
export const getSupervisorDashboardCardConfig = textConsts => [
  {dataKey: SupervisorDashboardCardDataKey.NEW_PRODUCTS, title: textConsts.newProductsCardTitle, color: '#63c2de'},
  {dataKey: SupervisorDashboardCardDataKey.ME_CHECKING, title: textConsts.meCheckingCardTitle, color: '#FFC107'},
  {dataKey: SupervisorDashboardCardDataKey.ACCURED, title: textConsts.accuredCardTitle, color: '#4dbd74'},
  {dataKey: SupervisorDashboardCardDataKey.FINES, title: textConsts.finesCardTitle, color: '#f86c6b'},
]
