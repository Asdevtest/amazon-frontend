import { makeAutoObservable, runInAction } from 'mobx'

import { ProductModel } from '@models/product-model'

import { IVariationProduct } from '@typings/models/products/product-variation'

export class ProductVariationsFormModel {
  variationProduct?: IVariationProduct
  showBindProductModal = false
  productId?: string

  get parentProduct() {
    return this.variationProduct?.parentProduct || this.variationProduct
  }
  get isEmpty() {
    return !this.variationProduct?.childProducts?.length && !this.variationProduct?.parentProduct
  }

  constructor(id: string) {
    this.productId = id
    this.getProductVariations()
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async getProductVariations() {
    try {
      const response = (await ProductModel.getProductsVariationsByGuid(this.productId)) as unknown as IVariationProduct

      runInAction(() => {
        this.variationProduct = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onUnbindProduct(id: string) {
    try {
      await ProductModel.unbindProducts({
        parentProductId: null,
        childProductIds: [id],
      })

      this.getProductVariations()
    } catch (error) {
      console.error(error)
    }
  }

  onToggleBindProductModal() {
    this.showBindProductModal = !this.showBindProductModal
  }
}
