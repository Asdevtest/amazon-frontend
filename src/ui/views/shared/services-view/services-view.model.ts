import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { tableViewMode } from '@constants/table/table-view-modes'

import { AnnouncementsModel } from '@models/announcements-model'
import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { UserModel } from '@models/user-model'

import { createFilterCondition, getFilterOptions } from '@components/shared/cards-filter/cards-filter.config'

import { Specs } from '@typings/enums/specs'
import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { ISpec } from '@typings/shared/spec'
import { HistoryType } from '@typings/types/history'

import { searchFields, servicesConfig } from './services-view.config'

export class ServicesViewModel extends InfiniteScrollModel<IAnnoucement> {
  history?: HistoryType
  specOption = Specs.DEFAULT
  viewMode = tableViewMode.LIST
  archive = false
  specs: ISpec[] = []
  isClient = false

  get announcements() {
    return this.data
  }

  constructor(history: HistoryType, isClient: boolean) {
    const method = isClient ? AnnouncementsModel.getNotYoursAnnouncements : AnnouncementsModel.getMyAnnouncements

    super({ method, searchFields })

    this.history = history
    this.isClient = isClient
    this.getData()
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

  onClickCreateService() {
    this.history?.push(`/freelancer/freelance/my-services/create-service`)
  }

  onClickCard(data: IAnnoucement) {
    this.isClient
      ? this.history?.push(
          `/client/freelance/my-requests/create-request?announcementId=${data?._id}&executorId=${data?.createdBy?._id}`,
        )
      : this.history?.push(`/freelancer/freelance/my-services/service-detailds?${data._id}`)
  }

  onChangeSpec(value: Specs) {
    this.specOption = value

    const filterOptionsArray = [createFilterCondition('specType', '$eq', value)]
    const filterOptions = getFilterOptions(filterOptionsArray)

    this.onFilterSubmit(filterOptions)
  }

  onToggleArchive() {
    this.archive = !this.archive

    const filterOptionsArray = [createFilterCondition('archive', '$eq', this.archive)]
    const filterOptions = getFilterOptions(filterOptionsArray)

    this.onFilterSubmit(filterOptions)
  }

  onChangeViewMode(event: RadioChangeEvent) {
    this.viewMode = event.target.value
  }
}
