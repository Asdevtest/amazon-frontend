import { action, computed, observable } from 'mobx'

export const filterFields = ['specType']

export const searchFields = ['title', 'description', 'createdByName']

export const servicesConfig = {
  history: observable,
  specOption: observable,
  viewMode: observable,
  specs: observable,
  announcements: computed,
  loading: computed,
  getSpecs: action.bound,
  onScroll: action.bound,
  onChangeSpec: action.bound,
  onClickOrderBtn: action.bound,
  onChangeViewMode: action.bound,
}
