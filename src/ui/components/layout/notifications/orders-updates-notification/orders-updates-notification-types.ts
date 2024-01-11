export interface Product {
  _id: string
  asin: string
  skuByClient: string
}

export interface OrdersUpdatesNotificationItem {
  _id: string
  id: number
  status: number
  product: Product
}
