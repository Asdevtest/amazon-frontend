import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { clientBoxesReadyToBatchViewColumns } from '@components/table/table-columns/client/client-boxes-ready-to-batch-columns'

import { clientWarehouseDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class ClientReadyBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  boxesMy = []
  curBox = undefined

  selectedBoxes = []
  currentStorekeeper = undefined
  storekeepersData = []
  clientDestinations = []

  baseBoxesMy = []

  curDestination = undefined

  hsCodeData = {}

  showEditHSCodeModal = false

  showBoxViewModal = false
  showConfirmModal = false
  showWarningInfoModal = false

  uploadedFiles = []

  currentData = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = clientBoxesReadyToBatchViewColumns(this.storekeepersData)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.currentStorekeeper,
      () => this.getClientDestinations(),
    )

    reaction(
      () => this.boxesMy,
      () => {
        runInAction(() => {
          this.currentData = [...this.getCurrentData()].slice()
        })
      },
    )
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
      this.selectedBoxes = []
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

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onSelectionModel(model) {
    if (model.length === this.boxesMy.length) {
      runInAction(() => {
        this.selectedBoxes = model.slice(
          this.curPage * this.rowsPerPage,
          this.curPage * this.rowsPerPage + this.rowsPerPage,
        )
      })
    } else {
      runInAction(() => {
        this.selectedBoxes = model
      })
    }
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
      this.selectedBoxes = []
    })

    this.setDataGridState()
  }

  // getCurrentData() {
  //   return toJS(this.boxesMy)
  // }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.boxesMy).filter(
        el =>
          el.originalData.items.some(item =>
            item.product?.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el.originalData.items.some(item =>
            item.product?.skuByClient?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ) ||
          el.originalData.items.some(item =>
            item.product?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
          ),
      )
    } else {
      return toJS(this.boxesMy)
    }
  }

  onClickStorekeeperBtn(storekeeper) {
    runInAction(() => {
      this.selectedBoxes = []
      this.currentStorekeeper = storekeeper ? storekeeper : undefined
    })

    this.getBoxesMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.REQUESTED_SEND_TO_BATCH)

      runInAction(() => {
        this.storekeepersData = result
          .filter(storekeeper => storekeeper.boxesCount !== 0)
          .sort((a, b) => a.name.localeCompare(b.name))

        this.currentStorekeeper = this.storekeepersData[0]
        this.selectedBoxes = []
      })

      // this.onClickStorekeeperBtn(this.storekeepersData[0])
    } catch (error) {
      console.log(error)
    }
  }

  onClickDestinationBtn(destination) {
    this.curDestination = destination ? destination : undefined
    this.getBoxesMy()
  }

  async getClientDestinations() {
    try {
      const clientDestinations = await ClientModel.getClientDestinations({
        status: BoxStatus.REQUESTED_SEND_TO_BATCH,
        storekeeperId: this.currentStorekeeper ? this.currentStorekeeper._id : null,
      })

      runInAction(() => {
        this.clientDestinations = clientDestinations
      })
      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.getDataGridState()
      await this.getStorekeepers()

      this.getBoxesMy()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  async returnBoxesToStock() {
    try {
      await ClientModel.returnBoxFromBatch(this.selectedBoxes.map(boxId => ({ boxId })))
      runInAction(() => {
        this.selectedBoxes = []
      })

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })

      this.onTriggerOpenModal('showConfirmModal')

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey.Error),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxesForCurClient({
        status: `${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE},${BoxStatus.NEED_TO_UPDATE_THE_TARIFF}`,
        storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,
        destinationId: this.curDestination && this.curDestination._id,
        hasBatch: false,
      })

      const volumeWeightCoefficient = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.baseBoxesMy = result

        this.boxesMy = clientWarehouseDataConverter(result, volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error

        this.boxesMy = []
      })
    }
  }
}
