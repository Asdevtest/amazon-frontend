export interface IProductMedia {
  productImages: Array<string>
  latestSeoFiles: Array<string>
  currentSupplierCardImage: Array<string>
  supplierCardsImages: Array<ISupplierImage>
}

interface ISupplierImage {
  _id: string
  images: Array<string>
}
