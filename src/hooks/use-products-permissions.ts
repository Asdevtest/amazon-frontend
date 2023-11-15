/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

interface ICallback {
  (options: IOptions): any
}
interface IOptions {
  [x: string]: any
}

interface IPermissionsData {
  _id: string
  asin: string
  shopIds: string[]
  amazonTitle: string
  skusByClient: string[]
  buyerId: string
  images: string[]
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

  permissionsData: IPermissionsData[] = []

  isCanLoadMore = true
  requestStatus = loadingStatuses.success

  constructor(callback: ICallback, options?: IOptions) {
    makeAutoObservable(this)

    this.callback = callback
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
      this.requestStatus = loadingStatuses.isLoading

      this.setOptions(options)

      const result = await this.callback(this.options)

      runInAction(() => {
        this.permissionsData = result.rows
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async loadMoreDataHadler() {
    if (!this.callback || !this.isCanLoadMore || this.requestStatus !== loadingStatuses.success) return

    try {
      this.requestStatus = loadingStatuses.isLoading

      this.options.offset += this.options.limit
      const result = await this.callback(this.options)

      runInAction(() => {
        this.permissionsData = [...this.permissionsData, ...result.rows]
      })

      if (result.rows.length < this.options.limit) {
        this.isCanLoadMore = false
      }

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      throw new Error(`${error}`)
    }
  }

  async onClickSubmitSearch(searchValue: string) {
    if (!this.callback || this.requestStatus !== loadingStatuses.success) return
    try {
      this.requestStatus = loadingStatuses.isLoading

      this.isCanLoadMore = true
      this.setOptions({
        offset: 0,
        filters: objectToUrlQs(dataGridFiltersConverter({}, searchValue, '', [], ['skusByClient', 'asin'])),
      })

      await this.getPermissionsData()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      throw new Error(`${error}`)
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
