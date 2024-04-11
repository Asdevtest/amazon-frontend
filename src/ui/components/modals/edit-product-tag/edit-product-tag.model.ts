import { makeAutoObservable } from 'mobx'

import { GeneralModel } from '@models/general-model'

import { loadingStatus } from '@typings/enums/loading-status'

export class EditProductTagModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS

  productId: string = ''

  offset: number = 0
  limit: number = 100

  tags: any[] = []

  constructor(productId: string) {
    this.productId = productId

    makeAutoObservable(this)
  }

  async getTags() {
    try {
      const result = await GeneralModel.getPagTagList({
        limit: this.limit,
        offset: this.offset,
      })
    } catch (e) {
      console.error(e)
    }
  }
}
