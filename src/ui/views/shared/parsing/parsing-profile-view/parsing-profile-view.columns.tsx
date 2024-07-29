import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  TextCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { EditIcon } from '@components/shared/svg-icons'

import { formatShortDateTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnsProps } from './parsing-profile-view.config'

export const parsingProdileViewColumns = ({ onEditProfileModal }: ColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'name',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.name} />,
      width: 130,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: r => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: ({ row }: GridRowModel) => (
        <UserMiniCell userName={row.createdBy?.name} userId={row.createdBy?._id} />
      ),
      width: 160,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.product?.shop?.name} />,
      width: 120,
      columnKey: columnnsKeys.shared.OBJECT,
    },
    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.email} />,
      width: 160,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
      valueGetter: (row: GridRowModel) => formatShortDateTime(row?.updatedAt),
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
      valueGetter: (row: GridRowModel) => formatShortDateTime(row?.createdAt),
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          iconButton
          isFirstButton
          firstButtonElement={<EditIcon />}
          firstButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={() => onEditProfileModal(row._id)}
        />
      ),
      disableExport: true,
      disableCustomSort: true,
      disableColumnMenu: true,
      filterable: false,
      width: 100,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PRODUCT_LISTING_REPORTS
    }

    column.sortable = false
  }

  return columns
}
