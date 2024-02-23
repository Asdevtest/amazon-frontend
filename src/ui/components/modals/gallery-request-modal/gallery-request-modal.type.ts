export interface ISupplier {
  _id: string
  images: string[]
}

export type IState = Record<string, string[]>

export interface IData {
  productImages: string[]
  latestSeoFiles: string[]
  currentSupplierImage: string[]
  supplierImage: ISupplier[]
}
