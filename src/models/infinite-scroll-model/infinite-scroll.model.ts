/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

import { loadingStatus } from '@typings/enums/loading-status'

const observableConfig = {
  method: observable,
  options: observable,
  searchFields: observable,
  filterFields: observable,
  data: observable,
  meta: observable,
  hasMore: observable,
  requestStatus: observable,
  searchValue: observable,
  filtersCount: observable,

  loading: computed,

  getData: action.bound,
  loadMoreData: action.bound,
  onSearchSubmit: action.bound,
  onFilterSubmit: action.bound,
  setOptions: action.bound,
  onResetOptions: action.bound,
}

const DEFAULT_OPTIONS = {
  offset: 0,
  limit: 25,
  sortField: 'updatedAt',
  sortType: 'DESC',
  filters: '',
}

export type FilterOptionsType = Record<string, Record<string, string | number>>

interface InfiniteScrollModelProps {
  method: ICallback
  options?: any
  searchFields?: string[]
  filterFields?: string[]
}

interface ICallback {
  (options: any): any
}

export class InfiniteScrollModel<T, M = any> {
  data: T[] = []
  meta?: M
  method: ICallback
  hasMore = true
  options = DEFAULT_OPTIONS
  searchFields: string[] = []
  filterFields: string[] = []
  requestStatus = loadingStatus.SUCCESS
  searchValue = ''
  filtersCount = 0

  get loading() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor({ method, options, searchFields = [], filterFields = [] }: InfiniteScrollModelProps) {
    this.method = method
    this.setOptions(options)
    this.searchFields = searchFields
    this.filterFields = filterFields

    makeObservable(this, observableConfig)
  }

  private setLoadingState() {
    this.requestStatus = loadingStatus.IS_LOADING
  }
  private setErrorState() {
    this.requestStatus = loadingStatus.FAILED
  }

  async getData() {
    if (!this.method) {
      return
    }

    try {
      this.setLoadingState()

      const response = await this.method(this.options)

      runInAction(() => {
        this.data = response?.rows || response
        this.meta = response?.meta
        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      this.setErrorState()
    }
  }

  async loadMoreData() {
    if (!this.method || !this.hasMore || this.requestStatus !== loadingStatus.SUCCESS) {
      return
    }

    try {
      this.setLoadingState()
      this.options.offset += this.options.limit

      const response = await this.method(this.options)
      const dataToAdd = response.rows || response

      runInAction(() => {
        this.data = [...this.data, ...dataToAdd]

        if (dataToAdd?.length < this.options.limit) {
          this.hasMore = false
        }

        this.requestStatus = loadingStatus.SUCCESS
      })
    } catch (error) {
      this.setErrorState()
    }
  }

  async onSearchSubmit(searchValue: string) {
    this.searchValue = searchValue.trim()

    if (!this.method || this.requestStatus !== loadingStatus.SUCCESS) {
      return
    }

    try {
      this.hasMore = true
      this.setOptions({
        offset: 0,
        filters: objectToUrlQs(dataGridFiltersConverter({}, searchValue, '', this.filterFields, this.searchFields)),
      })

      await this.getData()
    } catch (error) {
      this.setErrorState()
    }
  }

  async onFilterSubmit(filtersOtions: FilterOptionsType) {
    if (!this.method || this.requestStatus !== loadingStatus.SUCCESS) {
      return
    }

    try {
      this.hasMore = true
      this.setOptions({
        offset: 0,
        filters: objectToUrlQs(
          dataGridFiltersConverter({}, this.searchValue, '', this.filterFields, this.searchFields, filtersOtions),
        ),
      })

      await this.getData()

      runInAction(() => {
        this.filtersCount = new Set(Object.keys(filtersOtions)).size
      })
    } catch (error) {
      this.setErrorState()
    }
  }

  async onResetOptions() {
    this.hasMore = true
    this.setOptions(DEFAULT_OPTIONS)
    this.filtersCount = 0

    await this.getData()
  }

  setOptions(options?: any) {
    if (options) {
      this.options = {
        ...this.options,
        ...options,
      }
    }
  }
}
