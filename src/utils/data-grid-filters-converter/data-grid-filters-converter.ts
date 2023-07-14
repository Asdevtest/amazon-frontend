interface ColumnMenuSettings {
  [key: string]: {
    currentFilterData: string[] | Array<Record<string, unknown>>
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
) => {
  // * Проходимся по списку колонок для поиска и создаем фильтр для каждой
  const searchFieldsArray = searchFields.map(el => {
    return {
      [el]: { $contains: searchValue },
    }
  })

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
        finalFilterString += `${item},`
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
