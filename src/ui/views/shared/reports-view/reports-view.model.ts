import dayjs, { Dayjs } from 'dayjs'
import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { reportsViewColumns } from './reports-view.columns'
import { additionalFilterFields, additionalSearchFields, reportsViewConfig } from './reports-view.config'

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
    const columnsProps = {
      onToggleReportModalEditMode: (reportId: string) => this.onToggleReportModalEditMode(reportId),
      onRemoveReport: (reportId: string) => this.onRemoveReport(reportId),
      subView,
    }
    const columnsModel = reportsViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel, additionalFilterFields)
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
      fieldsForSearch: additionalSearchFields,
      tableKey: DataGridTablesKeys.PRODUCT_LISTING_REPORTS,
      defaultGetCurrentDataOptions,
    })

    this.sortModel = [{ field: 'createdAt', sort: 'desc' }]
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

  async onRemoveReport(reportId: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.removeListingReport(reportId)

      toast.success(t(TranslationKey['Data removed successfully']))

      this.onGetCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
      toast.error(t(TranslationKey['Data not removed']))
    }
  }

  onGetCurrentData() {
    this.getDataGridState()
    this.getCurrentData()
  }
}
