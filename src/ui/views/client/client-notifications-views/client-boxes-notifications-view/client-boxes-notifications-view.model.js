import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { clientBoxesNotificationsViewColumns } from '@components/table/table-columns/client/client-boxes-notifications-columns'

import { clientWarehouseDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

export class ClientBoxesNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  loadingStatus = undefined

  curBox = undefined
  showBoxViewModal = false

  hsCodeData = {}
  showEditHSCodeModal = false

  boxes = []
  selectedRowIds = []
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    onClickOkBtn: () => this.onSaveProductData(),
  }

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []

  sortModel = []

  filterModel = { items: [] }
  densityModel = 'compact'
  rowHandlers = {
    onTriggerOpenConfirmModal: row => this.onTriggerOpenConfirmModal(row),
    onTriggerOpenRejectModal: row => this.onTriggerOpenRejectModal(row),
  }
  columnsModel = clientBoxesNotificationsViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BOXES_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BOXES_NOTIFICATIONS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onTriggerOpenConfirmModal(row) {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
        row.deliveryTotalPriceChanged - row.deliveryTotalPrice,
        2,
      )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
      onClickOkBtn: () => this.onClickConfirmOrderPriceChangeBtn(row),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickSaveHsCode(hsCode) {
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
    this.loadData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onClickHsCode(id) {
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  onTriggerOpenRejectModal(row) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Do you want to cancel?']),
      onClickOkBtn: () => this.onClickRejectOrderPriceChangeBtn(row),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  get currentData() {
    return this.boxes
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      this.getDataGridState()
      await this.getBoxes()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
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

      this.loadData()

      this.onTriggerOpenModal('showBoxViewModal')
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesForCurClient({
        status: BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
      })

      runInAction(() => {
        this.boxes = clientWarehouseDataConverter(result, this.platformSettings?.volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.boxes = []
      })
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)

      runInAction(() => {
        this.curBox = box
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickConfirmOrderPriceChangeBtn(box) {
    try {
      await ClientModel.boxConfirmPriceChange([{ boxId: box._id }])

      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
    } catch (error) {
      console.warn(error)
    }
  }

  async onClickRejectOrderPriceChangeBtn(box) {
    try {
      await ClientModel.returnBoxFromBatch([{ boxId: box._id }])
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
    } catch (error) {
      console.warn(error)
    }
  }

  async handleChangePriceFewBoxes() {
    const rows = this.selectedRowIds.map(id => this.boxes.find(box => box._id === id))

    const priceToChange = rows.reduce((acc, row) => {
      return (acc += row.deliveryTotalPriceChanged - row.deliveryTotalPrice)
    }, 0)

    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(priceToChange, 2)} ${t(
        TranslationKey['Do you confirm the extra payment?'],
      )}`,
      onClickOkBtn: () => this.handleSaveChangePrice(rows),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async handleSaveChangePrice(rows) {
    const body = rows.map(row => ({
      boxId: row._id,
    }))

    await ClientModel.boxConfirmPriceChange(body)

    this.onTriggerOpenModal('showConfirmModal')
    this.loadData()
  }

  setLoadingStatus(loadingStatus) {
    this.loadingStatus = loadingStatus
  }
}
