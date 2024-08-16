import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell, UserLinkCell } from '@components/data-grid/data-grid-cells'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const inventoryColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = []

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.FEEDBACK
    }

    column.sortable = false
  }

  return columns
}
