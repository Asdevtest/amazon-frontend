import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { makeAutoObservable, runInAction } from 'mobx'
import { ChangeEvent } from 'react'

import { AdministratorModel } from '@models/administrator-model'

import { TimeParts } from '@typings/enums/date'
import { IAdminSettings } from '@typings/models/administrators/settings'
import { ITechPause } from '@typings/models/administrators/tech-pause'

import { DEFAULT_NOTICE_MESSAGE, timeToMilliseconds } from './shutdown.config'

export class ShutdownModel {
  serverEnabled = false
  shutdownDelayChecked = false
  noticeMessage = DEFAULT_NOTICE_MESSAGE
  timePart: TimeParts = TimeParts.MINUTES
  timePartValue = 0

  get disabledSendButton() {
    return !this.shutdownDelayChecked || this.noticeMessage.trim().length === 0 || this.timePartValue === 0
  }

  constructor(techPause: ITechPause) {
    this.serverEnabled = techPause?.value === 0
    this.noticeMessage = techPause?.body?.message

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async onToggleServer() {
    try {
      if (this.shutdownDelayChecked) {
        const turn = 'off'
        const convertedPartValueToMilliseconds = this.timePartValue * timeToMilliseconds[this.timePart]
        const data = {
          countdown: convertedPartValueToMilliseconds,
          message: this.noticeMessage,
        }

        await AdministratorModel.toggleServer(turn, data)

        this.getAdminSettings()
      } else {
        const response = await AdministratorModel.toggleServer()

        runInAction(() => (this.serverEnabled = response.tech_pause === 0))
      }
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.timePartValue = 0
      })
    }
  }

  async getAdminSettings() {
    try {
      const response = (await AdministratorModel.getSettings()) as unknown as IAdminSettings

      runInAction(() => {
        this.noticeMessage = response?.dynamicSettings?.techPause?.body?.message
      })
    } catch (error) {
      console.error(error)
    }
  }

  onChangeShutdownDelay(e: CheckboxChangeEvent) {
    this.shutdownDelayChecked = e.target.checked
  }

  onChangeNoticeMessage(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    this.noticeMessage = e.target.value
  }

  onChangeTimePart(value: TimeParts) {
    this.timePart = value
  }

  onChangeTimePartValue(value: number | string | null) {
    this.timePartValue = Number(value)
  }
}
