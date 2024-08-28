import { makeAutoObservable, reaction, runInAction } from 'mobx'
import { MouseEvent } from 'react'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { GeneralModel } from '@models/general-model'
import { ProductModel } from '@models/product-model'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITag } from '@typings/shared/tag'

import { IHandleUpdateRow } from './edit-product-tags.type'

export class EditProductTagModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  requestTagsByIdStatus: loadingStatus = loadingStatus.SUCCESS

  productId: string = ''
  newTagTitle: string = ''

  offset: number = 0
  limit: number = 50

  tags: ITag[] = []
  selectedTags: ITag[] = []

  isCanLoadMore = true

  searchValue: string = ''
  debounceSearchValue: string = ''

  set setDebounceSearchValue(value: string) {
    this.debounceSearchValue = value
  }

  showAddOrEditTagModal = false

  constructor(productId: string) {
    this.productId = productId
    makeAutoObservable(this, undefined, { autoBind: true })

    this.getTagsAll()
    this.getTagsByProductId()

    reaction(
      () => this.debounceSearchValue,
      () => this.onClickSubmitSearch(this.debounceSearchValue),
    )
  }

  async getTagsAll() {
    try {
      runInAction(() => {
        this.requestStatus = loadingStatus.IS_LOADING
      })

      this.isCanLoadMore = true
      this.offset = 0

      const result = await this.getTagsData()

      runInAction(() => {
        this.tags = result?.rows as ITag[]
      })

      runInAction(() => {
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      runInAction(() => {
        this.requestStatus = loadingStatus.SUCCESS
      })
      console.error(error)
    }
  }

  async getTagsByProductId() {
    try {
      runInAction(() => {
        this.requestTagsByIdStatus = loadingStatus.IS_LOADING
      })

      const result = await ProductModel.getProductTagsByGuid(this.productId)
      runInAction(() => {
        this.selectedTags = result as ITag[]
      })

      runInAction(() => {
        this.requestTagsByIdStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      runInAction(() => {
        this.requestTagsByIdStatus = loadingStatus.SUCCESS
      })
      console.error(error)
    }
  }

  async handleCreateTag(tag: ITag) {
    try {
      const result = await GeneralModel.createTag({
        title: tag?.title,
        color: tag?.color,
      })

      this.selectedTags?.push({
        _id: result._id,
        title: tag?.title,
        color: tag?.color,
      } as ITag)

      this.onClickToggleAddOrEditModal()

      toast.success(t(TranslationKey['Tag was successfully created and added to the list']))
    } catch (error) {
      toast.error(t(TranslationKey['Failed to create tag']))
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

          this.offset += this.limit
        })

        const result = await this.getTagsData()

        runInAction(() => {
          this.tags = this.tags.concat(result?.rows as ITag[])

          if ((result?.rows?.length || 0) < this.limit) {
            this.isCanLoadMore = false
          }
        })

        runInAction(() => {
          this.requestStatus = loadingStatus.SUCCESS
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  async onClickSubmitSearch(searchValue: string) {
    runInAction(() => {
      this.debounceSearchValue = searchValue
    })

    if (this.requestStatus !== loadingStatus.SUCCESS) {
      return
    }

    try {
      runInAction(() => {
        this.isCanLoadMore = true
        this.offset = 0
      })

      const result = await this.getTagsData()

      runInAction(() => {
        this.tags = result?.rows as ITag[]
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
        filters:
          objectToUrlQs(
            dataGridFiltersConverter(
              {},
              this.debounceSearchValue ? `"${this.debounceSearchValue}"` : '',
              '',
              [],
              ['title'],
            ),
          ) || '',
      })
      return result
    } catch (error) {
      console.error(error)
    }
  }

  handleClickTag(tags: ITag[]) {
    this.selectedTags = tags
  }

  async handleBindTagsToProduct(handleUpdateRow: IHandleUpdateRow) {
    try {
      await ProductModel.editProductTags(this.productId, { tags: this.selectedTags?.map(tag => tag?._id) })
      handleUpdateRow(this.selectedTags)
    } catch (error) {
      console.error(error)
    }
  }

  setNewTagTitle(value: string) {
    this.newTagTitle = value
  }

  onClickToggleAddOrEditModal() {
    this.showAddOrEditTagModal = !this.showAddOrEditTagModal
  }

  onSearch(value: string) {
    this.searchValue = value
  }
}
