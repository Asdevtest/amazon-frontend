import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesTariffsNotificationsViewColumns} from '@components/table-columns/client/client-boxes-tariffs-notifications-columns'

import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

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

  storekeepersData = []
  boxes = []
  drawerOpen = false
  showConfirmModal = false
  confirmModalSettings = {
    isWarning: false,
    onClickOkBtn: () => this.onSaveProductData(),
  }
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

  onChangeFilterModel(model) {
    this.filterModel = model
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
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientBoxesTariffsNotificationsViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK)

      this.storekeepersData = result
    } catch (error) {
      console.log(error)
    }
  }

  async onTriggerOpenConfirmModal(row) {
    try {
      this.curBox = row

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
      this.tariffIdToChange = tariffId

      this.confirmModalSettings = {
        isWarning: false,
        message: t(TranslationKey['Confirm tariff selection']),
        onClickOkBtn: () => this.onSubmitSelectTariff(),
      }

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.warn(error)
    }
  }

  onTriggerOpenRejectModal(row) {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Do you want to cancel?']),
      onClickOkBtn: () => this.onClickRejectOrderPriceChangeBtn(row),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
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
        this.error = error.body.message
      }
    }
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxesForCurClient(BoxStatus.NEED_TO_UPDATE_THE_TARIFF)

      const volumeWeightCoefficient = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.boxes = clientWarehouseDataConverter(result, volumeWeightCoefficient).sort(
          sortObjectsArrayByFiledDateWithParseISO('createdAt'),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error
      this.boxes = []
    }
  }

  async setCurrentOpenedBox(row) {
    try {
      this.curBox = row
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showBoxViewModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
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
    this.loadingStatus = loadingStatus
  }
}
