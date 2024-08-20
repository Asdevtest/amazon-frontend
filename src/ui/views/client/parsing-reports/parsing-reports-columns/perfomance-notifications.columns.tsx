import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, TextCell, UserLinkCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingReportsType } from '../parsing-reports.type'

export const perfomanceNotificationsColumns = () => {
  const columns: IGridColumn<ParsingReportsType>[] = [
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,

      renderCell: params => <TextCell text={params.row?.shop?.name} />,
      width: 90,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'client',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,

      renderCell: params => <UserLinkCell blackText name={params.row.client?.name} userId={params.row.client?._id} />,
      width: 110,

      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      disableCustomSort: true,
    },

    {
      field: 'dateUpdated',
      headerName: 'Date updated',
      renderHeader: () => <MultilineTextHeaderCell text="Date updated" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'amzId',
      headerName: 'Amz id',
      renderHeader: () => <MultilineTextHeaderCell text="Amz id" />,

      renderCell: params => <TextCell text={params.value?.replaceAll('_', ' ')} />,
      transformValueMethod: value => value?.replaceAll('_', ' '),
      width: 115,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'date',
      headerName: 'Date',
      renderHeader: () => <MultilineTextHeaderCell text="Date" />,
      renderCell: params => <NormDateCell value={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'title',
      headerName: 'Title',
      renderHeader: () => <MultilineTextHeaderCell text="Title" />,
      renderCell: params => <TextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },

    {
      field: 'text',
      headerName: 'Text',
      renderHeader: () => <MultilineTextHeaderCell text="Text" />,
      renderCell: params => <TextCell text={params.value} />,
      width: 120,

      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = ParsingReportsType.PERFOMANCE_NOTIFICATIONS
    }

    column.sortable = false
  }

  return columns
}
