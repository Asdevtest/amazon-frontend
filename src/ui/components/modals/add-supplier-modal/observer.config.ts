import { action, observable } from 'mobx'

export const observerConfig = {
  form: observable,

  handleUploadFiles: action.bound,
}
