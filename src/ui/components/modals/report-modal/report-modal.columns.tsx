import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { Launches } from '@components/shared/launches'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const reportModalColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => <Launches cell launches={row.listingLaunches || []} />,
      width: 330,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell leftAlign threeLines maxLength={200} text={row.description} />
      ),
      width: 330,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.disableColumnMenu = true
  }

  return columns
}
