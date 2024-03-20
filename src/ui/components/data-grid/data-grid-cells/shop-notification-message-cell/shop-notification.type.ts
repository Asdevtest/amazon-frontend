export interface IShop {
  _id: string
  name: string
  result: ShopUpdateResult
}

export enum ShopUpdateResult {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
