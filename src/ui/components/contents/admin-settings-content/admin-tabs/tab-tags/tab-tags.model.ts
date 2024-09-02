import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { GeneralModel } from '@models/general-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'

import { ITag } from '@typings/shared/tag'

import { observerConfig } from './observer-config'
import { tagsColumns } from './tags.columns'

export class AdminSettingsTagsModel extends DataGridFilterTableModel {
  tagToEdit: ITag | null = null

  showConfirmModal = false
  showAddOrEditTagModal = false

  constructor() {
    const rowHandlers = {
      onClickEditBtn: (row: ITag) => this.onClickEditBtn(row),
      onClickRemoveBtn: (row: ITag) => this.onClickRemoveTagBtn(row),
    }

    const columnsModel = tagsColumns(rowHandlers)

    super({
      getMainDataMethod: GeneralModel.getPagTagList,
      columnsModel,
      filtersFields: getFilterFields(columnsModel),
      mainMethodURL: 'general/tags/pag?',
      fieldsForSearch: ['title', 'productCount'],
      tableKey: DataGridTablesKeys.ADMIN_TAGS,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'productCount', sort: 'desc' }]

    this.getDataGridState()
    this.getCurrentData()
  }

  onClickRemoveTagBtn(row: ITag) {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(TranslationKey['Are you sure you want to delete the tag?']),
      onSubmit: () => this.onRemoveTag(row._id),
      onCancel: this.onClickToggleConfirmModal,
    }
    this.onClickToggleConfirmModal()
  }

  onClickRemoveTagsBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message: t(TranslationKey['Are you sure you want to delete the tag?']),
      onSubmit: this.onRemoveTags,
      onCancel: this.onClickToggleConfirmModal,
    }

    this.onClickToggleConfirmModal()
  }

  onClickEditBtn(row: ITag) {
    this.tagToEdit = row
    this.onClickToggleAddOrEditModal()
  }

  onClickAddBtn() {
    this.tagToEdit = null
    this.onClickToggleAddOrEditModal()
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['The data will not be saved!']),
      onSubmit: this.cancelTheOrder,
      onCancel: this.onClickToggleConfirmModal,
    }
    this.onClickToggleConfirmModal()
  }

  cancelTheOrder() {
    this.onClickToggleAddOrEditModal()
    this.onClickToggleConfirmModal()
  }

  async onCreateTag(tag: ITag) {
    try {
      await GeneralModel.createTag(tag)
      this.onClickToggleAddOrEditModal()
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onEditTag(id: string, data: ITag) {
    try {
      await AdministratorModel.editTag(id, data)
      this.onClickToggleAddOrEditModal()
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveTag(tagId: string) {
    try {
      await AdministratorModel.removeTags([tagId])
      this.onClickToggleConfirmModal()
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onRemoveTags() {
    try {
      await AdministratorModel.removeTags(this.selectedRows)
      this.onClickToggleConfirmModal()
      this.getCurrentData()
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
}
