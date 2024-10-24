import { makeObservable } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { EditorFormFieldData } from '@components/forms/content-editor-form'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { isAdmin, isModerator } from '@typings/guards/roles'
import { IFeedback } from '@typings/models/administrators/feedback'
import { IFullUser } from '@typings/shared/full-user'

import { feedbackViewColumns } from './feedback-view.columns'
import { ColumnProps, feedbackViewConfig, fieldsForSearch } from './feedback-view.config'

export class FeedbackViewModel extends DataGridFilterTableModel {
  feedback?: IFeedback
  showContentEditorForm = false
  showTicketForm = false

  get contentEditorFormTitle() {
    return this.feedback ? `Edit ticket` : 'Create ticket'
  }
  get userInfo() {
    return UserModel.userInfo as unknown as IFullUser
  }
  get creator() {
    return isAdmin(this.userInfo?.role) || isModerator(this.userInfo?.role)
  }
  get onTicketFormSubmit() {
    return this.feedback ? this.onUpdateFeedback : this.onCreateFeedback
  }

  constructor() {
    const columnsProps: ColumnProps = {
      onSelectFeedback: (feedback, viewMode) => this.onSelectFeedback(feedback, viewMode),
      onRemoveFeedback: id => this.onRemoveFeedback(id),
      creator: () => this.creator,
    }
    const columnsModel = feedbackViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const getMainDataMethod = (body: any) =>
      this.creator ? AdministratorModel.getFeedbacks(body) : OtherModel.getFeedbacks(body)
    const getMainMethodURL = () => (this.creator ? 'admins/feedback?' : 'other/feedback/my?')

    super({
      getMainDataMethod,
      columnsModel,
      filtersFields,
      mainMethodURL: 'other/feedback/my?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.FEEDBACK,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, feedbackViewConfig)
    this.getTableSettingsPreset()
  }

  onSelectFeedback = (feedback?: IFeedback, viewMode?: boolean) => {
    this.feedback = feedback
    viewMode ? this.onToggleTicketForm() : this.onToggleContentEditorForm()
  }

  onToggleTicketForm() {
    this.showTicketForm = !this.showTicketForm
  }

  onToggleContentEditorForm() {
    this.showContentEditorForm = !this.showContentEditorForm
  }

  async onRemoveFeedback(id: string) {
    try {
      await OtherModel.removeFeedback(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateFeedback(data: EditorFormFieldData) {
    try {
      await OtherModel.createFeedback(data)
      this.onToggleContentEditorForm()
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onUpdateFeedback(data: EditorFormFieldData) {
    try {
      const body = {
        title: data.title,
        text: data.text,
        media: data.media,
      }
      await OtherModel.updateFeedback(this.feedback?._id, body)
      this.onToggleContentEditorForm()
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
