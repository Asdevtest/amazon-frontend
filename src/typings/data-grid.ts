export interface ISortModel {
  field: string
  sort: string
}

export interface IColumnVisibilityModel {
  [key: string]: boolean
}

export interface IPaginationModel {
  page: number
  pageSize: number
}

export type RowHandlers = {
  navigateToHandler: (type: string, value: string) => void
}
