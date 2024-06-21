import { dataGridFiltersConverter } from './data-grid-filters-converter'

describe('dataGridFiltersConverter', () => {
  // Mock the columnMenuSettings object for testing purposes
  const columnMenuSettings = {
    humanFriendlyId: {
      currentFilterData: ['123', '456'],
    },
    id: {
      currentFilterData: [{ _id: '123' }, { _id: '456' }],
    },
    description: {
      currentFilterData: ['description1', 'large description'],
    },
    title: {
      currentFilterData: ['title'],
    },
  }

  it('should generate a filter list with only searchFieldsArray when no columns are provided', () => {
    const searchValue = 'searchValue'
    const searchFields: string[] = ['title']
    const columns: string[] = []
    const expectedFilterList = {
      or: [{ title: { $contains: searchValue } }],
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, '', columns, searchFields)

    expect(result).toEqual(expectedFilterList)
  })

  it('should generate a filter list with only columnFilters when no searchValue is provided', () => {
    const searchValue = ''
    const columns: string[] = ['humanFriendlyId', 'id', 'description']
    const expectedFilterList = {
      or: [],
      humanFriendlyId: { $eq: '123,456' },
      id: { $eq: '123,456' },
      description: { $eq: 'description1,"large description"' },
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, '', columns)

    expect(result).toEqual(expectedFilterList)
  })

  it('should generate a filter list with both searchFieldsArray and columnFilters', () => {
    const searchValue = 'searchValue'
    const searchFields: string[] = ['title']
    const columns: string[] = ['humanFriendlyId', 'id']
    const expectedFilterList = {
      or: [{ title: { $contains: searchValue } }],
      humanFriendlyId: { $eq: '123,456' },
      id: { $eq: '123,456' },
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, '', columns, searchFields)

    expect(result).toEqual(expectedFilterList)
  })

  it('should handle exclusion correctly and generate columnFilters excluding the excluded column', () => {
    const searchValue = ''
    const columns: string[] = ['humanFriendlyId', 'id']
    const exclusion = 'humanFriendlyId'
    const expectedFilterList = {
      or: [],
      id: { $eq: '123,456' },
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, exclusion, columns)

    expect(result).toEqual(expectedFilterList)
  })

  it('should handle additionalOptions correctly and include them in the final filter list', () => {
    const searchValue = ''
    const columns: string[] = ['humanFriendlyId', 'id']
    const additionalOptions = {
      sort: 'desc',
    }
    const expectedFilterList = {
      or: [],
      humanFriendlyId: { $eq: '123,456' },
      id: { $eq: '123,456' },
      sort: 'desc',
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, '', columns, [], additionalOptions)

    expect(result).toEqual(expectedFilterList)
  })

  it('should handle the case when only number columns are provided in searchFields and generate the correct filters', () => {
    const searchValue = '123'
    const columns: string[] = ['humanFriendlyId', 'id']
    const searchFields: string[] = ['humanFriendlyId']
    const expectedFilterList = {
      or: [{ humanFriendlyId: { $eq: '123' } }],
      humanFriendlyId: { $eq: '123,456' },
      id: { $eq: '123,456' },
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, '', columns, searchFields)

    expect(result).toEqual(expectedFilterList)
  })

  it('should handle the case when number and string columns are provided in searchFields and generate the correct filters', () => {
    const searchValue = '123'
    const columns: string[] = ['humanFriendlyId', 'id', 'title']
    const searchFields: string[] = ['humanFriendlyId', 'title']
    const expectedFilterList = {
      or: [{ humanFriendlyId: { $eq: searchValue } }, { title: { $contains: searchValue } }],
      humanFriendlyId: { $eq: '123,456' },
      id: { $eq: '123,456' },
      title: { $eq: 'title' },
    }

    const result = dataGridFiltersConverter(columnMenuSettings, searchValue, '', columns, searchFields)

    expect(result).toEqual(expectedFilterList)
  })
})
