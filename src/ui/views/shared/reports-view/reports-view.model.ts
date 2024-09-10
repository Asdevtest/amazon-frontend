import { Dayjs } from 'dayjs'
import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { ReportsViewProps } from './reports-view-copy.types'
import { reportsViewColumns } from './reports-view.columns'
import { additionalFilterFields, additionalSearchFields, reportsViewConfig } from './reports-view.config'

export class ReportsViewModel extends DataGridFilterTableModel {
  reportId?: string
  showReportModal = false

  get product() {
    return this.meta?.product
  }
  get activeLaunches() {
    return this.meta?.activeLaunches
  }

  constructor({ productId, subView = false }: ReportsViewProps) {
    const columnsProps = {
      onToggleReportModalEditMode: (reportId: string) => this.onToggleReportModalEditMode(reportId),
      onClickRemoveReport: (reportId: string) => this.onRemoveReport(reportId),
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
    const operatorsSettings = {
      launchDateFrom: '$gte',
      launchDateTo: '$lte',
    }
    super({
      getMainDataMethod: subView ? ClientModel.getListingReports : ClientModel.getListingReportByProductId,
      columnsModel,
      filtersFields,
      mainMethodURL,
      fieldsForSearch: additionalSearchFields,
      tableKey: DataGridTablesKeys.PRODUCT_LISTING_REPORTS,
      defaultGetCurrentDataOptions,
      operatorsSettings,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    this.getTableSettingsPreset()

    makeObservable(this, reportsViewConfig)
  }

  onChangeRangeDate(dates: null | (Dayjs | null)[]) {
    if (dates?.[0] && dates?.[1]) {
      const lteDateValueForBackendPostgreSQL = dates?.[1].add(1, 'day')
      const launchDateFrom = [getDateWithoutTime(dates?.[0])]
      const launchDateTo = [getDateWithoutTime(lteDateValueForBackendPostgreSQL)]
      this.onChangeFullFieldMenuItem(launchDateFrom, 'launchDateFrom')
      this.onChangeFullFieldMenuItem(launchDateTo, 'launchDateTo')
      this.getCurrentData()
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

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
      toast.error(t(TranslationKey['Data not removed']))
    }
  }
}
