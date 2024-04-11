import { makeAutoObservable } from 'mobx'

import { GeneralModel } from '@models/general-model'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITagList } from '@typings/models/generals/tag-list'

export class EditProductTagModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS

  productId: string = ''

  offset: number = 0
  limit: number = 100

  tags: ITagList[] = []
  selectedTags: ITagList[] = []

  get allTags() {
    return this.tags
  }

  constructor(productId: string, selectedTags: ITagList[]) {
    this.productId = productId
    this.selectedTags = selectedTags

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

  setSeletedTag(tag: ITagList) {
    const tagIndex = this.selectedTags.findIndex(el => el._id === tag._id)

    if (tagIndex === -1) {
      this.selectedTags.push(tag)
    } else {
      this.selectedTags.splice(tagIndex, 1)
    }
  }
}
