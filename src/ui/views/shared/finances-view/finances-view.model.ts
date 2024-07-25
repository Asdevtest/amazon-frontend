import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { EntityType } from '@constants/finances/entity-type'
import { PaymentType } from '@constants/finances/payment-type'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { financesViewColumns } from './finances-view.columns'
import { observerConfig } from './observer-config'

export class FinancesViewModel extends DataGridFilterTableModel {
  paymentType: PaymentType | string = ''
  entityType: EntityType | string = ''

  constructor() {
    const columnsModel = financesViewColumns()

    const additionalPropertiesGetFilters = () => {
      const paymentTypeFilters = this.columnMenuSettings.paymentType.currentFilterData
      const entityTypeFilters = this.columnMenuSettings.entityType.currentFilterData

      return {
        ...(this.paymentType && paymentTypeFilters?.length === 0 ? { paymentType: { $eq: this.paymentType } } : {}),
        ...(this.entityType && entityTypeFilters?.length === 0 ? { entityType: { $eq: this.entityType } } : {}),
      }
    }

    super({
      getMainDataMethod: OtherModel.getFinancesPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['skuByClient', 'amazonTitle']),
      fieldsForSearch: ['asin', 'amazonTitle', 'skuByClient'],
      mainMethodURL: 'other/payments/pag/my?',
      tableKey: DataGridTablesKeys.SHARED_FINANCES,
      additionalPropertiesGetFilters,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'createdAt', sort: 'desc' }]

    this.getDataGridState()

    this.getCurrentData()
  }

  handleSetPaymentType(paymentType: PaymentType | string) {
    this.paymentType = paymentType

    this.getCurrentData()
  }

  handleSetEntityType(entityType: EntityType | string) {
    this.entityType = entityType

    this.getCurrentData()
  }
}
