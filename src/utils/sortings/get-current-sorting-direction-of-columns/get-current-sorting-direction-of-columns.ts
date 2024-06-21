import { tableSortMode } from '@constants/table/table-view-modes'

import { SortingModelType } from '@typings/shared/sorting-model'

/**
 * Get the current sorting direction for columns based on the provided sorting model and array of fields.
 *
 * @param {SortingModelType[]} model - An array of objects with 'sort' and 'field' properties.
 * @param {string[]} arrayFields - An array of field names to check against the model.
 * @returns {string} The current sorting direction, which can be 'DESC_NULLS_LAST', 'ASC' or 'DESC'.
 */
export const getCurrentSortingDirectionOfColumns = (model: SortingModelType[] | undefined, arrayFields: string[]) => {
  if (model?.length) {
    return model[0].sort.toUpperCase() === tableSortMode.DESC && arrayFields.includes(model[0].field)
      ? tableSortMode.DESC_NULLS_LAST
      : model[0].sort.toUpperCase()
  }

  return tableSortMode.DESC
}
