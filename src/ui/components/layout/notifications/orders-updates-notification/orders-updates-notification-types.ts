export interface Product {
  _id: string
  asin: string
  skusByClient: unknown[]
}

export interface OrdersUpdatesNotificationItem {
  _id: string
  id: number
  status: number
  product: Product
}
