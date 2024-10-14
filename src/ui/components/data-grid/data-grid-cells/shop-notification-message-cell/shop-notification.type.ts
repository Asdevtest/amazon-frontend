export interface IShop {
  _id: string
  name: string
  result: ShopUpdateResult
  data: {
    [key: string]: string
  }
}

export enum ShopUpdateResult {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface IIntegrationResult {
  [ShopUpdateResult.SUCCESS]: string[]
  [ShopUpdateResult.ERROR]: {
    table: string
    error: string
  }[]
}
