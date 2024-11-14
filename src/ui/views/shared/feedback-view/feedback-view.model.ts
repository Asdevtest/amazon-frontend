import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { UserModel } from '@models/user-model'

import { EditorFormFieldData } from '@components/forms/content-editor-form'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { t } from '@utils/translations'

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
    }
    const columnsModel = feedbackViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    super({
      getMainDataMethod: OtherModel.getFeedbacks,
      columnsModel,
      filtersFields,
      mainMethodURL: 'other/feedback?',
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
      toast.success(t(TranslationKey['The request has been successfully deleted.']))
      this.getCurrentData()
    } catch (error) {
      toast.error(t(TranslationKey['There was an error deleting the request. Try again.']))
    }
  }

  async onCreateFeedback(data: EditorFormFieldData) {
    try {
      await OtherModel.createFeedback(data)
      toast.success(t(TranslationKey['Your request has been sent. Thank you for your feedback!']))
      this.onToggleContentEditorForm()
      this.getCurrentData()
    } catch (error) {
      toast.error(t(TranslationKey['There was an error sending the request. Try again.']))
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
      toast.success(t(TranslationKey['The request has been successfully edited.']))
      this.onToggleContentEditorForm()
      this.getCurrentData()
    } catch (error) {
      toast.error(t(TranslationKey['There was an error editing the request. Try again.']))
    }
  }
}
