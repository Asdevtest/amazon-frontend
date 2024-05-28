import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextCell, MultilineTextHeaderCell } from '@components/data-grid/data-grid-cells'
import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

export const reportModalColumns = () => {
  const columns: IGridColumn[] = [
    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell leftAlign text={getLaunchName(row.type)} />,
      width: 205,
    },

    {
      field: 'value',
      headerName: t(TranslationKey.Discount),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Discount)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={getLaunchName(row.type)} />,
      width: 100,
    },

    {
      field: 'dates',
      headerName: t(TranslationKey.Dates),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Dates)} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={getLaunchName(row.type)} />,
      width: 180,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell leftAlign threeLines maxLength={200} text={row.comment} />
      ),
      width: 220,
    },

    {
      field: 'result',
      headerName: t(TranslationKey.Result),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Result)} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell leftAlign threeLines maxLength={200} text={row.comment} />
      ),
      width: 220,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.disableColumnMenu = true
  }

  return columns
}
