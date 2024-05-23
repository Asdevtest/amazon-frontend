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
  get product() {
    return this.meta?.product
  }
  get activeLaunches() {
    return this.meta?.activeLaunches
  }

  constructor(productId: string) {
    const rowHandlers = {}
    const columnsModel = reportsViewColumns(rowHandlers)
    const filtersFields = getFilterFields(columnsModel, ['sub'])
    const mainMethodURL = `clients/products/listing_reports_by_product_id/${productId}?`
    const defaultGetCurrentDataOptions = () => ({
      guid: productId,
    })

    super({
      getMainDataMethod: ClientModel.getListingReportById,
      columnsModel,
      filtersFields,
      mainMethodURL,
      tableKey: DataGridTablesKeys.PRODUCT_LISTING_REPORTS,
      defaultGetCurrentDataOptions,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, reportsViewConfig)
  }

  onDateRangePickerClick(value: DateRange<Dayjs>) {
    const transformedValue = [value?.[0]?.toISOString(), value?.[1]?.toISOString()]
    this.onChangeFullFieldMenuItem(transformedValue, 'createdAt')
    this.getCurrentData()
  }
}
