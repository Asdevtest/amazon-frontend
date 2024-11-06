import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'
import { UIEvent } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'

import { AnnouncementsModel } from '@models/announcements-model'
import { UserModel } from '@models/user-model'

import { loadingStatus } from '@typings/enums/loading-status'
import { Specs } from '@typings/enums/specs'
import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { ISpec } from '@typings/shared/spec'
import { HistoryType } from '@typings/types/history'

import { UseProductsPermissions } from '@hooks/use-products-permissions'

import { searchFields, servicesConfig } from './service-exchange-view.config'

export class ServiceExchangeViewModel extends UseProductsPermissions {
  history?: HistoryType
  specOption = Specs.DEFAULT
  viewMode = tableViewMode.LIST
  specs: ISpec[] = []

  get announcements() {
    return this.permissionsData
  }
  get loading() {
    return this.requestStatus === loadingStatus.IS_LOADING
  }

  constructor(history: HistoryType) {
    const requestOptions = {
      sortField: 'updatedAt',
      sortType: 'DESC',
    }
    const getAdditionalProperties = () => {
      const isDefaultSpecType = this.specOption === Specs.DEFAULT

      return {
        ...(!isDefaultSpecType ? { specType: { $eq: this.specOption } } : {}),
      }
    }

    super(AnnouncementsModel.getNotYoursAnnouncements, requestOptions, searchFields, getAdditionalProperties)

    this.permissionsData = []
    this.isCanLoadMore = true
    this.history = history
    this.getPermissionsData()
    this.getSpecs()

    makeObservable(this, servicesConfig)
  }

  async getSpecs() {
    try {
      const response = (await UserModel.getSpecs(false)) as unknown as ISpec[]

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  onScroll = (e: UIEvent<HTMLElement>) => {
    const element = e.target as HTMLElement
    const scrollTop = element?.scrollTop
    const containerHeight = element?.clientHeight
    const contentHeight = element?.scrollHeight

    if (contentHeight - (scrollTop + containerHeight) < 200) {
      this.loadMoreDataHadler()
    }
  }

  onChangeSpec(value: Specs) {
    this.specOption = value

    this.getPermissionsData()
  }

  onClickOrderBtn(data: IAnnoucement) {
    this.history?.push(
      `/client/freelance/my-requests/create-request?announcementId=${data?._id}&executorId=${data?.createdBy?._id}`,
    )
  }

  onChangeViewMode(event: RadioChangeEvent) {
    this.viewMode = event.target.value
  }
}
