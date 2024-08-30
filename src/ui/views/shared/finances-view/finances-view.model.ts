import { RadioChangeEvent } from 'antd'
import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { EntityType } from '@constants/finances/entity-type'
import { PaymentType } from '@constants/finances/payment-type'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { financesViewColumns } from './finances-view.columns'
import { observerConfig } from './finances.config'

export class FinancesViewModel extends DataGridFilterTableModel {
  paymentType: PaymentType | string = ''
  entityType: EntityType | string = ''

  get userRole() {
    // @ts-ignore
    return UserModel?.userInfo?.role
  }

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
      defaultSortModel: [{ field: 'createdAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  onSetPaymentType(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.paymentType = currentValue

    this.getCurrentData()
  }

  onSetEntityType(event: RadioChangeEvent) {
    const currentValue = event.target.value
    this.entityType = currentValue

    this.getCurrentData()
  }
}
