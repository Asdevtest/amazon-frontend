export interface IFilter<T> {
  filterData: T[]
  currentFilterData: T[]
}

export type FiltersObject<T> = Record<string, IFilter<T>>

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
