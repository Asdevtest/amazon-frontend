/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'
import { ISpec } from '@typings/shared/spec'

interface ICallback {
  (options: IOptions): any
}
interface IOptions {
  [x: string]: any
}

export interface IPermissionsData {
  _id: string
  asin: string
  shopId: string
  amazonTitle: string
  skuByClient: string[]
  buyerId: string
  images: string[]
  humanFriendlyId?: string
  name?: string
  allowedSpec?: ISpec[]
}

/*
 * Опции для функции можно задать двумя способами:
 * 1. Конструктор класса
 * 2. Аргументов функции getPermissionsData
 * По задумке, если опции статичны (не меняются), то нужно использовать первый способ
 * Если опции меняются, то можно использовать второй
 * Способы взаимоисключающие, если используется один, не должен использоваться другой
 */

export class UseProductsPermissions {
  callback: ICallback
  options = {
    offset: 0,
    limit: 15,
    sortField: 'asin',
    sortType: 'ASC',
    filters: '',
  }
  searchFields?: string[]

  permissionsData: IPermissionsData[] = []

  isCanLoadMore = true
  requestStatus = loadingStatus.SUCCESS

  constructor(callback: ICallback, options?: IOptions, searchFields?: string[]) {
    makeObservable(this, {
      callback: observable,
      options: observable,
      permissionsData: observable,
      isCanLoadMore: observable,
      requestStatus: observable,
      searchFields: observable,

      currentPermissionsData: computed,
      currentRequestStatus: computed,

      getPermissionsData: action.bound,
      loadMoreDataHadler: action.bound,
      onClickSubmitSearch: action.bound,
      setOptions: action.bound,
      resetOptions: action.bound,
    })

    this.callback = callback
    this.searchFields = searchFields
    this.setOptions(options)
  }

  get currentPermissionsData() {
    return this.permissionsData
  }

  get currentRequestStatus() {
    return this.requestStatus
  }

  async getPermissionsData(options?: IOptions) {
    if (!this.callback) return

    try {
      runInAction(() => {
        this.requestStatus = loadingStatus.IS_LOADING
      })

      this.setOptions(options)

      const result = await this.callback(this.options)

      runInAction(() => {
        this.permissionsData = result.rows || result
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      console.error(error)
    }
  }

  async loadMoreDataHadler() {
    if (!this.callback || !this.isCanLoadMore || this.requestStatus !== loadingStatus.SUCCESS) return

    try {
      runInAction(() => {
        this.requestStatus = loadingStatus.IS_LOADING
        this.options.offset += this.options.limit
      })

      const result = await this.callback(this.options)

      runInAction(() => {
        this.permissionsData = [...this.permissionsData, ...result.rows]
      })

      if (result.rows.length < this.options.limit) {
        this.isCanLoadMore = false
      }

      runInAction(() => {
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSubmitSearch(searchValue: string) {
    console.log('searchValue', searchValue)
    if (!this.callback || this.requestStatus !== loadingStatus.SUCCESS) return
    try {
      runInAction(() => {
        this.requestStatus = loadingStatus.IS_LOADING
        this.isCanLoadMore = true
      })

      this.setOptions({
        offset: 0,
        filters: objectToUrlQs(
          dataGridFiltersConverter({}, searchValue, '', [], this.searchFields || ['skuByClient', 'asin']),
        ),
      })

      await this.getPermissionsData()

      runInAction(() => {
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      console.error(error)
    }
  }

  resetOptions() {
    this.isCanLoadMore = true

    this.options = {
      ...this.options,
      offset: 0,
      limit: 15,
    }
  }

  setOptions(options?: IOptions) {
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      }
    }
  }
}
