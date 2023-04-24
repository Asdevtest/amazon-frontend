import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesReadyToBatchViewColumns} from '@components/table-columns/client/client-boxes-ready-to-batch-columns'

import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ClientReadyBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  nameSearchValue = ''
  boxesMy = []
  curBox = undefined

  drawerOpen = false
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
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientBoxesReadyToBatchViewColumns(this.storekeepersData)

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
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

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
      this.selectedBoxes = []
    })
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BOXES_READY_TO_BATCH]

    if (state) {
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = clientBoxesReadyToBatchViewColumns().map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
      this.selectedBoxes = []
    })
  }

  // curPage = 0
  // rowsPerPage = 15

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
    // console.log('this.curPage', this.curPage * this.rowsPerPage)
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
      this.selectedBoxes = []
    })
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
            item.product?.skusByClient[0]?.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getStorekeepers()

      this.getBoxesMy()

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

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage = e => {
    runInAction(() => {
      this.curPage = e
      this.selectedBoxes = []
    })
  }

  async setCurrentOpenedBox(row) {
    try {
      runInAction(() => {
        this.curBox = row
      })
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
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
      await ClientModel.returnBoxFromBatch(this.selectedBoxes.map(boxId => ({boxId})))
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
      const result = await BoxesModel.getBoxesForCurClient(
        `${BoxStatus.REQUESTED_SEND_TO_BATCH},${BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE},${BoxStatus.NEED_TO_UPDATE_THE_TARIFF}`,
        {
          storekeeperId: this.currentStorekeeper && this.currentStorekeeper._id,
          destinationId: this.curDestination && this.curDestination._id,
          hasBatch: false,
        },
      )

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
