import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {AdministratorModel} from '@models/administrator-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {destinationsColumns} from '@components/table-columns/admin/destinations-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class AdminSettingsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  destinations = []
  logisticsDestinations = []
  destinationToEdit = undefined
  destinationIdToRemove = undefined
  showAddOrEditDestinationModal = false
  showConfirmModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = destinationsColumns(this.rowHandlers)

  adminSettings = {}
  serverProxy = []
  infoModalText = ''

  showSuccessModal = false
  showInfoModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_DESTINATIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_DESTINATIONS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = destinationsColumns(this.rowHandlers).map(el => ({
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

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
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
    return toJS(this.destinations)
  }

  async loadData() {
    try {
      await this.getDestinations()
      await this.getAdminSettings()
      await this.getServerProxy()
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  // async loadData() {
  //   try {
  //     this.setRequestStatus(loadingStatuses.isLoading)
  //     this.getDataGridState()
  //     await this.getDestinations()

  //     this.setRequestStatus(loadingStatuses.success)
  //   } catch (error) {
  //     this.setRequestStatus(loadingStatuses.failed)
  //     console.log(error)
  //   }
  // }

  async getDestinations() {
    try {
      const result = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = addIdDataConverter(result)
      })
    } catch (error) {
      this.destinations = []
      console.log(error)
    }
  }

  onClickEditBtn(row) {
    this.destinationToEdit = row

    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  async onSubmitCreateDestination(data) {
    try {
      await AdministratorModel.createDestination(data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitEditDestination(destinationId, data) {
    try {
      await AdministratorModel.editDestination(destinationId, data)

      this.onTriggerOpenModal('showAddOrEditDestinationModal')
      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickAddBtn() {
    this.destinationToEdit = undefined

    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['The data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row) {
    this.destinationIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the destination?']),
      onClickSuccess: () => this.removeDestination(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeDestination() {
    try {
      await AdministratorModel.removeDestination(this.destinationIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getAdminSettings() {
    try {
      const result = await AdministratorModel.getSettings()

      runInAction(() => {
        this.adminSettings = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getServerProxy() {
    try {
      const result = await AdministratorModel.getProxy()

      runInAction(() => {
        this.serverProxy = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createProxy(proxy) {
    try {
      await AdministratorModel.createProxy(proxy)
      this.infoModalText = t(TranslationKey['Proxy successfully saved'])
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      console.log(error)
      this.infoModalText = t(TranslationKey['Proxy is not saved'])
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async onCloseInfoModal() {
    this.onTriggerOpenModal('showInfoModal')
    await this.loadData()
  }

  async createAdminSettings(data) {
    try {
      await AdministratorModel.setSettings(data)

      this.infoModalText = t(TranslationKey['The settings are saved.'])
      this.onTriggerOpenModal('showInfoModal')

      await this.getAdminSettings()
    } catch (error) {
      console.log(error)

      this.infoModalText = t(TranslationKey['The settings are not saved!'])
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
