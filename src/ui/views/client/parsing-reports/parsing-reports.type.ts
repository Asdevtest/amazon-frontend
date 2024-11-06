export interface ParsingReportsModelParams {
  table?: ParsingReportsType
  productId?: string
}

export enum ParsingReportsType {
  BUSINESS_REPORTS = 'BUSINESS_REPORTS',
  ORDERS = 'ORDERS',
  TOTAL_BALANCE = 'TOTAL_BALANCE',
  FEEDBACK = 'FEEDBACK',
  TRANSACTIONS = 'TRANSACTIONS',
  INVENTORY = 'INVENTORY',
  CAMPAIGNS = 'CAMPAIGNS',
  PERFORMANCE_NOTIFICATIONS = 'PERFORMANCE_NOTIFICATIONS',
  FBA_INVENTORY = 'FBA_INVENTORY',
  ACCOUNT_HEALTH = 'ACCOUNT_HEALTH',
  RETURNS = 'RETURNS',
  INVENTORY_PLANNING = 'INVENTORY_PLANNING',
  BRANDS_REVIEW = 'BRANDS_REVIEW',
  INVENTORY_SHIPMENTS = 'INVENTORY_SHIPMENTS',
  VOICE = 'VOICE',
  PPC_ORGANIC = 'PPC_ORGANIC',
}

export interface IFbaCapacityLimits {
  _id: string
  inventoryPlanningId: string
  month: string
  value: number
}
