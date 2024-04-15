import { makeAutoObservable, runInAction } from 'mobx'

import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITagList } from '@typings/models/generals/tag-list'

export class EditProductTagModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  requestTagsByIdStatus: loadingStatus = loadingStatus.SUCCESS

  productId: string = ''

  offset: number = 0
  limit: number = 100

  tags: ITagList[] = []
  selectedTags: ITagList[] = []

  isCanLoadMore = true

  get availableTags() {
    return this.tags?.filter(tag => !this.selectedTags?.find(selectedTag => selectedTag._id === tag._id))
  }

  constructor(productId: string) {
    this.productId = productId
    makeAutoObservable(this)

    this.getTagsAll()
    this.getTagsByProductId()
  }

  async getTagsAll() {
    try {
      const result = await this.getTagsData({
        limit: this.limit,
        offset: this.offset,
      })

      runInAction(() => {
        this.tags = result?.rows as ITagList[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getTagsByProductId() {
    try {
      this.requestTagsByIdStatus = loadingStatus.IS_LOADING

      const result = await ProductModel.getProductTagsByGuid(this.productId)
      runInAction(() => {
        this.selectedTags = result as ITagList[]
      })

      this.requestTagsByIdStatus = loadingStatus.SUCCESS
    } catch (error) {
      this.requestTagsByIdStatus = loadingStatus.SUCCESS
      console.error(error)
    }
  }

  async createTag(titleTag: string) {
    try {
      const result = await GeneralModel.createTag(titleTag)
    } catch (error) {
      console.error(error)
    }
  }

  async loadMoreDataHadler() {
    if (!this.isCanLoadMore || this.requestStatus !== loadingStatus.SUCCESS) return

    try {
      this.requestStatus = loadingStatus.IS_LOADING

      this.offset += this.limit

      const result = await this.getTagsData({
        limit: this.limit,
        offset: this.offset,
      })

      runInAction(() => {
        this.tags = this.tags.concat(result?.rows as ITagList[])
      })

      if ((result?.rows?.length || 0) < this.limit) {
        this.isCanLoadMore = false
      }

      this.requestStatus = loadingStatus.SUCCESS
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSubmitSearch(searchValue: string) {
    if (this.requestStatus !== loadingStatus.SUCCESS) return
    try {
      this.isCanLoadMore = true
      this.offset = 0

      const result = await this.getTagsData({
        offset: 0,
        filters: objectToUrlQs(dataGridFiltersConverter({}, searchValue, '', [], ['title'])),
      })

      runInAction(() => {
        this.tags = result?.rows as ITagList[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getTagsData(options: any) {
    try {
      const result = await GeneralModel.getPagTagList(options)
      return result
    } catch (error) {
      console.error(error)
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
