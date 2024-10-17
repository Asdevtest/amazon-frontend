import { action, computed, observable } from 'mobx'

export const feedbackViewConfig = {
  showContentEditorForm: observable,
  showTicketForm: observable,
  ticket: observable,

  contentEditorFormTitle: computed,

  onToggleContentEditorForm: action.bound,
  onToggleTicketForm: action.bound,
  onRemoveTicket: action.bound,
}

export const fieldsForSearch = ['status', 'title', 'text']

export interface ColumnProps {
  onToggleTicketForm: (ticket: any) => void
  onRemoveTicket: (id: string) => void
}
