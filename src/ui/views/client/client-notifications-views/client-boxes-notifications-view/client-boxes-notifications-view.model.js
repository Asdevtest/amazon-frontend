import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {clientBoxesNotificationsViewColumns} from '@components/table-columns/client/client-boxes-notifications-columns'

import {clientWarehouseDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'

export class ClientBoxesNotificationsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined
  error = undefined
  loadingStatus = undefined

  curBox = undefined
  showBoxViewModal = false

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
  columnsModel = clientBoxesNotificationsViewColumns(this.rowHandlers)

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
      this.columnsModel = clientBoxesNotificationsViewColumns(this.rowHandlers)
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
      this.columnsModel = clientBoxesNotificationsViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onTriggerOpenConfirmModal(row) {
    this.confirmModalSettings = {
      isWarning: false,
      message: `${t(TranslationKey['Additional payment is required:'])} ${toFixedWithDollarSign(
        row.deliveryTotalPriceChanged - row.deliveryTotalPrice,
        2,
      )} ${t(TranslationKey['Do you confirm the extra payment?'])}`,
      onClickOkBtn: () => this.onClickConfirmOrderPriceChangeBtn(row),
    }
    this.onTriggerOpenModal('showConfirmModal')
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
      await this.getBoxes()
      this.getDataGridState()
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
      const result = await BoxesModel.getBoxesForCurClient(BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE)

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

  async onClickConfirmOrderPriceChangeBtn(box) {
    try {
      await ClientModel.boxConfirmPriceChange(box._id)

      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
    } catch (error) {
      console.warn(error)
    }
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
