import { tableSortMode } from '@constants/table/table-view-modes'

import { SortingModelType } from '@typings/shared/sorting-model'

import { getCurrentSortingDirectionOfColumns } from './get-current-sorting-direction-of-columns'

describe('Test getCurrentSortingDirectionOfColumns', () => {
  it('should return DESC_NULLS_LAST when sort is DESC and field is in arrayFields', () => {
    const model: SortingModelType[] = [{ sort: 'desc', field: 'field1' }]
    const arrayFields = ['field1', 'field2']

    const result = getCurrentSortingDirectionOfColumns(model, arrayFields)

    expect(result).toBe(tableSortMode.DESC_NULLS_LAST)
  })

  it('should return ASC when sort is ASC and field is in arrayFields', () => {
    const model: SortingModelType[] = [{ sort: 'asc', field: 'field1' }]
    const arrayFields = ['field1', 'field2']

    const result = getCurrentSortingDirectionOfColumns(model, arrayFields)

    expect(result).toBe(tableSortMode.ASC)
  })

  it('should return DESC when sort is DESC and field is not in arrayFields', () => {
    const model: SortingModelType[] = [{ sort: 'desc', field: 'field1' }]
    const arrayFields = ['field2', 'field3']

    const result = getCurrentSortingDirectionOfColumns(model, arrayFields)

    expect(result).toBe(tableSortMode.DESC)
  })

  it('should return ASC when sort is ASC and field is not in arrayFields', () => {
    const model: SortingModelType[] = [{ sort: 'asc', field: 'field1' }]
    const arrayFields = ['field2', 'field3']

    const result = getCurrentSortingDirectionOfColumns(model, arrayFields)

    expect(result).toBe(tableSortMode.ASC)
  })

  it('should return DESC when model is empty', () => {
    const model: SortingModelType[] = []
    const arrayFields = ['field1', 'field2']

    const result = getCurrentSortingDirectionOfColumns(model, arrayFields)

    expect(result).toBe(tableSortMode.DESC)
  })

  it('should return DESC when model is undefined', () => {
    const model = undefined
    const arrayFields = ['field1', 'field2']

    const result = getCurrentSortingDirectionOfColumns(model, arrayFields)

    expect(result).toBe(tableSortMode.DESC)
  })
})
