import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapProductStrategyStatusEnumToKey} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {supervisorSettingsViewColumns} from '@components/table-columns/supervisor/supervisor-settings-columns/supervisor-settings-columns'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {t} from '@utils/translations'

export class SupervisorSettingsContentModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  curPage = 0
  sortModel = []
  filterModel = {items: []}
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = supervisorSettingsViewColumns()
  asins = []
  failedData = {}
  nameSearchValue = undefined
  selectedRowIds = undefined

  asinsToEdit = undefined
  asinsIdToRemove = undefined

  showAsinCheckerModal = false
  showEditAsinCheckerModal = false
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

  constructor({history, tabIndex}) {
    this.history = history
    this.tabIndex = tabIndex

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

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.SUPERVISOR_SETTINGS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.SUPERVISOR_SETTINGS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = this.startFilterModel
        ? {
            ...this.startFilterModel,
            items: this.startFilterModel.items.map(el => ({...el, value: el.value.map(e => t(e))})),
          }
        : state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = supervisorSettingsViewColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
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

  onChangeCurPage(e) {
    this.curPage = e
  }
  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
