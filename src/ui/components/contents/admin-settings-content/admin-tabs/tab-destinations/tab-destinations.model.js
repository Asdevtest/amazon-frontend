import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { ClientModel } from '@models/client-model'

import { destinationsColumns } from '@components/table/table-columns/admin/destinations-columns'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class AdminSettingsDestinationsModel {
  requestStatus = undefined
  destinations = []
  destinationToEdit = undefined
  destinationIdToRemove = undefined

  showConfirmModal = false
  confirmModalSettings = {
    isWarning: true,
    message: '',
    onClickSuccess: () => {},
  }
  showAddOrEditDestinationModal = false

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }
  columnsModel = destinationsColumns(this.rowHandlers)

  get currentData() {
    return this.destinations
  }

  constructor() {
    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    this.getDestinations()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getDestinations() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const response = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = response
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
  }

  onClickRemoveBtn(row) {
    this.destinationIdToRemove = row._id
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the destination?']),
      onClickSuccess: () => this.onRemoveDestination(),
    }
    this.onClickToggleConfirmModal()
  }

  onClickEditBtn(row) {
    this.destinationToEdit = row
    this.onClickToggleAddOrEditModal()
  }

  onClickAddBtn() {
    this.destinationToEdit = undefined
    this.onClickToggleAddOrEditModal()
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['The data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }
    this.onClickToggleConfirmModal()
  }

  cancelTheOrder() {
    this.onClickToggleAddOrEditModal()
    this.onClickToggleConfirmModal()
  }

  async onCreateDestination(data) {
    try {
      await AdministratorModel.createDestination(data)
      this.onClickToggleAddOrEditModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onEditDestination(data, destinationId) {
    try {
      await AdministratorModel.editDestination(destinationId, data)
      this.onClickToggleAddOrEditModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveDestination() {
    try {
      await AdministratorModel.removeDestination(this.destinationIdToRemove)
      this.onClickToggleConfirmModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickToggleAddOrEditModal() {
    this.onTriggerOpenModal('showAddOrEditDestinationModal')
  }

  onClickToggleConfirmModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
