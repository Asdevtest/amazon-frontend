import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import { MultilineTextHeaderCell, NormDateCell, UserMiniCell } from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ParsingRequestCell } from './parsing-request-cell'
import { ColumnsProps } from './parsing-requests-view.config'

export const parsingRequestsViewColumns = ({ onApproveProfile, onRejectProfile }: ColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: ({ row }) => <UserMiniCell userName={row.client?.name} userId={row.client?._id} />,
      valueGetter: ({ row }: GridRowModel) => row.client?.name || '',
      width: 160,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      hideEmptyObject: true,
    },
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }) => <Text isCell text={row.shop?.name} />,
      valueGetter: ({ row }: GridRowModel) => row.shop?.name || '',
      width: 240,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      hideEmptyObject: true,
    },
    {
      field: 'profileName',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
      renderCell: ({ row }) => <Text isCell text={row.profile?.name} />,
      valueGetter: ({ row }: GridRowModel) => row.profile?.name || '',
      width: 240,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'profileEmail',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
      renderCell: ({ row }) => <Text isCell text={row.profile?.email} />,
      valueGetter: ({ row }: GridRowModel) => row.profile?.email || '',
      width: 240,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }) => <NormDateCell value={row.createdAt} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'actions',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }) => (
        <ParsingRequestCell
          status={row.status}
          onApproveProfile={() => onApproveProfile(row._id, row.profile?._id)}
          onRejectProfile={() => onRejectProfile(row._id)}
        />
      ),
      width: 160,
      disableCustomSort: true,
      filterable: false,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PARSING_REQUESTS
    }

    column.sortable = false
  }

  return columns
}
