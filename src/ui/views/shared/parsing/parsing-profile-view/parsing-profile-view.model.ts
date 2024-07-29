import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ParserModel } from '@models/parser-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { parsingProdileViewColumns } from './parsing-profile-view.columns'
import { ColumnsProps, additionalSearchFields, parsingProdileViewConfig } from './parsing-profile-view.config'

export class ParsingProdileViewModel extends DataGridFilterTableModel {
  editProfile?: IParsingProfile
  showToggleProfileModal = false

  constructor() {
    const columnsProps: ColumnsProps = {
      onEditProfileModal: row => this.onEditProfileModal(row),
    }
    const columnsModel = parsingProdileViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const mainMethodURL = 'integrations/parser/admins/profiles?'

    super({
      getMainDataMethod: ParserModel.getProfiles,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: additionalSearchFields,
      tableKey: DataGridTablesKeys.PARSING_PROFILES,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, parsingProdileViewConfig)
  }

  onToggleProfileModal() {
    this.showToggleProfileModal = !this.showToggleProfileModal
  }

  onEditProfileModal(row: IParsingProfile) {
    this.editProfile = row
    this.onToggleProfileModal()
  }

  onAddProfileModal() {
    this.editProfile = undefined
    this.onToggleProfileModal()
  }
}
