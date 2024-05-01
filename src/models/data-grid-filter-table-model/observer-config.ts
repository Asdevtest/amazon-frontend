import { action, computed, observable, override } from 'mobx'

export const observerConfig = {
  filtersFields: observable,
  mainMethodURL: observable,
  columnMenuSettings: observable,
  currentSearchValue: observable,
  fieldsForSearch: observable,
  additionalPropertiesColumnMenuSettings: observable,
  additionalPropertiesGetFilters: observable,

  isSomeFilterOn: computed,

  setColumnMenuSettings: action.bound,
  getFilters: action.bound,
  onSearchSubmit: action.bound,
  onChangeFullFieldMenuItem: action.bound,
  onClickFilterBtn: action.bound,
  onClickResetFilters: action.bound,
  setFilterRequestStatus: action.bound,

  getMainTableData: override,
}
