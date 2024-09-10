/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { clientBoxesNotificationsViewColumns } from './client-boxes-notifications-columns'
import { observerConfig } from './observer-config'

export class ClientBoxesNotificationsViewModel extends DataGridFilterTableModel {
  curBox: string = ''
  showBoxViewModal = false

  boxes = []
  showConfirmModal = false

  uploadedFiles = []

  get userInfo() {
    return UserModel.userInfo
  }

  constructor() {
    const rowHandlers = {
      onTriggerOpenConfirmModal: (row: IBox) => this.onTriggerOpenConfirmModal(row),
      onTriggerOpenRejectModal: (row: IBox) => this.onTriggerOpenRejectModal(row),
    }

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: 'notified',
      },
    })

    const columnsModel = clientBoxesNotificationsViewColumns(rowHandlers)

    super({
      getMainDataMethod: BoxesModel.getBoxesForCurClientLightPag,
      columnsModel,
      tableKey: DataGridTablesKeys.CLIENT_BOXES_NOTIFICATIONS,
      filtersFields: getFilterFields(columnsModel),
      mainMethodURL: 'boxes/pag/clients_light?',
      defaultFilterParams,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  onTriggerOpenConfirmModal(row: IBox) {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
        row.deliveryTotalPriceChanged - row.deliveryTotalPrice,
        2,
      )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
      onSubmit: () => this.onClickConfirmOrderPriceChangeBtn(row),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenRejectModal(row: IBox) {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(
        TranslationKey[
          'Do you want to cancel the extra fare payment? The selected boxes will be returned to the warehouse'
        ],
      ),
      onSubmit: () => this.onClickRejectOrderPriceChangeBtn([{ boxId: row._id }]),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  setCurrentOpenedBox(row: IBox) {
    try {
      this.curBox = row._id

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmOrderPriceChangeBtn(box: IBox) {
    try {
      await ClientModel.boxConfirmPriceChange([{ boxId: box._id }])

      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickRejectOrderPriceChangeBtn(data: any) {
    try {
      await ClientModel.returnBoxFromBatch(data)
      this.onTriggerOpenModal('showConfirmModal')
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async handleRejectFewBoxes() {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(
        TranslationKey[
          'Do you want to cancel the extra fare payment? The selected boxes will be returned to the warehouse'
        ],
      ),
      onSubmit: () => this.onClickRejectOrderPriceChangeBtn(this.selectedRows?.map(id => ({ boxId: id }))),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async handleChangePriceFewBoxes() {
    const rows = this.selectedRows.map(id => this.currentData.find(box => box._id === id))

    const priceToChange = rows.reduce((acc, row) => {
      return (acc += row.deliveryTotalPriceChanged - row.deliveryTotalPrice)
    }, 0)

    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(priceToChange, 2)} ${t(
        TranslationKey['Do you confirm the extra payment?'],
      )}`,
      onSubmit: () => this.handleSaveChangePrice(rows),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async handleSaveChangePrice(rows: IBox[]) {
    const body = rows.map(row => ({
      boxId: row._id,
    }))

    await ClientModel.boxConfirmPriceChange(body)

    this.onTriggerOpenModal('showConfirmModal')
    this.getCurrentData()
  }
}
