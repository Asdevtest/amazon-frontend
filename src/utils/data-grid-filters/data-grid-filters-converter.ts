interface ColumnMenuSettings {
  [key: string]: {
    currentFilterData: string[] | number[] | Array<Record<string, unknown>> | boolean[]
  }
}

type FilterObject = {
  [key: string]: { [operator: string]: string }
}

type FilterList = {
  or: FilterObject[]
  [field: string]: FilterObject | FilterObject[] | Record<string, unknown>
}

type OperatorsSettingsType = {
  [key: string]: string
}

const onlyDigitsRegex = /^\d+$/
const onlyNumberColumns = ['xid', 'id', 'orderXid', 'batchXid', 'requestXid']

const searchOperatorByColumn = {
  $eq: ['xid', 'id', 'orderXid', 'requestXid', 'productId', 'batchXid', 'productCount'],
}
const filterOperatorByColumn = {
  $any: ['tags', 'redFlags', 'buyer', 'createdBy'],
}

const setValueForFilter = (column: string, filterString: string, operatorsSettings?: OperatorsSettingsType) => {
  const finalFilterString = filterString.substring(0, filterString.length - 1)

  let operator = '$eq'

  if (operatorsSettings) {
    const key = operatorsSettings[column]

    if (key) {
      operator = key
    }
  } else {
    for (const key in filterOperatorByColumn) {
      if (filterOperatorByColumn[key as keyof typeof filterOperatorByColumn].includes(column)) {
        operator = key
        break
      }
    }
  }

  return { [operator]: finalFilterString }
}

const setValueForSearch = (searchField: string, searchValue: string) => {
  let operator = '$contains'

  for (const key in searchOperatorByColumn) {
    if (searchOperatorByColumn[key as keyof typeof searchOperatorByColumn].includes(searchField)) {
      operator = key
      break
    }
  }

  return {
    [searchField]: { [operator]: searchValue },
  }
}

/*
 * Функция для генераций объекта фильтров таблицы
 *
 * @columnMenuSettings {ColumnMenuSettings} - объект с настройками колонок
 * @searchValue {string} - значение поиска
 * @exclusion {string} - колонка для исключения
 * @columns {string[]} - список колонок доступных для фильтрации
 * @searchFields {string[]} - список полей для поиска
 * @additionalOptions {Record<string, unknown>} - дополнительные опции
 */
export const dataGridFiltersConverter = (
  columnMenuSettings: ColumnMenuSettings,
  searchValue: string,
  exclusion = '',
  columns: string[],
  searchFields: string[] = [],
  additionalOptions?: Record<string, unknown>,
  operatorsSettings?: OperatorsSettingsType,
  defaultFilterParams?: Record<string, unknown>,
): FilterList => {
  // * Проходимся по списку колонок для поиска и создаем фильтр для каждой
  const searchFieldsArray: FilterObject[] = searchValue
    ? searchFields
        .map(searchField => setValueForSearch(searchField, searchValue))
        .filter(el => {
          const key = Object.keys(el)[0]

          if (onlyNumberColumns.includes(key)) {
            return onlyDigitsRegex.test(searchValue)
          }

          return true
        })
    : []

  // * Проходимся по всем колонкам, получаем фильтра для каждой и генерируем итоговый объект
  const columnFilters: FilterObject = columns.reduce((acc, column) => {
    const filterList = exclusion !== column ? columnMenuSettings[column].currentFilterData : []

    if (filterList.length === 0) {
      return acc
    }

    let finalFilterString = ''

    filterList.forEach(item => {
      if (typeof item === 'object' && item) {
        finalFilterString += `"${item._id}",`
      } else if (typeof item === 'boolean') {
        finalFilterString += `${item},`
      } else {
        finalFilterString += `"${item}",`
      }
    })

    acc = {
      ...acc,
      [column]: setValueForFilter(column, finalFilterString, operatorsSettings),
    }

    return acc
  }, {})

  return {
    or: searchFieldsArray,
    ...defaultFilterParams,
    ...columnFilters,
    ...additionalOptions,
  }
}
