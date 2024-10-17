import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ShopModel } from '@models/shop-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { feedbackViewColumns } from './feedback-view.columns'
import { ColumnProps, feedbackViewConfig, fieldsForSearch } from './feedback-view.config'

export class FeedbackViewModel extends DataGridFilterTableModel {
  ticket?: any
  showContentEditorForm = false
  showTicketForm = false

  get contentEditorFormTitle() {
    return this.ticket ? `Edit ticket` : 'Create ticket'
  }

  constructor() {
    const columnsProps: ColumnProps = {
      onToggleTicketForm: () => this.onToggleTicketForm(),
      onRemoveTicket: id => this.onRemoveTicket(id),
    }
    const columnsModel = feedbackViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)

    super({
      getMainDataMethod: ShopModel.getShopsWithProfiles,
      columnsModel,
      filtersFields,
      mainMethodURL: '',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.FEEDBACK,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, feedbackViewConfig)
    this.getTableSettingsPreset()
  }

  onToggleContentEditorForm = () => {
    this.showContentEditorForm = !this.showContentEditorForm
  }

  onToggleTicketForm = (ticket?: any) => {
    if (ticket) {
      this.ticket = ticket
    }

    this.showTicketForm = !this.showTicketForm
  }

  onRemoveTicket = (id: string) => {
    try {
      console.log(id)
    } catch (error) {
      console.error(error)
    }
  }
}
