import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { clientBoxesReadyToBatchViewColumns } from '@components/table/table-columns/client/client-boxes-ready-to-batch-columns'

import { clientWarehouseDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

export class ClientReadyBoxesViewModel {
  requestStatus = undefined

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

  uploadedFiles = []

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = clientBoxesReadyToBatchViewColumns(this.storekeepersData)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.currentStorekeeper,
      () => this.getClientDestinations(),
    )
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.selectedBoxes = []

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

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onSelectionModel(model) {
    if (model.length === this.boxesMy.length) {
      this.selectedBoxes = model.slice(
        this.curPage * this.rowsPerPage,
        this.curPage * this.rowsPerPage + this.rowsPerPage,
      )
    } else {
      this.selectedBoxes = model
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.selectedBoxes = []

    this.setDataGridState()
  }

  get currentData() {
    if (this.nameSearchValue) {
      return this.boxesMy.filter(
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
      return this.boxesMy
    }
  }

  onClickStorekeeperBtn(storekeeper) {
    this.selectedBoxes = []
    this.currentStorekeeper = storekeeper ? storekeeper : undefined

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
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()
      await this.getStorekeepers()

      this.getBoxesMy()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
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
        // storage: data.storage,
      })

      this.loadData()

      toast.success(t(TranslationKey['Data saved successfully']))
    } catch (error) {
      console.error(error)
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

      runInAction(() => {
        this.curBox = box
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
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
      console.error(error)

      this.onTriggerOpenModal('showConfirmModal')

      toast.error(t(TranslationKey.Error))
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

      runInAction(() => {
        this.baseBoxesMy = result

        this.boxesMy = clientWarehouseDataConverter(result, this.platformSettings?.volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.boxesMy = []
      })
    }
  }
}
