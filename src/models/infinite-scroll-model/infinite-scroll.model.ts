/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, makeObservable, observable, runInAction } from 'mobx'
import { UIEvent } from 'react'

import { dataGridFiltersConverter } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'

const observableConfig = {
  method: observable,
  options: observable,
  searchFields: observable,
  filterFields: observable,
  data: observable,
  meta: observable,
  hasMore: observable,
  searchValue: observable,
  filtersCount: observable,
  loading: observable,
  filtersOtions: observable,

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

export type FilterOptionsType = Record<string, Record<string, string | number | boolean | null>>

interface InfiniteScrollModelProps {
  method: ICallback
  filterOptions?: any
  searchFields?: string[]
  filterFields?: string[]
}

export interface ICallback {
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
  searchValue = ''
  filtersCount = 0
  loading: boolean = false
  filtersOtions?: FilterOptionsType

  constructor({ method, filterOptions, searchFields = [], filterFields = [] }: InfiniteScrollModelProps) {
    this.method = method
    this.setOptions(filterOptions)
    this.searchFields = searchFields
    this.filterFields = filterFields

    makeObservable(this, observableConfig)
  }

  async getData() {
    if (!this.method) {
      return
    }

    try {
      runInAction(() => {
        this.loading = true
      })

      this.setOptions({
        filters: objectToUrlQs(
          dataGridFiltersConverter({}, this.searchValue, '', this.filterFields, this.searchFields, this.filtersOtions),
        ),
      })

      const response = await this.method(this.options)

      runInAction(() => {
        this.data = response?.rows || response
        this.meta = response?.meta
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async loadMoreData(event?: UIEvent<HTMLDivElement>) {
    if (!this.method || !this.hasMore || this.loading) {
      return
    }

    if (event?.currentTarget) {
      const { scrollTop, clientHeight, scrollHeight } = event.currentTarget

      if (scrollHeight - (scrollTop + clientHeight) > 0) {
        return
      }
    }

    try {
      runInAction(() => {
        this.loading = true
        this.options.offset += this.options.limit
      })

      const response = await this.method(this.options)
      const dataToAdd = response.rows || response

      runInAction(() => {
        this.data = [...this.data, ...dataToAdd]

        if (dataToAdd?.length < this.options.limit) {
          this.hasMore = false
        }
      })
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.loading = false
      })
    }
  }

  async onSearchSubmit(searchValue: string) {
    if (!this.method || this.loading) {
      return
    }

    this.searchValue = searchValue.trim()

    try {
      this.hasMore = true
      this.setOptions({
        offset: 0,
        filters: objectToUrlQs(
          dataGridFiltersConverter({}, this.searchValue, '', this.filterFields, this.searchFields, this.filtersOtions),
        ),
      })

      await this.getData()
    } catch (error) {
      console.error(error)
    }
  }

  async onFilterSubmit(filtersOtions: FilterOptionsType) {
    if (!this.method || this.loading) {
      return
    }

    runInAction(() => {
      this.filtersOtions = filtersOtions
      this.filtersCount = new Set(Object.keys(filtersOtions)).size
    })

    try {
      this.hasMore = true
      this.setOptions({
        offset: 0,
        filters: objectToUrlQs(
          dataGridFiltersConverter({}, this.searchValue, '', this.filterFields, this.searchFields, this.filtersOtions),
        ),
      })

      await this.getData()
    } catch (error) {
      console.error(error)
    }
  }

  async onResetOptions() {
    runInAction(() => {
      this.filtersCount = 0
      this.filtersOtions = undefined
    })

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
