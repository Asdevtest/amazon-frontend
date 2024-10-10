import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { ParsingReportsType } from '../parsing-reports.type'

import { getAdditionalFiltersFields } from './get-additional-filters-fields'
import { getFieldsForSearch } from './get-fields-for-search'
import { getInitialSortModel } from './get-initial-sort-model'
import { getMainMethodUrl } from './get-main-method-url'
import { getTableColumns } from './get-table-columns'

export const getParsingReportsModelSettings = (activeTable: ParsingReportsType) => {
  const mainMethodURL = getMainMethodUrl(activeTable)
  const columnsModel = getTableColumns(activeTable)
  const additionalFiltersFields = getAdditionalFiltersFields(activeTable)
  const filtersFields = getFilterFields(columnsModel, additionalFiltersFields)
  const sortModel = getInitialSortModel(activeTable)
  const fieldsForSearch = getFieldsForSearch(activeTable)

  return {
    columnsModel,
    filtersFields,
    mainMethodURL,
    sortModel,
    fieldsForSearch,
  }
}
