import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {batchesViewColumns} from '@components/table-columns/batches-columns'

import {warehouseBatchesDataConverter} from '@utils/data-grid-data-converters'
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

  currentData = []
  rowCount = 0

  showAddOrEditBatchModal = false

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []
  progressValue = 0
  showProgress = false

  hsCodeData = {}

  showEditHSCodeModal = false

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
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.batches,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
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

    runInAction(() => {
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
    })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.getBatchesPagMy()
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })

    this.getBatchesPagMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getBatchesPagMy()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBatches = model
    })

    this.getBatchesPagMy()
  }

  getCurrentData() {
    return toJS(this.batches)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      // await this.getBatches()
      await this.getBatchesPagMy()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, {images: data.tmpTrackNumberFile, type: 'uploadedFiles'})
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        storekeeperComment: data.storekeeperComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        upsTrackNumber: data.upsTrackNumber,
      })

      // const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      // await ProductModel.editProductsHsCods(dataToSubmitHsCode)

      await this.loadData()

      runInAction(() => {
        this.curBatch = this.batches.find(batch => this.curBatch._id === batch.originalData._id)?.originalData

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

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })

    this.getBatchesPagMy()
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
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

  // async getBatches() {
  //   try {
  //     const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

  //     const result = await UserModel.getPlatformSettings()

  //     runInAction(() => {
  //       this.volumeWeightCoefficient = result.volumeWeightCoefficient

  //       this.batches = warehouseBatchesDataConverter(
  //         batches.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
  //         this.volumeWeightCoefficient,
  //       )
  //     })
  //   } catch (error) {
  //     console.log(error)
  //     runInAction(() => {
  //       this.error = error

  //       this.batches = []
  //     })
  //   }
  // }

  async getBatchesPagMy() {
    try {
      const filter = isNaN(this.nameSearchValue)
        ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};`
        : `or[0][asin][$contains]=${this.nameSearchValue};or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][humanFriendlyId][$eq]=${this.nameSearchValue};`

      const result = await BatchesModel.getBatchesWithFiltersPag({
        status: BatchStatus.IS_BEING_COLLECTED,
        options: {
          limit: this.rowsPerPage,
          offset: this.curPage * this.rowsPerPage,

          filters: this.nameSearchValue ? filter : null,
          storekeeperId: null,
        },
      })

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.rowCount = result.count

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(
          result.rows.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
          this.volumeWeightCoefficient,
        )
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
        this.batches = []
      })
    }
  }

  async onClickAddOrEditBatch(setting) {
    try {
      runInAction(() => {
        if (setting.isAdding) {
          this.selectedBatches = []
        }
      })

      const boxes = await BoxesModel.getBoxesReadyToBatchStorekeeper()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.boxesData = boxes
        // clientWarehouseDataConverter(
        //   boxes.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
        //   this.volumeWeightCoefficient,
        // )
      })

      this.onTriggerOpenModal('showAddOrEditBatchModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitAddOrEditBatch({boxesIds, filesToAdd, sourceBoxesIds, batchToEdit, batchFields}) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (filesToAdd.length) {
        await onSubmitPostImages.call(this, {images: filesToAdd, type: 'uploadedFiles'})
      }

      if (!batchToEdit) {
        const batchId = await BatchesModel.createBatch({
          title: batchFields.title,
          boxesIds,
          calculationMethod: batchFields.calculationMethod,
          volumeWeightDivide: batchFields.volumeWeightDivide,
        })

        if (filesToAdd.length) {
          await BatchesModel.editAttachedDocuments(batchId.guid, this.uploadedFiles)
        }
      } else {
        const newBoxesIds = boxesIds.filter(boxId => !sourceBoxesIds.includes(boxId))
        const boxesToRemoveIds = sourceBoxesIds.filter(boxId => !boxesIds.includes(boxId))

        await BatchesModel.changeBatch(batchToEdit.id, {
          title: batchFields.title,
          calculationMethod: batchFields.calculationMethod,
          volumeWeightDivide: batchFields.volumeWeightDivide,
        })

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
      runInAction(() => {
        this.error = error
      })
    }
  }

  async setCurrentOpenedBatch(row) {
    try {
      runInAction(() => {
        this.curBatch = row
      })
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBatchInfoModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
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

      runInAction(() => {
        this.selectedBatches = []
      })

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
