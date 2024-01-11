interface ColumnMenuSettings {
  [key: string]: {
    currentFilterData: string[] | number[] | Array<Record<string, unknown>>
  }
}

type FilterObject = {
  [key: string]: { [operator: string]: string }
}

type FilterList = {
  or: FilterObject[]
  [field: string]: FilterObject | FilterObject[] | Record<string, unknown>
}

const onlyDigitsRegex = /^\d+$/
const onlyNumberColumns = ['humanFriendlyId', 'id', 'orderHumanFriendlyId']

const searchOperatorByColumn = {
  $eq: ['humanFriendlyId', 'id', 'orderHumanFriendlyId', 'orderHumanFriendlyId', 'productId'],
}
const filterOperatorByColumn = {
  $any: ['tags', 'redFlags'],
}

const setValueForFilter = (column: string, FilterString: string) => {
  const FinalFilterString = FilterString.substring(0, FilterString.length - 1)

  let operator = '$eq'

  for (const key in filterOperatorByColumn) {
    if (filterOperatorByColumn[key as keyof typeof filterOperatorByColumn].includes(column)) {
      operator = key
      break
    }
  }

  return { [operator]: FinalFilterString }
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
        finalFilterString += `${item._id},`
      } else {
        const isHaveMultipleWords = typeof item === 'string' && item.split(' ').length > 1

        if (isHaveMultipleWords) {
          finalFilterString += `"${item}",`
        } else {
          finalFilterString += `${item},`
        }
      }
    })

    acc = {
      ...acc,
      [column]: setValueForFilter(column, finalFilterString),
    }

    return acc
  }, {})

  return {
    or: searchFieldsArray,
    ...columnFilters,
    ...additionalOptions,
  }
}
