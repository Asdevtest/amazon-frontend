import dayjs, { Dayjs } from 'dayjs'
import { makeObservable } from 'mobx'

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

  onChangeRangeDate(dates: null | (Dayjs | null)[]) {
    if (dates?.[0] && dates?.[1]) {
      const transformedDatesToISOString = [dayjs(dates?.[0]).toISOString(), dayjs(dates?.[1]).toISOString()]
      this.onChangeFullFieldMenuItem(transformedDatesToISOString, 'createdAt')
      this.onGetCurrentData()
    }

    this.onClickResetFilters()
  }

  onToggleReportModal() {
    this.reportId = undefined
    this.reportModalEditMode = false
    this.showReportModal = !this.showReportModal
  }

  onToggleReportModalEditMode(reportId?: string) {
    this.reportId = reportId
    this.reportModalEditMode = true
    this.showReportModal = !this.showReportModal
  }

  onToggleReportModalViewMode(reportId?: string) {
    this.reportId = reportId
    this.reportModalEditMode = false
    this.showReportModal = !this.showReportModal
  }

  onGetCurrentData() {
    this.getDataGridState()
    this.getCurrentData()
  }
}
