import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { GeneralModel } from '@models/general-model'
import { SettingsModel } from '@models/settings-model'

import { tagsColumns } from '@components/table/table-columns/admin/tags-columns'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

export class AdminSettingsTagsModel {
  history = undefined

  tags = []

  requestStatus = ''
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
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }
  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  columnsModel = tagsColumns(this.rowHandlers)

  constructor({ history }) {
    this.history = history

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
      return this.tags.filter(({ title }) => title.toLowerCase().includes(this.nameSearchValue.toLowerCase()))
    } else {
      return this.tags
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

  onClickRemoveBtn(row) {
    this.tagIdToRemove = row._id
    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the tag?']),
      onClickSuccess: () => this.removeTag(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickEditBtn(row) {
    this.tagToEdit = row

    this.onTriggerOpenModal('showAddOrEditTagModal')
  }

  onChangeNameSearchValue(event) {
    this.nameSearchValue = event.target.value
  }

  onClickAddBtn() {
    this.tagToEdit = undefined

    this.onTriggerOpenModal('showAddOrEditTagModal')
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
    this.onTriggerOpenModal('showAddOrEditTagModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  async createTag(titleTag) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await GeneralModel.createTag(titleTag)

      this.onTriggerOpenModal('showAddOrEditTagModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  // TODO: There isn't method to remove a tag (wait beck)
  /* async editTag(titleTag, tagId) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await GeneralModel.editTag(titleTag, tagId)

      this.onTriggerOpenModal('showAddOrEditTagModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  } */

  // TODO: There isn't method to remove a tag (wait beck)
  /* async removeTag() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await GeneralModel.removeTag(this.tagIdToRemove)

      this.onTriggerOpenModal('showAddOrEditTagModal')

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  } */

  // TODO: There isn't method to remove a tag (wait beck)
  /* async removeTags() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await GeneralModel.removeTags(this.tagIdToRemove)

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
    }
  } */

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
