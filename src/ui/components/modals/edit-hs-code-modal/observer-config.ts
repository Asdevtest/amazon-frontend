import { action, observable } from 'mobx'

export const observerConfig = {
  handleCloseModal: observable,
  handleUpdateData: observable,

  handleSaveHSCode: action.bound,
  onChangeField: action.bound,
}
