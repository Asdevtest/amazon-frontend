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

  constructor() {
    const columnsProps: ColumnProps = {
      onSelectFeedback: feedback => this.onSelectFeedback(feedback),
      onRemoveFeedback: id => this.onRemoveFeedback(id),
      creator: () => this.creator,
    }
    const columnsModel = feedbackViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)
    const getMainDataMethod = (body: any) =>
      this.creator ? AdministratorModel.getFeedback(body) : OtherModel.getFeedbacks(body)

    super({
      getMainDataMethod,
      columnsModel,
      filtersFields,
      mainMethodURL: '',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.FEEDBACK,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, feedbackViewConfig)
    this.getTableSettingsPreset()
  }

  onToggleContentEditorForm = () => {
    this.showContentEditorForm = !this.showContentEditorForm
  }

  onSelectFeedback = (feedback: IFeedback) => {
    if (feedback) {
      this.feedback = feedback
    }

    this.onToggleTicketForm()
  }

  onToggleTicketForm = () => {
    this.showTicketForm = !this.showTicketForm
  }

  async onRemoveFeedback(id: string) {
    try {
      await AdministratorModel.rejectedFeedback(id)
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
}
