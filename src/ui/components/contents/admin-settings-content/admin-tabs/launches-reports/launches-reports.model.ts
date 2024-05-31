/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeAutoObservable } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { LaunchesReportsDateType } from './launches-reports.type'

export class LaunchesReportsModel {
  requestStatus: loadingStatus = loadingStatus.SUCCESS
  currentTimeBeforeLaunchDeadline = 0
  dateType = LaunchesReportsDateType.DAYS

  get isLoading() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor({ timeBeforeLaunchDeadline }: { timeBeforeLaunchDeadline: number }) {
    makeAutoObservable(this, undefined, { autoBind: true })

    const hoursLaunchDeadline = timeBeforeLaunchDeadline / 60 / 60

    if (hoursLaunchDeadline < 24) {
      this.currentTimeBeforeLaunchDeadline = hoursLaunchDeadline
      this.dateType = LaunchesReportsDateType.HOURS
    } else {
      this.currentTimeBeforeLaunchDeadline = hoursLaunchDeadline / 24
    }
  }

  handleChangeDeadline(value: number | null) {
    this.currentTimeBeforeLaunchDeadline = value || 0
  }

  handleChangeDateType(value: LaunchesReportsDateType) {
    this.dateType = value
  }

  async handleSaveDeadline() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      let value = this.currentTimeBeforeLaunchDeadline

      if (this.dateType === LaunchesReportsDateType.HOURS) {
        value = value * 60 * 60
      } else {
        value = value * 60 * 60 * 24
      }

      await AdministratorModel.patchLaunchPreDeadlineValue({ value })

      toast.success(t(TranslationKey['Data saved']))
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error: any) {
      this.setRequestStatus(loadingStatus.SUCCESS)
      console.error(error)
    }
  }

  setRequestStatus(requestStatus: loadingStatus) {
    this.requestStatus = requestStatus
  }
}
