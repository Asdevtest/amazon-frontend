import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {logisticsTariffsColumns} from '@components/table-columns/warehouse/logistics-tariffs-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class LogisticsTariffsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  yuanToDollarRate = undefined
  storekeeperDestination = undefined

  logisticsTariffs = []
  tariffToEdit = undefined
  tariffIdToRemove = undefined

  showAddOrEditLogisticTariffModal = false
  showAddOrEditDestinationModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = logisticsTariffsColumns(this.rowHandlers, this.firstRowId)

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

    reaction(
      () => this.firstRowId,
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
    this.firstRowId = state.sorting.sortedRows[0]

    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_LOGISTICS_TARIFFS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_LOGISTICS_TARIFFS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = logisticsTariffsColumns(this.rowHandlers, this.firstRowId).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
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

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  getCurrentData() {
    return toJS(this.logisticsTariffs)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getLogisticsTariffs()

      this.getDataGridState()

      this.getDestinations()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getDestinations() {
    try {
      const result = await ClientModel.getDestinations()

      const storekeeperDestination = result.find(el => el.storekeeperId === this.userInfo._id)
      if (storekeeperDestination) {
        runInAction(() => {
          this.storekeeperDestination = storekeeperDestination
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  onClickAddressBtn() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  async onSubmitChangeDestination(data) {
    try {
      await StorekeeperModel.editStorekeperDestination(data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async getLogisticsTariffs() {
    try {
      const result = await StorekeeperModel.getLogisticsTariffs()

      runInAction(() => {
        this.logisticsTariffs = addIdDataConverter(result)
      })
    } catch (error) {
      this.logisticsTariffs = []
      console.log(error)
    }
  }

  async onClickEditBtn(row) {
    try {
      this.tariffToEdit = row

      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitCreateTariff(data) {
    try {
      await StorekeeperModel.createLogisticTariff(data)

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitEditTariff(tariffId, data) {
    try {
      await StorekeeperModel.editLogisticTariff(tariffId, data)

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickAddBtn() {
    try {
      this.tariffToEdit = undefined

      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate

      this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditLogisticTariffModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row) {
    this.tariffIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the tariff?']),
      onClickSuccess: () => this.removeTariff(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeTariff() {
    try {
      await StorekeeperModel.removeLogisticTariff(this.tariffIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
