import dayjs, { Dayjs } from 'dayjs'
import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { reportsViewColumns } from './reports-view.columns'
import { additionalFields, reportsViewConfig } from './reports-view.config'

export class ReportsViewModel extends DataGridFilterTableModel {
  reportId?: string = undefined
  showReportModal = false

  get product() {
    return this.meta?.product
  }
  get activeLaunches() {
    return this.meta?.activeLaunches
  }

  constructor({ productId, subView = false }: { productId: string; subView?: boolean }) {
    const rowHandlers = {
      onToggleReportModalEditMode: (reportId: string) => this.onToggleReportModalEditMode(reportId),
    }
    const columnsModel = reportsViewColumns(rowHandlers)
    const filtersFields = getFilterFields(columnsModel, ['sub'])
    const mainMethodURL = subView
      ? 'clients/products/listing_reports?'
      : `clients/products/listing_reports_by_product_id/${productId}?`
    const defaultGetCurrentDataOptions = () =>
      subView
        ? undefined
        : {
            guid: productId,
          }

    super({
      getMainDataMethod: subView ? ClientModel.getListingReports : ClientModel.getListingReportByProductId,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: additionalFields,
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
    } else {
      this.onClickResetFilters()
    }
  }

  onToggleReportModal() {
    this.reportId = undefined
    this.showReportModal = !this.showReportModal
  }

  onToggleReportModalEditMode(reportId?: string) {
    this.reportId = reportId
    this.showReportModal = !this.showReportModal
  }

  onGetCurrentData() {
    this.getDataGridState()
    this.getCurrentData()
  }
}
