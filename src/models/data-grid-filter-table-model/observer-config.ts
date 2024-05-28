import { action, computed, observable, override } from 'mobx'

export const observerConfig = {
  filtersFields: observable,
  mainMethodURL: observable,
  columnMenuSettings: observable,

  fieldsForSearch: observable,
  additionalPropertiesColumnMenuSettings: observable,
  additionalPropertiesGetFilters: observable,
  operatorsSettings: observable,

  isSomeFilterOn: computed,

  setColumnMenuSettings: action.bound,
  getFilters: action.bound,
  onSearchSubmit: action.bound,
  onChangeFullFieldMenuItem: action.bound,
  onClickFilterBtn: action.bound,
  onClickResetFilters: action.bound,
  setFilterRequestStatus: action.bound,

  getCurrentData: override,

  onColumnVisibilityModelChange: override,
  onChangeSortingModel: override,
  onChangeFilterModel: override,
  onPaginationModelChange: override,
  currentSearchValue: override,
}
