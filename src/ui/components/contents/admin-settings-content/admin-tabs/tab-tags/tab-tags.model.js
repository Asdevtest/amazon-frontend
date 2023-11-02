import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'

import { tagsColumns } from '@components/table/table-columns/admin/tags-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class AdminSettingsTagsModel {
  tags = []

  requestStatus = undefined
  nameSearchValue = ''

  showConfirmModal = false
  showAddOrEditTagModal = false

  sortModel = []
  filterModel = { items: [] }
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}
  rowSelectionModel = []

  tagToEdit = undefined
  tagIdToRemove = ''
  confirmModalSettings = {
    isWarning: true,
    message: '',
    onClickSuccess: () => {},
  }
  rowHandlers = {
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickRemoveBtn: row => this.onClickRemoveTagBtn(row),
  }

  columnsModel = tagsColumns(this.rowHandlers)

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getTags()

      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  async getTags() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await GeneralModel.getTagList()

      runInAction(() => {
        this.tags = addIdDataConverter(result)
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.tags = []
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  getCurrentData() {
    if (this.nameSearchValue) {
      return toJS(this.tags).filter(({ title }) => title.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    } else {
      return toJS(this.tags)
    }
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_TAGS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_TAGS)
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onChangePaginationModel(model) {
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
      this.setRequestStatus(loadingStatuses.isLoading)

      await GeneralModel.createTag(titleTag)

      this.onClickToggleAddOrEditModal()

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onEditTag(id, data) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.editTag(id, data)

      this.onClickToggleAddOrEditModal()

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onRemoveTag() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removeTags([this.tagIdToRemove])

      this.onClickToggleConfirmModal()

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onRemoveTags() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await AdministratorModel.removeTags(this.rowSelectionModel)

      this.onClickToggleConfirmModal()

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
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
