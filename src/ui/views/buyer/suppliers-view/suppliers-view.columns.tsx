import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, OpenInNewTabCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const suppliersViewColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'link',
      headerName: t(TranslationKey.Link),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Link)} />,
      renderCell: () => <OpenInNewTabCell isFullSize onClickOpenInNewTab={() => console.log('link :>> ')} />,
      width: 80,

      filterable: false,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCTS
    }

    column.sortable = false
  }

  return columns
}
