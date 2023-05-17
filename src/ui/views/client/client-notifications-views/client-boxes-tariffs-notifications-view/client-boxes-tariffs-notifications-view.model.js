import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {zipCodeGroups} from '@constants/configs/zip-code-groups'
import {DataGridTablesKeys} from '@constants/data-grid/data-grid-tables-keys'
import {BoxStatus} from '@constants/statuses/box-status'
import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesTariffsNotificationsViewColumns} from '@components/table/table-columns/client/client-boxes-tariffs-notifications-columns'

import {calcFinalWeightForBox} from '@utils/calculation'
import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class ClientBoxesTariffsNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  tariffIdToChange = undefined
  curBox = undefined
  showBoxViewModal = false
  showSelectionStorekeeperAndTariffModal = false

  hsCodeData = {}
  showEditHSCodeModal = false

  storekeepersData = []
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
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  rowHandlers = {
    onTriggerOpenConfirmModal: row => this.onTriggerOpenConfirmModal(row),
    onTriggerOpenRejectModal: row => this.onTriggerOpenRejectModal(row),
  }
  columnsModel = clientBoxesTariffsNotificationsViewColumns(this.rowHandlers)

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
    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_BOXES_NOTIFICATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_BOXES_NOTIFICATIONS]

    if (state) {
      runInAction(() => {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = clientBoxesTariffsNotificationsViewColumns(this.rowHandlers).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      })
    }
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
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

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onTriggerOpenConfirmModal(row) {
    try {
      runInAction(() => {
        this.curBox = row
      })

      await this.getStorekeepers()
      this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSelectTariff() {
    try {
      await ClientModel.updateTariffIfTariffWasDeleted({boxId: this.curBox._id, logicsTariffId: this.tariffIdToChange})

      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionStorekeeperAndTariffModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickConfirmTarrifChangeBtn(storekeeperId, tariffId) {
    try {
      runInAction(() => {
        this.tariffIdToChange = tariffId
      })

      const platformSettings = await UserModel.getPlatformSettings()

      const curBoxFinalWeight = calcFinalWeightForBox(this.curBox, platformSettings?.volumeWeightCoefficient)

      const curStorekeeper = this.storekeepersData.find(el => el._id === this.curBox?.storekeeper._id)

      const firstNumOfCode = this.curBox.destination.zipCode[0]

      const regionOfDeliveryName = zipCodeGroups.find(el => el.codes.includes(Number(firstNumOfCode)))?.name

      const tariffRate = curStorekeeper.tariffLogistics.find(el => el._id === tariffId)?.conditionsByRegion[
        regionOfDeliveryName
      ]?.rate

      const finalSum = curBoxFinalWeight * tariffRate

      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          message: `${t(TranslationKey['The total cost of shipping the box will be'])}: $${toFixed(finalSum, 2)}`,
          onClickOkBtn: () => this.onSubmitSelectTariff(),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.warn(error)
    }
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

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesForCurClient(BoxStatus.NEED_TO_UPDATE_THE_TARIFF)

      const platformSettings = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxes = clientWarehouseDataConverter(result, platformSettings?.volumeWeightCoefficient).sort(
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

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  async onClickRejectOrderPriceChangeBtn(box) {
    try {
      await ClientModel.returnBoxFromBatch([{boxId: box._id}])
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
