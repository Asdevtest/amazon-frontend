import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  ShortDateCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { Launches } from '@components/shared/launches'
import { EditIcon } from '@components/shared/svg-icons'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IGridColumn } from '@typings/shared/grid-column'

interface ReportsViewColumnsProps {
  onToggleReportModalEditMode: (reportId: string) => void
}

export const reportsViewColumns = ({ onToggleReportModalEditMode }: ReportsViewColumnsProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) =>
        row.isActive ? (
          <ActionButtonsCell
            iconButton
            fullWidth
            isFirstButton
            firstButtonElement={<EditIcon />}
            firstButtonStyle={ButtonStyle.PRIMARY}
            onClickFirstButton={() => onToggleReportModalEditMode(row._id)}
          />
        ) : null,
      disableCustomSort: true,
      disableColumnMenu: true,
      filterable: false,
      width: 95,
    },

    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <ShortDateCell value={row.createdAt} />,
      width: 100,
      columnKey: columnnsKeys.shared.DATE,
    },

    {
      field: 'launchType',
      headerName: t(TranslationKey['Launch type']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Launch type'])} />,
      renderCell: ({ row }: GridRowModel) => <Launches isCell launches={row.listingLaunches || []} />,
      width: 330,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'newProductPrice',
      headerName: t(TranslationKey['New product price']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['New product price'])} />,
      renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={toFixedWithDollarSign(row.newProductPrice)} />,
      width: 140,
      columnKey: columnnsKeys.shared.QUANTITY,
    },

    {
      field: 'createdBy',
      headerName: t(TranslationKey['Created by']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
      renderCell: ({ row }: GridRowModel) => (
        <UserMiniCell userName={row.sub?.name || row.createdBy?.name} userId={row.sub?._id || row.createdBy?._id} />
      ),
      width: 180,
      disableCustomSort: true,
      columnKey: columnnsKeys.freelancer.FREELANCE_PROPOSALS_CREATED_BY,
    },

    {
      field: 'description',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }: GridRowModel) => (
        <MultilineTextCell leftAlign threeLines maxLength={200} text={row.description} />
      ),
      flex: 1,
      columnKey: columnnsKeys.shared.STRING,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <ShortDateCell value={row.updatedAt} />,
      width: 105,
      columnKey: columnnsKeys.shared.DATE,
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
