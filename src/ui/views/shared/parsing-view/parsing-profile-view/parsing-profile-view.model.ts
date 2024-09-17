import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ParserModel } from '@models/parser-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IParsingProfile } from '@typings/models/parser/parsing-profile'

import { parsingProfileViewColumns } from './parsing-profile-view.columns'
import { ColumnsProps, fieldsForSearch, parsingProfileViewConfig } from './parsing-profile-view.config'

export class ParsingProdileViewModel extends DataGridFilterTableModel {
  selectedProfile?: IParsingProfile
  showToggleProfileModal = false

  constructor() {
    const columnsProps: ColumnsProps = {
      onEditProfileModal: row => this.onEditProfileModal(row),
      onForceStart: ids => this.onForceStart(ids),
      onForceStop: ids => this.onForceStop(ids),
      onParsingProfileRegistred: id => this.onParsingProfileRegistred(id),
    }
    const columnsModel = parsingProfileViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const mainMethodURL = 'integrations/parser/admins/profiles?'

    const operatorsSettings = {
      client: '$any',
      shop: '$any',
    }

    super({
      getMainDataMethod: ParserModel.getProfiles,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch,
      tableKey: DataGridTablesKeys.PARSING_PROFILES,
      operatorsSettings,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, parsingProfileViewConfig)

    this.getTableSettingsPreset()
  }

  onToggleProfileModal() {
    this.showToggleProfileModal = !this.showToggleProfileModal
  }

  onEditProfileModal(row: IParsingProfile) {
    this.selectedProfile = row
    this.onToggleProfileModal()
  }

  onAddProfileModal() {
    this.selectedProfile = undefined
    this.onToggleProfileModal()
  }

  async onForceStart(ids?: string[]) {
    try {
      await ParserModel.onForceStart(ids || this.selectedRows)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onForceStop(ids?: string[]) {
    try {
      await ParserModel.onForceStop(ids || this.selectedRows)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onParsingProfileRegistred(id: string) {
    try {
      await ParserModel.onParsingProfileRegistred(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
