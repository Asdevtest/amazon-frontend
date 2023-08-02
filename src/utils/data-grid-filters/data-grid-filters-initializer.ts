type FiltersObject<T> = Record<
  string,
  {
    filterData: T[]
    currentFilterData: T[]
  }
>
export const dataGridFiltersInitializer = <T>(fields: string[]): FiltersObject<T> => {
  return fields.reduce(
    (ac, cur) =>
      (ac = {
        ...ac,
        [cur]: {
          filterData: [],
          currentFilterData: [],
        },
      }),
    {},
  )
}
