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

import {batchesViewColumns} from '@components/table-columns/batches-columns'

import {warehouseBatchesDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {objectToUrlQs} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class WarehouseSentBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  nameSearchValue = ''
  batches = []
  selectedBatches = []
  volumeWeightCoefficient = undefined

  hsCodeData = {}

  showEditHSCodeModal = false

  rowCount = 0
  currentData = []

  curBatch = {}
  showConfirmModal = false
  drawerOpen = false
  isWarning = false
  showBatchInfoModal = false

  showWarningInfoModal = false

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = batchesViewColumns(this.rowHandlers)

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_BATCHES)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_BATCHES]

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

    // this.getBatchesPagMy()
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

  async loadData() {
    try {
      this.getDataGridState()
      await this.getBatchesPagMy()
    } catch (error) {
      console.log(error)
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

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
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

      const result = await BatchesModel.getBatchesWithFiltersPag({
        status: BatchStatus.HAS_DISPATCHED,
        options: {
          limit: this.rowsPerPage,
          offset: this.curPage * this.rowsPerPage,

          sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
          sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

          filters: this.nameSearchValue ? filter : null,
          storekeeperId: null,
        },
      })

      const res = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.rowCount = result.count

        this.volumeWeightCoefficient = res.volumeWeightCoefficient

        this.batches = warehouseBatchesDataConverter(result.rows, result.volumeWeightCoefficient)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.error = error
        this.batches = []
      })
      this.setRequestStatus(loadingStatuses.failed)
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

  async onClickConfirmSendToBatchBtn() {
    try {
      const boxesIds = []

      this.batches
        .filter(batch => this.selectedBatches.includes(batch.id))
        .map(batch => batch.originalData)
        .forEach(batch => batch.boxes.forEach(box => boxesIds.push(box._id)))

      await BoxesModel.sendBoxesToBatch(boxesIds)
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
