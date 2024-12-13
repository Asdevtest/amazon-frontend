import { makeAutoObservable, runInAction } from 'mobx'

import { ProductModel } from '@models/product-model'
import { UserModel } from '@models/user-model'

import { isAdmin, isClient, isResearcher } from '@typings/guards/roles'
import { IProduct } from '@typings/models/products/product'
import { IFullUser } from '@typings/shared/full-user'

import { ProductTubs } from './main-product-form.config'

export class MainProductFormModel {
  product?: IProduct
  tabValue = ProductTubs.MAIN_INFO

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  get isClient() {
    return isClient(this.userInfo.role)
  }
  get isResearcher() {
    return isResearcher(this.userInfo.role)
  }
  get isAdmin() {
    return isAdmin(this.userInfo.role)
  }

  constructor(productId: string) {
    this.getProductById(productId)
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeTabValue(key: string) {
    this.tabValue = key as ProductTubs
  }

  async getProductById(id: string) {
    try {
      const response = (await ProductModel.getProductById(id)) as unknown as IProduct

      runInAction(() => {
        this.product = response
      })
    } catch (error) {
      console.error(error)
    }
  }
}
