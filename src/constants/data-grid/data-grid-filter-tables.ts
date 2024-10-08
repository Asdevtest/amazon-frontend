// Значение должно быть равно названию таблицы в базе данных

export enum DataGridFilterTables {
  SELLERBOARD_WAREHOUSE_EVERY_DAY = 'sellerboardWarehouseEveryDay',
  SELLERBOARD_LAST_30_DAYS = 'sellerboardLast30Days',
  INVENTORY = 'inventory',
  PPC_SALES_WEEKS = 'ppcSalesWeeks',
  INVENTORY_SHIPMENTS = 'inventoryShipments',
  INVENTORY_RETURNS = 'inventoryReturns',
  PPC_SALES_DAYS = 'ppcSalesDays',

  PRODUCTS = 'products',
  USERS = 'users',
  STOREKEEPERS = 'storekeepers',
  SUPPLIERS = 'suppliers',
  BATCHES = 'batches',
  BOXES = 'boxes',
  REQUESTS = 'requests',
  USER_NOTIFICATIONS = 'user_notifications',
  ORDERS = 'orders',
  IDEAS = 'ideas',
  PRODUCT_LISTING_REPORTS = 'productListingReports',
}
