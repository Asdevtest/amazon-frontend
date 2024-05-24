import { makeObservable } from 'mobx'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'

import { reportModalColumns } from './report-modal.columns'
import { reportModalConfig } from './report-modal.config'

export class ReportModalModel extends DataGridTableModel {
  editMode = false

  constructor() {
    const columns = reportModalColumns()

    super({
      getMainDataMethod: ClientModel.getListingReportById,
      columnsModel: columns,
    })

    makeObservable(this, reportModalConfig)
  }
}
