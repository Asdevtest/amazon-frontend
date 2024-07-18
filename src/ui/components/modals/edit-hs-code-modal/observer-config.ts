import { action, observable } from 'mobx'

export const observerConfig = {
  onCloseModal: observable,
  onUpdateData: observable,

  onSaveHSCode: action.bound,
  onChangeField: action.bound,
}
