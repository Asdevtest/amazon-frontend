import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { GeneralModel } from '@models/general-model'
import { TableSettingsModel } from '@models/table-settings'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { tagsColumns } from './tags-columns'

export class AdminSettingsTagsModel {
  tags = []
  requestStatus = undefined
  nameSearchValue = ''
  tagToEdit = undefined
  tagIdToRemove = ''

  showConfirmModal = false
  confirmModalSettings = {
    isWarning: true,
    message: '',
    onClickSuccess: () => {},
  }
  showAddOrEditTagModal = false

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  rowSelectionModel = []
  rowHandlers = {
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickRemoveBtn: row => this.onClickRemoveTagBtn(row),
  }
  columnsModel = tagsColumns(this.rowHandlers)

  get currentData() {
    if (this.nameSearchValue) {
      return this.tags.filter(({ title }) => title.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    } else {
      return this.tags
    }
  }

  constructor() {
    this.loadData()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    this.getDataGridState()
    this.getTags()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getTags() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const resolve = await GeneralModel.getTagList()

      runInAction(() => {
        this.tags = addIdDataConverter(resolve)
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.ADMIN_TAGS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.ADMIN_TAGS)
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.setDataGridState()
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onClickRemoveTagBtn(row) {
    this.tagIdToRemove = row._id
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the tag?']),
      onClickSuccess: () => this.onRemoveTag(),
    }
    this.onClickToggleConfirmModal()
  }

  onClickRemoveTagsBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the tag?']),
      onClickSuccess: () => this.onRemoveTags(),
    }
    this.onClickToggleConfirmModal()
  }

  onClickEditBtn(row) {
    this.tagToEdit = row
    this.onClickToggleAddOrEditModal()
  }

  onChangeNameSearchValue(event) {
    this.nameSearchValue = event.target.value
  }

  onClickAddBtn() {
    this.tagToEdit = undefined
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

  async onCreateTag(titleTag) {
    try {
      await GeneralModel.createTag(titleTag)
      this.onClickToggleAddOrEditModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onEditTag(id, data) {
    try {
      await AdministratorModel.editTag(id, data)
      this.onClickToggleAddOrEditModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveTag() {
    try {
      await AdministratorModel.removeTags([this.tagIdToRemove])
      this.onClickToggleConfirmModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveTags() {
    try {
      await AdministratorModel.removeTags(this.rowSelectionModel)
      this.onClickToggleConfirmModal()
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickToggleAddOrEditModal() {
    this.onTriggerOpenModal('showAddOrEditTagModal')
  }

  onClickToggleConfirmModal() {
    this.onTriggerOpenModal('showConfirmModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
