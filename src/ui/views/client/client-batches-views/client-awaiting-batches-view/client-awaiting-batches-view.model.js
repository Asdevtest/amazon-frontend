import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BatchStatus} from '@constants/batch-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {clientBatchesViewColumns} from '@components/table-columns/client/client-batches-columns'

import {clientBatchesDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ClientAwaitingBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  batches = []
  selectedBatches = []
  curBatch = {}

  currentData = []

  uploadedFiles = []

  drawerOpen = false

  showBatchInfoModal = false
  showConfirmModal = false

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientBatchesViewColumns(this.rowHandlers)

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
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_AWAITING_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_AWAITING_BATCHES]

    if (state) {
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = clientBatchesViewColumns(this.rowHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
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
      this.uploadedFiles = []

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, {images: data.tmpTrackNumberFile, type: 'uploadedFiles'})
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
      })

      const dataToSubmitHsCode = data.items.map(el => ({productId: el.product._id, hsCode: el.product.hsCode}))
      await ProductModel.editProductsHsCods(dataToSubmitHsCode)

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

  // async getBatches() {
  //   try {
  //     const batches = await BatchesModel.getBatches(BatchStatus.IS_BEING_COLLECTED)

  //     const result = await UserModel.getPlatformSettings()

  //     runInAction(() => {
  //       this.volumeWeightCoefficient = result.volumeWeightCoefficient

  //       this.batches = clientBatchesDataConverter(
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

        this.batches = clientBatchesDataConverter(
          result.rows.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt')),
          this.volumeWeightCoefficient,
        )
      })
    } catch (error) {
      runInAction(() => {
        this.batches = []
      })
      console.log(error)
    }
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getBatchesPagMy()
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

  async removeBoxFromBatch(batch) {
    try {
      const boxesToRemoveIds = batch.boxes.map(box => box._id)

      await BatchesModel.removeBoxFromBatch(batch._id, boxesToRemoveIds)
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickCancelSendToBatchBtn() {
    try {
      const batches = this.batches.filter(el => this.selectedBatches.includes(el._id))

      for (let i = 0; i < batches.length; i++) {
        const batch = batches[i].originalData

        await this.removeBoxFromBatch(batch)
      }

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
