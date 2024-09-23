import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ParserModel } from '@models/parser-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { parsingRequestsViewColumns } from './parsing-requests-view.columns'
import { ColumnsProps, fieldsForSearch, parsingRequestsViewConfig } from './parsing-requests-view.config'

export class ParsingRequestsViewModel extends DataGridFilterTableModel {
  showProfilesModal = false
  requestId?: string
  profileId?: string
  shopId?: string

  constructor() {
    const columnsProps: ColumnsProps = {
      onOpenProfileModal: (requestId, profileId, shopId) => this.onOpenProfileModal(requestId, profileId, shopId),
      onRejectProfile: id => this.onRejectProfile(id),
    }
    const columnsModel = parsingRequestsViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const mainMethodURL = 'integrations/parser/admins/profiles/receiving_requests?'

    super({
      getMainDataMethod: ParserModel.getRequests,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.PARSING_REQUESTS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, parsingRequestsViewConfig)

    this.getTableSettingsPreset()
  }

  onOpenProfileModal = (requestId: string, profileId: string, shopId: string) => {
    this.requestId = requestId
    this.profileId = profileId
    this.shopId = shopId
    this.onToggleProfileModal()
  }

  onToggleProfileModal = () => {
    this.showProfilesModal = !this.showProfilesModal
  }

  async onApproveProfile(id: string, profileId: string) {
    try {
      await ParserModel.onApproveProfile(id, profileId)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRejectProfile(id: string) {
    try {
      await ParserModel.onRejectProfile(id)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
