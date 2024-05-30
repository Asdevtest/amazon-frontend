import { Dayjs } from 'dayjs'
import { makeObservable } from 'mobx'

import { DateRange } from '@mui/x-date-pickers-pro'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { reportsViewColumns } from './reports-view.columns'
import { reportsViewConfig } from './reports-view.config'

export class ReportsViewModel extends DataGridFilterTableModel {
  reportId?: string = undefined
  showReportModal = false
  reportModalEditMode = false

  get product() {
    return this.meta?.product
  }
  get activeLaunches() {
    return this.meta?.activeLaunches
  }

  constructor(productId: string) {
    const rowHandlers = {
      onToggleReportModalEditMode: (reportId: string) => this.onToggleReportModalEditMode(reportId),
    }
    const columnsModel = reportsViewColumns(rowHandlers)
    const filtersFields = getFilterFields(columnsModel, ['sub'])
    const mainMethodURL = `clients/products/listing_reports_by_product_id/${productId}?`
    const defaultGetCurrentDataOptions = () => ({
      guid: productId,
    })

    super({
      getMainDataMethod: ClientModel.getListingReportByProductId,
      columnsModel,
      filtersFields,
      mainMethodURL,
      tableKey: DataGridTablesKeys.PRODUCT_LISTING_REPORTS,
      defaultGetCurrentDataOptions,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.onGetCurrentData()

    makeObservable(this, reportsViewConfig)
  }

  onDateRangePickerClick(value: DateRange<Dayjs>) {
    const transformedValue = [value?.[0]?.toISOString(), value?.[1]?.toISOString()]
    this.onChangeFullFieldMenuItem(transformedValue, 'createdAt')
    this.onGetCurrentData()
  }

  onToggleReportModal() {
    this.reportId = undefined
    this.reportModalEditMode = false
    this.showReportModal = !this.showReportModal
  }

  onToggleReportModalEditMode(reportId: string) {
    this.reportId = reportId
    this.reportModalEditMode = true
    this.showReportModal = !this.showReportModal
  }

  onGetCurrentData() {
    this.getDataGridState()
    this.getCurrentData()
  }
}
