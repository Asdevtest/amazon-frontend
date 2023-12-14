import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
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

export class ClientBoxesNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  curBox = undefined
  showBoxViewModal = false

  hsCodeData = {}
  showEditHSCodeModal = false

  boxes = []
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
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
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

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onTriggerOpenConfirmModal(row) {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: false,
        message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
          row.deliveryTotalPriceChanged - row.deliveryTotalPrice,
          2,
        )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
        onClickOkBtn: () => this.onClickConfirmOrderPriceChangeBtn(row),
      }
    })
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
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        message: t(TranslationKey['Do you want to cancel?']),
        onClickOkBtn: () => this.onClickRejectOrderPriceChangeBtn(row),
      }
    })
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedRowIds = model
    })
  }

  getCurrentData() {
    return toJS(this.boxes)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getDataGridState()
      await this.getBoxes()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      this.uploadedFiles = []

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, { images: data.tmpTrackNumberFile, type: 'uploadedFiles' })
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        // trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],

        prepId: data.prepId,
      })

      // const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      // await ProductModel.editProductsHsCods(dataToSubmitHsCode)

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
      console.log(error)
    }
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesForCurClient({
        status: BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
      })

      const volumeWeightCoefficient = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxes = clientWarehouseDataConverter(result, volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
        this.boxes = []
      })
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      const box = await BoxesModel.getBoxById(row._id)
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.curBox = box
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickConfirmOrderPriceChangeBtn(box) {
    try {
      await ClientModel.boxConfirmPriceChange(box._id)

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

  setLoadingStatus(loadingStatus) {
    runInAction(() => {
      this.loadingStatus = loadingStatus
    })
  }
}
