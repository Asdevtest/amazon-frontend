import { action, computed, observable, override } from 'mobx'

export const observerConfig = {
  _filtersFields: observable,
  _mainMethodURL: observable,
  _columnMenuSettings: observable,
  _currentSearchValue: observable,
  _fieldsForSearch: observable,

  filtersFields: computed,
  columnMenuSettings: computed,
  isSomeFilterOn: computed,
  currentSearchValue: computed,
  fieldsForSearch: computed,
  mainMethodURL: computed,

  setColumnMenuSettings: action.bound,
  getFilters: action.bound,
  onSearchSubmit: action.bound,
  onChangeFullFieldMenuItem: action.bound,
  onClickFilterBtn: action.bound,
  onClickResetFilters: action.bound,

  getMainTableData: override,
}
