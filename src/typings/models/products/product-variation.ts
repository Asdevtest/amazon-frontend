export interface IVariationProduct {
  childProducts: IVariationProduct[]
  parentProduct: IVariationProduct
  _id: string
  asin: string
  skuByClient: string
  images: string[]
  shopId: string
  amazonTitle: string
}
