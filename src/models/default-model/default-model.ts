/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { useHistory } from 'react-router-dom'

import { ModalsModel } from '@models/model-with-modals'

import { loadingStatus } from '@typings/enums/loading-status'

import { DefaultModelParams } from './default-model.type'
import { observerConfig } from './observer.config'

export class DefaultModel extends ModalsModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  loading: boolean = false
  currentData: any[] = []
  rowCount: number = 0
  meta?: any = null

  getMainDataMethod: any
  defaultGetCurrentDataOptions: any

  history: any

  constructor({ getMainDataMethod, defaultGetCurrentDataOptions }: DefaultModelParams) {
    super()

    this.getMainDataMethod = getMainDataMethod
    this.defaultGetCurrentDataOptions = defaultGetCurrentDataOptions

    makeObservable(this, observerConfig)
  }

  async getCurrentData(options?: any) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await this?.getMainDataMethod(options || this.defaultGetCurrentDataOptions?.())

      runInAction(() => {
        this.currentData = result?.rows || result || []
        this.rowCount = result?.count || result?.length || 0
        this.meta = result?.meta
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)

      this.currentData = []
      this.rowCount = 0
      this.meta = null
    }
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }

  setLoading(value: boolean) {
    this.loading = value
  }

  initHistory() {
    this.history = useHistory()
  }
}
