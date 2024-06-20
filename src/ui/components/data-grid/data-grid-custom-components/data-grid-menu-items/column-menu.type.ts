import { IFilter } from '@utils/data-grid-filters'

import { loadingStatus } from '@typings/enums/loading-status'

export interface HookParams<T> {
  field: string
  table: string
  filtersData: IFilter<T>
  onClickFilterBtn: (field: string, table: string) => void
}

export interface ColumnMenuProps<T> {
  field: string
  table: string
  filtersData: IFilter<T>
  filterRequestStatus: loadingStatus
  onClose: () => void
  onClickFilterBtn: (field: string, table: string) => void
  onChangeFullFieldMenuItem: (chosenItems: T[], field: string) => void
  onClickAccept: () => void
}
