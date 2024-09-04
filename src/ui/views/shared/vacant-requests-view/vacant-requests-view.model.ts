import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { tableSortMode, tableViewMode } from '@constants/table/table-view-modes'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { RequestModel } from '@models/request-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { loadingStatus } from '@typings/enums/loading-status'
import { RequestSubType } from '@typings/enums/request/request-type'
import { Specs } from '@typings/enums/specs'
import { ICustomRequest } from '@typings/models/requests/custom-request'
import { IFullUser } from '@typings/shared/full-user'

import { vacantRequestColumns } from './vacant-request-view.columns'
import { fieldsForSearch, vacantRequestsConfig } from './vacant-requests-view.config'
import { ColumnsProps } from './vacant-requests-view.type'

export class VacantRequestsViewModel extends DataGridFilterTableModel {
  specOption = Specs.DEFAULT
  showRequestDetailModal = false
  currentRequestDetails?: ICustomRequest
  searchMyRequestsIds = []
  viewMode = tableViewMode.TABLE
  sortMode = tableSortMode.DESK

  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }

  constructor() {
    const columnsProps: ColumnsProps = {
      onClickViewMore: id => this.onClickViewMore(id),
      onClickOpenInNewTab: id => this.onClickOpenInNewTab(id),
    }
    const columnsModel = vacantRequestColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const defaultGetCurrentDataOptions = () => ({
      kind: RequestSubType.VACANT,
    })
    const additionalPropertiesGetFilters = () => {
      const isDefaultSpecType = this.specOption === Specs.DEFAULT

      return {
        ...(!isDefaultSpecType ? { specType: { $eq: this.specOption } } : {}),
      }
    }
    const operatorsSettings = {
      proposalSub: '$any',
    }

    super({
      getMainDataMethod: RequestModel.getRequests,
      columnsModel,
      filtersFields,
      mainMethodURL: `requests?kind=${RequestSubType.VACANT}&`,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.FREELANCER_VACANT_REQUESTS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
      operatorsSettings,
      defaultGetCurrentDataOptions,
      additionalPropertiesGetFilters,
    })
    makeObservable(this, vacantRequestsConfig)

    this.initHistory()
    this.getTableSettingsPreset()
  }

  onChangeSpec(value: Specs) {
    this.specOption = value

    this.getCurrentData()
  }

  onClickViewMore(id: string) {
    const win = window.open(
      `/${
        UserRoleCodeMapForRoutes[this.userInfo?.role]
      }/freelance/vacant-requests/custom-search-request?request-id=${id}`,
      '_blank',
    )

    win?.focus()
  }

  async getRequestDetail(id: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const response = (await RequestModel.getCustomRequestById(id)) as unknown as ICustomRequest

      runInAction(() => {
        this.currentRequestDetails = response
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onOpenRequestDetailModal(id: string) {
    await this.getRequestDetail(id)

    this.onTriggerOpenModal('showRequestDetailModal')
  }

  onClickSuggest() {
    this.history.push(
      `/${
        UserRoleCodeMapForRoutes[this.userInfo?.role]
      }/freelance/vacant-requests/custom-search-request/create-proposal?requestId=${
        this.currentRequestDetails?.request?._id
      }`,
    )
  }

  onClickOpenInNewTab(id: string) {
    const win = window.open(
      `${window.location.origin}/${
        UserRoleCodeMapForRoutes[this.userInfo?.role]
      }/freelance/vacant-requests/custom-search-request?request-id=${id}`,
      '_blank',
    )

    win?.focus()
  }
}
