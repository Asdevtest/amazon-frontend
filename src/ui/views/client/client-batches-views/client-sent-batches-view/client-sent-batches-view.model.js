import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid/data-grid-tables-keys'
import {BatchStatus} from '@constants/statuses/batch-status'
import {BoxStatus} from '@constants/statuses/box-status'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBatchesViewColumns} from '@components/table/table-columns/client/client-batches-columns'

import {warehouseBatchesDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {objectToUrlQs} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ClientSentBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  batches = []
  selectedBatches = []
  curBatch = {}

  currentData = []

  currentStorekeeper = undefined

  storekeepersData = []

  isArchive = false

  drawerOpen = false

  hsCodeData = {}
  showEditHSCodeModal = false

  showBatchInfoModal = false

  showWarningInfoModal = false

  showConfirmModal = false

  languageTag = undefined

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []

  rowCount = 0
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientBatchesViewColumns(this.rowHandlers, this.languageTag)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    // console.log('history', history)
    // console.log('location', location)
    runInAction(() => {
      this.history = history
    })

    if (history.location.state) {
      runInAction(() => {
        this.isArchive = history.location.state.isArchive
      })
    }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => {
        this.languageTag = SettingsModel.languageTag
        this.updateColumnsModel()
      },
    )

    reaction(
      () => this.batches,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BATCHES)
  }

  onTriggerArchive() {
    runInAction(() => {
      this.selectedBatches = []
    })

    this.isArchive
      ? this.history.push('/client/batches/sent-batches', {isArchive: !this.isArchive})
      : this.history.push('/client/batches/sent-batches/archive', {isArchive: !this.isArchive})
  }

  onClickTriggerArchOrResetProducts() {
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: this.isArchive ? false : true,
        confirmTitle: this.isArchive
          ? t(TranslationKey['Return to actual batches'])
          : t(TranslationKey['Move a batch']),
        confirmMessage: this.isArchive
          ? t(TranslationKey['After confirmation, the batch will be moved to the actual batches. Continue?'])
          : t(TranslationKey['After confirmation, the batch will be moved to the archive. Move?']),
        onClickConfirm: () => this.onSubmitTriggerArchOrResetProducts(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchOrResetProducts() {
    try {
      await BatchesModel.editUpdateBatches({
        batchIds: [...this.selectedBatches],
        archive: this.isArchive ? false : true,
      })

      this.onTriggerOpenModal('showConfirmModal')
      await this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BATCHES]

    if (state) {
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = clientBatchesViewColumns(this.rowHandlers, this.languageTag).map(el => ({
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

  getCurrentData() {
    return toJS(this.batches)
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(
        [BoxStatus.IN_BATCH_ON_THE_WAY, BoxStatus.FINISH_PREP_CENTR_USA].join(','),
      )

      runInAction(() => {
        this.storekeepersData = result

        this.currentStorekeeper = this.currentStorekeeper ? this.currentStorekeeper : null // result.filter(storekeeper => storekeeper.boxesCount !== 0).sort((a, b) => a.name?.localeCompare(b.name))[0]
      })

      this.getDataGridState()
    } catch (error) {
      console.log(error)
    }
  }

  onClickStorekeeperBtn(storekeeper) {
    runInAction(() => {
      this.selectedBatches = []

      this.currentStorekeeper = storekeeper ? storekeeper : undefined
    })

    this.getBatchesPagMy()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getStorekeepers()
      this.getDataGridState()
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
        // trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],

        prepId: data.prepId,
      })

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

  async getBatchesPagMy() {
    try {
      // const filter =
      //   isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))
      //     ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][title][$contains]=${this.nameSearchValue};`
      //     : `or[0][asin][$contains]=${this.nameSearchValue};or[1][title][$contains]=${this.nameSearchValue};or[2][humanFriendlyId][$eq]=${this.nameSearchValue};or[3][orderHumanFriendlyId][$eq]=${this.nameSearchValue};`

      const filter = objectToUrlQs({
        or: [
          {asin: {$contains: this.nameSearchValue}},
          {title: {$contains: this.nameSearchValue}},
          {humanFriendlyId: {$eq: this.nameSearchValue}},
          {orderHumanFriendlyId: {$eq: this.nameSearchValue}},
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) &&
              !el.humanFriendlyId &&
              !el.orderHumanFriendlyId) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      // const  [archive][$eq]=${this.isArchive ? 'true' : 'false'}

      const result = await BatchesModel.getBatchesWithFiltersPag({
        status: BatchStatus.HAS_DISPATCHED,
        options: {
          limit: this.rowsPerPage,
          offset: this.curPage * this.rowsPerPage,

          archive: this.isArchive,

          sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
          sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

          filters: this.nameSearchValue ? filter : null,
          storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,
        },
      })

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.rowCount = result.count

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(result.rows, this.volumeWeightCoefficient)
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

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
