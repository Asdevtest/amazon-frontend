import { action, computed, observable } from 'mobx'

export const searchFields = ['title', 'description', 'createdByName']

export const servicesConfig = {
  history: observable,
  specOption: observable,
  viewMode: observable,
  archive: observable,
  specs: observable,
  isClient: observable,
  announcements: computed,
  getSpecs: action.bound,
  onChangeSpec: action.bound,
  onClickCard: action.bound,
  onChangeViewMode: action.bound,
  onClickCreateService: action.bound,
  onToggleArchive: action.bound,
}
