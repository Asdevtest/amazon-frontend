import { action, observable, override } from 'mobx'

export const observerConfig = {
  filtersFields: observable,
  mainMethodURL: observable,
  columnMenuSettings: observable,
  oneTimeFilters: observable,

  additionalPropertiesColumnMenuSettings: observable,
  additionalPropertiesGetFilters: observable,
  operatorsSettings: observable,
  defaultFilterParams: observable,

  setColumnMenuSettings: action.bound,
  getFilters: action.bound,
  onSearchSubmit: action.bound,
  onChangeFullFieldMenuItem: action.bound,
  onClickFilterBtn: action.bound,
  setFilterRequestStatus: action.bound,
  setFilterFromPreset: action.bound,
  useOneTimeFilter: action.bound,

  getCurrentData: override,
  isSomeFilterOn: override,
  onChangeSortingModel: override,
  onChangeFilterModel: override,
  onPaginationModelChange: override,
  currentSearchValue: override,
  onClickResetFilters: override,
  getPresetSettingForSave: override,
  setSettingsFromActivePreset: override,
}
