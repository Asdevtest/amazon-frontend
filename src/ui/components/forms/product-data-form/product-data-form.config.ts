import { action, computed, observable } from 'mobx'

export const productDataFormConfig = {
  rows: computed,

  archive: observable,
  batch: observable,
  showBatchInfoModal: observable,

  onClickShowBatchInfoModal: action.bound,
  onToggleArchive: action.bound,
}
