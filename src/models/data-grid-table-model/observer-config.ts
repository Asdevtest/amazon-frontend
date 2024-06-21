import { action, computed, observable } from 'mobx'

export const observerConfig = {
  sortModel: observable,
  densityModel: observable,
  paginationModel: observable,
  filterModel: observable,
  columnVisibilityModel: observable,
  selectedRows: observable,
  tableKey: observable,
  columnsModel: observable,
  pinnedColumns: observable,
  currentSearchValue: observable,
  fieldsForSearch: observable,

  filteredData: computed,

  setDataGridState: action.bound,
  getDataGridState: action.bound,
  onChangeSortingModel: action.bound,
  onColumnVisibilityModelChange: action.bound,
  onSelectionModel: action.bound,
  onPaginationModelChange: action.bound,
  onChangeFilterModel: action.bound,
  onChangeUnserverSearchValue: action.bound,
  handlePinColumn: action.bound,
  handleHideColumns: action.bound,
}
