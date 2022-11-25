import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {batchesViewColumns} from '@components/table-columns/batches-columns'

import {clientWarehouseDataConverter, warehouseBatchesDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class WarehouseAwaitingBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  volumeWeightCoefficient = undefined
  nameSearchValue = ''
  batches = []
  boxesData = []

  selectedBatches = []
  curBatch = {}
  showConfirmModal = false
  drawerOpen = false
  isWarning = false
  showBatchInfoModal = false

  showAddOrEditBatchModal = false

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []
  progressValue = 0
  showProgress = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = batchesViewColumns(this.rowHandlers)

  get isInvalidTariffBoxSelected() {
    return this.selectedBatches.some(batchId => {
      const findBatch = this.batches.find(batch => batch._id === batchId)
      return findBatch?.originalData?.boxes.some(box => box.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF)
    })
  }

  get isNeedConfirmPriceBoxSelected() {
    return this.selectedBatches.some(batchId => {
      const findBatch = this.batches.find(batch => batch._id === batchId)
      return findBatch?.originalData?.boxes.some(
        box => box.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
      )
    })
  }

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_AWAITING_BATCHES]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = batchesViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onSelectionModel(model) {
    this.selectedBatches = model
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.batches).filter(
        el =>
          el.originalData.boxes?.some(box =>
            box.items?.some(item => item.product?.asin?.toLowerCase().includes(this.nameSearchValue.toLowerCase())),
          ) ||
          el.originalData.boxes?.some(box =>
            box.items?.some(item =>
              item.product?.amazonTitle?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
            ),
          ),
      )
    } else {
      return toJS(this.batches)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getBatches()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      await StorekeeperModel.updateBoxComment(data._id, {storekeeperComment: data.storekeeperComment})

      await this.loadData()

      this.curBatch = this.batches.find(batch => this.curBatch._id === batch.originalData._id)?.originalData

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey['Data saved successfully']),
      }

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async getBatches() {
    try {
      const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(
          batches.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
          this.volumeWeightCoefficient,
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.batches = []
    }
  }

  async onClickAddOrEditBatch(setting) {
    try {
      if (setting.isAdding) {
        this.selectedBatches = []
      }

      const boxes = await BoxesModel.getBoxesReadyToBatchStorekeeper()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.boxesData = clientWarehouseDataConverter(boxes, this.volumeWeightCoefficient)
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitAddOrEditBatch(boxesIds, filesToAdd, sourceBoxesIds, batchToEdit) {
    try {
      this.uploadedFiles = []

      if (filesToAdd.length) {
        await onSubmitPostImages.call(this, {images: filesToAdd, type: 'uploadedFiles'})
      }

      if (!batchToEdit) {
        const batchId = await BatchesModel.createBatch(boxesIds)

        if (filesToAdd.length) {
          await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)
        }
      } else {
        const newBoxesIds = boxesIds.filter(boxId => !sourceBoxesIds.includes(boxId))
        const boxesToRemoveIds = sourceBoxesIds.filter(boxId => !boxesIds.includes(boxId))

        if (newBoxesIds.length) {
          await BatchesModel.addBoxToBatch(batchToEdit.id, newBoxesIds)
        }
        if (boxesToRemoveIds.length) {
          await BatchesModel.removeBoxFromBatch(batchToEdit.id, boxesToRemoveIds)
        }

        if (filesToAdd.length) {
          await BatchesModel.editAttachedDocuments(
            batchToEdit.id,
            batchToEdit.originalData.attachedDocuments
              ? [...batchToEdit.originalData.attachedDocuments, ...this.uploadedFiles]
              : [...this.uploadedFiles],
          )
        }
      }

      this.loadData()
      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async setCurrentOpenedBatch(row) {
    try {
      this.curBatch = row
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBatchInfoModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async confirmSendToBatch(batchId) {
    try {
      await BatchesModel.confirmSentToBatch(batchId)
    } catch (error) {
      console.log(error)
    }
  }

  async confirmSendToStorekeeper(batchId) {
    try {
      await StorekeeperModel.confirmSendToStorekeeper(batchId)
    } catch (error) {
      console.log(error)
    }
  }

  async onClickConfirmSendToBatchBtn() {
    try {
      for (let i = 0; i < this.selectedBatches.length; i++) {
        const batchId = this.selectedBatches[i]

        const batch = this.batches.find(el => el._id === batchId)

        if (batch.originalData.boxes[0]?.destination?.storekeeper) {
          await this.confirmSendToStorekeeper(batchId)
        } else {
          await this.confirmSendToBatch(batchId)
        }
      }

      this.selectedBatches = []

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
