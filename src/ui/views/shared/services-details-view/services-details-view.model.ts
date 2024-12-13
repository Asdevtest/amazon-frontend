import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AnnouncementsModel } from '@models/announcements-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { ICreatedBy } from '@typings/shared/created-by'
import { HistoryType } from '@typings/types/history'

import { serviceDetailsColumns } from './services-details-view.columns'
import { servicesDetailsViewConfig } from './services-details-view.config'

export class ServiceDetailsViewModel extends DataGridTableModel {
  announcementId?: string
  showReviewModal = false
  currentReviewModalUser?: ICreatedBy

  get rows() {
    return (this.currentData as unknown as IAnnoucement)?.requests || []
  }

  constructor(history: HistoryType) {
    const defaultGetCurrentDataOptions = () => ({
      guid: history.location.search.slice(1),
    })
    const columnsProps = {
      onClickOpenButton: (id: string) => this.onClickOpenBtn(id),
    }
    const columnsModel = serviceDetailsColumns(columnsProps)

    super({
      getMainDataMethod: AnnouncementsModel.getAnnouncementsByGuid,
      columnsModel,
      tableKey: DataGridTablesKeys.SERVICES_DETAILS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      defaultGetCurrentDataOptions,
    })

    this.announcementId = history.location.search.slice(1)
    this.initHistory()
    this.getCurrentData()

    makeObservable(this, servicesDetailsViewConfig)
  }

  async deleteAnnouncementsByGuid() {
    try {
      await AnnouncementsModel.deleteAnnouncementsByGuid(this.announcementId)
      this.history.push(`/freelancer/freelance/my-services`)
    } catch (error) {
      console.error(error)
    }
  }

  onClickOpenBtn(id: string) {
    this.history.push(
      `/freelancer/freelance/my-services/service-detailds/custom-service-type?requestId=${id}&announcementId=${this.announcementId}`,
    )
  }

  onClickEditBtn() {
    this.history.push(`/freelancer/freelance/my-services/service-detailds/edit-service`, {
      requestId: this.announcementId,
    })
  }

  onClickBackBtn() {
    this.history.push(`/freelancer/freelance/my-services`)
  }

  onClickReview(user: ICreatedBy) {
    this.currentReviewModalUser = user
    this.onTriggerOpenModal('showReviewModal')
  }
}
