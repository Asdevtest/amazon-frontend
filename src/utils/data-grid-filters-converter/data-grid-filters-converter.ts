interface ColumnMenuSettings {
  [key: string]: {
    currentFilterData: string[] | number[] | Array<Record<string, unknown>>
  }
}

const onlyDigitsRegex = /^\d+$/

const searchOperatorByColumn = {
  $eq: ['humanFriendlyId', 'id'],
}

const onlyNumberColumns = ['humanFriendlyId', 'id']

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
) => {
  // * Проходимся по списку колонок для поиска и создаем фильтр для каждой
  const searchFieldsArray = searchValue
    ? searchFields
        .map(el => {
          let operator = '$contains'

          for (const key in searchOperatorByColumn) {
            if (searchOperatorByColumn[key as keyof typeof searchOperatorByColumn].includes(el)) {
              operator = key
              break
            }
          }

          return {
            [el]: { [operator]: searchValue },
          }
        })
        .filter(el => {
          const key = Object.keys(el)[0]

          if (onlyNumberColumns.includes(key)) {
            return onlyDigitsRegex.test(searchValue)
          }

          return true
        })
    : []

  // * Проходимся по всем колонкам, получаем фильтра для каждой и генерируем итоговый объект
  const columnFilters = columns.reduce((acc, column) => {
    const filterList = exclusion !== column ? columnMenuSettings[column].currentFilterData : []

    if (filterList.length === 0) {
      return acc
    }

    let finalFilterString = ''

    filterList.forEach(item => {
      if (typeof item === 'object') {
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
      [column]: {
        $eq: finalFilterString.substring(0, finalFilterString.length - 1),
      },
    }

    return acc
  }, {})

  return {
    or: searchFieldsArray,
    ...columnFilters,
    ...additionalOptions,
  }
}
