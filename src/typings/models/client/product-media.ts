export interface IProductMedia {
  productImages?: Array<string>
  latestSeoFiles?: Array<string>
  currentSupplierImage?: Array<string>
  supplierImage?: Array<ISupplierImage>
}

interface ISupplierImage {
  _id?: string
  images?: Array<string>
}
