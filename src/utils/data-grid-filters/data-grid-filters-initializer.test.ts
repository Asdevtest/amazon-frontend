import { dataGridFiltersInitializer } from './data-grid-filters-initializer'

describe('dataGridFiltersInitializer', () => {
  it('returns an empty FiltersObject when provided with an empty array of fields', () => {
    const fields: string[] = []
    const result = dataGridFiltersInitializer<any>(fields)

    const expected = {}
    expect(result).toEqual(expected)
  })

  it('returns a FiltersObject with correct structure when provided with a non-empty array of fields', () => {
    const fields: string[] = ['field1', 'field2', 'field3']
    const result = dataGridFiltersInitializer<number>(fields)

    const expected = {
      field1: {
        filterData: [],
        currentFilterData: [],
      },
      field2: {
        filterData: [],
        currentFilterData: [],
      },
      field3: {
        filterData: [],
        currentFilterData: [],
      },
    }
    expect(result).toEqual(expected)
  })

  it('returns a FiltersObject with correct structure when provided with an array of fields of different types', () => {
    const fields: string[] = ['field1', 'field2', 'field3']
    const result = dataGridFiltersInitializer<string | boolean>(fields)

    const expected = {
      field1: {
        filterData: [],
        currentFilterData: [],
      },
      field2: {
        filterData: [],
        currentFilterData: [],
      },
      field3: {
        filterData: [],
        currentFilterData: [],
      },
    }
    expect(result).toEqual(expected)
  })
})
