import { action, observable } from 'mobx'

export const observerConfig = {
  tagToEdit: observable,
  showConfirmModal: observable,
  showAddOrEditTagModal: observable,

  onClickRemoveTagBtn: action.bound,
  onClickRemoveTagsBtn: action.bound,
  onClickEditBtn: action.bound,
  onClickAddBtn: action.bound,
  onClickCancelBtn: action.bound,
  cancelTheOrder: action.bound,
  onCreateTag: action.bound,
  onEditTag: action.bound,
  onRemoveTag: action.bound,
  onRemoveTags: action.bound,
  onClickToggleAddOrEditModal: action.bound,
  onClickToggleConfirmModal: action.bound,
}
