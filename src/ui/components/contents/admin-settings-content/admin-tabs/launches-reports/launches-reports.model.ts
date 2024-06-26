import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { ONE_DAY_IN_SECONDS } from '@constants/time'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class LaunchesReportsModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  currentTimeBeforeLaunchDeadline = 0

  get isLoading() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor(timeBeforeLaunchDeadline: number) {
    makeAutoObservable(this, undefined, { autoBind: true })

    this.currentTimeBeforeLaunchDeadline = timeBeforeLaunchDeadline / ONE_DAY_IN_SECONDS
  }

  onChangeDeadline(value: number | string | null) {
    this.currentTimeBeforeLaunchDeadline = Number(value)
  }

  async onSaveDeadline() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      const value = this.currentTimeBeforeLaunchDeadline * ONE_DAY_IN_SECONDS

      await AdministratorModel.patchLaunchPreDeadlineValue({ value })

      toast.success(t(TranslationKey['Data saved']))
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }
}
