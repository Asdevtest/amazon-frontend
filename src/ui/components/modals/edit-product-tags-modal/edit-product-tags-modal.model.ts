import { makeAutoObservable, runInAction } from 'mobx'
import { MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITagList } from '@typings/models/generals/tag-list'

import { IHandleUpdateRow } from './edit-product-tags.type'

export class EditProductTagModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  requestTagsByIdStatus: loadingStatus = loadingStatus.SUCCESS

  productId: string = ''

  offset: number = 0
  limit: number = 10

  tags: ITagList[] = []
  selectedTags: ITagList[] = []

  isCanLoadMore = true

  searchValue: string = ''

  get availableTags() {
    return this.tags?.filter(tag => !this.selectedTags?.find(selectedTag => selectedTag._id === tag._id))
  }

  constructor(productId: string) {
    this.productId = productId
    makeAutoObservable(this, undefined, { autoBind: true })

    this.getTagsByProductId()
  }

  async getTagsAll() {
    try {
      this.requestStatus = loadingStatus.IS_LOADING

      this.offset = 0

      const result = await this.getTagsData()

      runInAction(() => {
        this.tags = result?.rows as ITagList[]
      })

      this.requestStatus = loadingStatus.SUCCESS
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

  async handleCreateTag(titleTag: string) {
    try {
      const result = await GeneralModel.createTag(titleTag)

      this.selectedTags?.push({
        _id: result._id,
        title: titleTag,
      } as ITagList)

      toast.success(t(TranslationKey['Tag was successfully created and added to the list']))
    } catch (error) {
      console.error(error)
    }
  }

  async loadMoreDataHadler(scrollEvent: MouseEvent<HTMLDivElement>) {
    if (!this.isCanLoadMore || this.requestStatus !== loadingStatus.SUCCESS) return

    const element = scrollEvent.target as HTMLDivElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 50) {
      try {
        runInAction(() => {
          this.requestStatus = loadingStatus.IS_LOADING
        })

        this.offset += this.limit

        const result = await this.getTagsData()

        runInAction(() => {
          this.tags = this.tags.concat(result?.rows as ITagList[])
        })

        if ((result?.rows?.length || 0) < this.limit) {
          this.isCanLoadMore = false
        }

        runInAction(() => {
          this.requestStatus = loadingStatus.SUCCESS
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  async onClickSubmitSearch(searchValue: string) {
    this.searchValue = searchValue

    if (this.requestStatus !== loadingStatus.SUCCESS || !searchValue) return
    try {
      this.isCanLoadMore = true
      this.offset = 0

      const result = await this.getTagsData()

      runInAction(() => {
        this.tags = result?.rows as ITagList[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getTagsData() {
    try {
      const result = await GeneralModel.getPagTagList({
        offset: this.offset,
        limit: this.limit,
        filters: objectToUrlQs(dataGridFiltersConverter({}, this.searchValue, '', [], ['title'])),
      })
      return result
    } catch (error) {
      console.error(error)
    }
  }

  handleClickTag(tag: ITagList) {
    const tagIndex = this.selectedTags?.findIndex(el => el?._id === tag?._id)

    if (tagIndex === -1) {
      this.selectedTags.push(tag)
    } else {
      this.selectedTags.splice(tagIndex, 1)
    }
  }

  handleResetOptions() {
    runInAction(() => {
      this.offset = 0
    })
  }

  async handleBindTagsToProduct(handleUpdateRow: IHandleUpdateRow) {
    try {
      await ProductModel.editProductTags(this.productId, { tags: this.selectedTags?.map(tag => tag?._id) })
      handleUpdateRow([{ _id: this.productId, tags: this.selectedTags }])
    } catch (error) {
      console.error(error)
    }
  }
}
