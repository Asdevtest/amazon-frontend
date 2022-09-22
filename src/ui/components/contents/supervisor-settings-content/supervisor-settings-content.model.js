import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapProductStrategyStatusEnumToKey} from '@constants/product-strategy-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {OtherModel} from '@models/other-model'
import {SettingsModel} from '@models/settings-model'

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

  asinsToEdit = undefined
  asinsIdToRemove = undefined

  showAsinCheckerModal = false
  showEditAsinCheckerModal = false
  showConfirmModal = false
  showFailedAsinsModal = false

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
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getAsins(tabIndex)
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onSubmitAsins(data) {
    try {
      const failed = await OtherModel.checkAsins(data)

      runInAction(() => {
        this.failedData = failed
      })

      if (this.failedData.failed.length) {
        this.onTriggerOpenModal('showFailedAsinsModal')
      }

      this.onTriggerOpenModal('showAsinCheckerModal')
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

  async onEditAsins(id, data) {
    try {
      await OtherModel.editAsins(id, data)
      this.onTriggerOpenModal('showEditAsinCheckerModal')
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onRemoveAsin(id) {
    try {
      await OtherModel.removeAsin(id)
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  onClickRemoveBtn(row) {
    this.asinsIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete ASIN?']),
      onClickSuccess: () => this.onRemoveAsin(this.asinsIdToRemove),
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
    this.selectionModel = model
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
