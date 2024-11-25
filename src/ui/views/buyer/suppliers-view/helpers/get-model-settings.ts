import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { IHandlers, TableView } from '../suppliers-view.type'

import { getAdditionalFiltersFields } from './get-additional-filters-fields'
import { getFieldsForSearch } from './get-fields-for-search'
import { getInitialSortModel } from './get-initial-sort-model'
import { getMainMethodUrl } from './get-main-method-url'
import { getTableColumns } from './get-table-columns'
import { getTableKey } from './get-table-key'
import { getValueMethod } from './get-value-method'

export const getModelSettings = (activeTable: TableView, handlers: IHandlers) => {
  const getMainDataMethod = getValueMethod(activeTable)
  const mainMethodURL = getMainMethodUrl(activeTable)
  const columnsModel = getTableColumns(activeTable)(handlers)
  const additionalFiltersFields = getAdditionalFiltersFields(activeTable)
  const tableKey = getTableKey(activeTable)
  const filtersFields = getFilterFields(columnsModel, additionalFiltersFields)
  const sortModel = getInitialSortModel(activeTable)
  const fieldsForSearch = getFieldsForSearch(activeTable)

  return {
    getMainDataMethod,
    mainMethodURL,
    columnsModel,
    tableKey,
    filtersFields,
    sortModel,
    fieldsForSearch,
  }
}
