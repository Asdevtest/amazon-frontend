import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { mapProductStrategyStatusEnumToKey } from '@constants/product/product-strategy-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { OtherModel } from '@models/other-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { supervisorSettingsViewColumns } from '@components/table/table-columns/supervisor/supervisor-settings-columns/supervisor-settings-columns'

import { t } from '@utils/translations'

export class SupervisorSettingsContentModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  asins = []
  failedData = {}
  nameSearchValue = undefined
  selectedRowIds = undefined

  asinsToEdit = undefined
  asinsIdToRemove = undefined

  showAsinCheckerModal = false
  showEditAsinCheckerModal = false
  showConfirmCloseAsinCheckerModal = false
  showConfirmModal = false
  showFailedAsinsModal = false
  tabIndex = undefined
  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  get user() {
    return UserModel.userInfo
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  columnsModel = supervisorSettingsViewColumns(this.rowHandlers)

  constructor({ history, tabIndex }) {
    this.history = history
    this.tabIndex = tabIndex

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_SETTINGS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_SETTINGS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.asins).filter(
        el =>
          el.asin.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.reason.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return toJS(this.asins)
    }
  }

  async loadData(tabIndex) {
    try {
      this.selectedRowIds = []
      await this.getAsins(tabIndex)
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async onSubmitAsins(data, tabIndex) {
    try {
      const failed = await OtherModel.checkAsins(data)

      runInAction(() => {
        this.failedData = failed
      })

      if (this.failedData.failed.length) {
        this.onTriggerOpenModal('showFailedAsinsModal')
      }

      this.onTriggerOpenModal('showAsinCheckerModal')

      this.loadData(tabIndex)
    } catch (error) {
      console.log(error)
    }
  }

  async getAsins(tabIndex) {
    try {
      const result = await OtherModel.getAsins()
      runInAction(() => {
        this.asins = result.filter(item => item.strategy === mapProductStrategyStatusEnumToKey[tabIndex].toString())
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onEditAsins(id, data, tabIndex) {
    try {
      await OtherModel.editAsins(id, data)

      this.onTriggerOpenModal('showEditAsinCheckerModal')
      this.loadData(tabIndex)
    } catch (error) {
      console.log(error)
    }
  }

  async onRemoveAsin(id, tabIndex) {
    try {
      await OtherModel.removeAsin(id)
      this.onTriggerOpenModal('showConfirmModal')

      this.loadData(tabIndex)
    } catch (error) {
      console.log(error)
    }
  }

  async onRemoveAsins(ids, tabIndex) {
    try {
      await OtherModel.removeAsins(ids)

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData(tabIndex)
    } catch (error) {
      console.log(error)
    }
  }

  onClickRemoveBtn(row) {
    this.asinsIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete ASIN?']),
      onClickSuccess: tabIndex => this.onRemoveAsin(this.asinsIdToRemove, tabIndex),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveSelectedBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the selected ASINs?']),
      onClickSuccess: tabIndex => this.onRemoveAsins(this.selectedRowIds, tabIndex),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickEditBtn(row) {
    this.asinsToEdit = row

    this.onTriggerOpenModal('showEditAsinCheckerModal')
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
