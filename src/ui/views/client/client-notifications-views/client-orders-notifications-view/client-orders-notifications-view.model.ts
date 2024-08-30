import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { UserModel } from '@models/user-model'

import { clientOrdersNotificationsViewColumns } from '@components/table/table-columns/client/client-orders-notifications-columns'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'

import { observerConfig } from './observer-config'

export class ClientOrdersNotificationsViewModel extends DataGridTableModel {
  showConfirmModal = false

  constructor() {
    const rowHandlers = {
      onTriggerOpenConfirmModal: (row: IOrder) => this.onTriggerOpenConfirmModal(row),
      onTriggerOpenRejectModal: (row: IOrder) => this.onTriggerOpenRejectModal(row),
    }

    const defaultGetCurrentDataOptions = () => ({
      status: OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE as keyof typeof OrderStatusByKey],
    })

    super({
      getMainDataMethod: ClientModel.getOrders,
      columnsModel: clientOrdersNotificationsViewColumns(rowHandlers),
      tableKey: DataGridTablesKeys.CLIENT_ORDERS_NOTIFICATIONS,
      defaultGetCurrentDataOptions,
      defaultSortModel: [{ field: 'createdAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.initHistory()

    this.getTableSettingsPreset()
  }

  onTriggerOpenConfirmModal(row: IOrder) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
        row.totalPriceChanged - row.totalPrice,
        2,
      )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
      onSubmit: () => this.onClickConfirmOrderPriceChangeBtn(row),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenRejectModal(row: IOrder) {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(TranslationKey['Do you want to cancel?']),
      onSubmit: () => this.onClickRejectOrderPriceChangeBtn(row),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickTableRow(order: IOrder) {
    this.history.push({
      pathname: '/client/my-orders/orders/order',
      search: `orderId=${order._id}`,
    })
  }

  async onClickConfirmOrderPriceChangeBtn(order: IOrder) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.orderConfirmPriceChange(order._id)
      await UserModel.getUsersInfoCounters()
      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }

  async onClickRejectOrderPriceChangeBtn(order: IOrder) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.cancelOrder(order._id)
      await UserModel.getUsersInfoCounters()
      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.SUCCESS)
    }
  }
}
