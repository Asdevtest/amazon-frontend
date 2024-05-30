/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { ProductModel } from '@models/product-model'
import { UserModel } from '@models/user-model'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { IBox } from '@typings/models/boxes/box'
import { IHSCode } from '@typings/shared/hs-code'

import { clientBoxesNotificationsViewColumns } from './client-boxes-notifications-columns'
import { observerConfig } from './observer-config'

export class ClientBoxesNotificationsViewModel extends DataGridTableModel {
  curBox: IBox | null = null
  showBoxViewModal = false

  hsCodeData = {}
  showEditHSCodeModal = false

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

    const defaultGetCurrentDataOptions = () => ({
      status: BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
    })

    super({
      getMainDataMethod: BoxesModel.getBoxesForCurClient,
      columnsModel: clientBoxesNotificationsViewColumns(rowHandlers),
      tableKey: DataGridTablesKeys.CLIENT_BOXES_NOTIFICATIONS,
      defaultGetCurrentDataOptions,
    })

    makeObservable(this, observerConfig)

    this.getDataGridState()
    this.getCurrentData()
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

  async onClickSaveHsCode(hsCode: IHSCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: hsCode._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
    this.getCurrentData()
  }

  async onClickHsCode(id: string) {
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
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

  async onSubmitChangeBoxFields(data: any) {
    try {
      // @ts-ignore
      await onSubmitPostImages.call(this, { images: data.trackNumberFile, type: 'uploadedFiles' })

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles,
        prepId: data.prepId,
        storage: data.storage,
      })

      this.getCurrentData()

      this.onTriggerOpenModal('showBoxViewModal')

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
    }
  }

  async setCurrentOpenedBox(row: IBox) {
    try {
      const box = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = box as IBox
      })

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
