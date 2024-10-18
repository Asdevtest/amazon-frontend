import { FaEye } from 'react-icons/fa'
import { MdOutlineDelete } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MediaContentCell,
  MultilineTextHeaderCell,
  NormDateCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnProps } from './feedback-view.config'

export const feedbackViewColumns = ({ onToggleTicketForm, onRemoveTicket }: ColumnProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
      width: 110,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.status} />,
      width: 120,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'title',
      headerName: t(TranslationKey.Title),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.title} />,
      width: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'text',
      headerName: t(TranslationKey.Description),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.text} />,
      flex: 1,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'media',
      headerName: t(TranslationKey['User files']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['User files'])} />,
      renderCell: ({ row }: GridRowModel) => <MediaContentCell image={row.media?.[0]} />,
      width: 90,
      filterable: false,
      disableCustomSort: true,
    },
    {
      field: 'responseText',
      headerName: t(TranslationKey.Response),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Response)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.responseText} />,
      flex: 1,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'responseMedia',
      headerName: t(TranslationKey['Response files']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Response files'])} />,
      renderCell: ({ row }: GridRowModel) => <MediaContentCell image={row.responseMedia?.[0]} />,
      width: 90,
      filterable: false,
      disableCustomSort: true,
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
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          row
          showFirst
          showSecond
          secondDanger
          firstGhost
          secondGhost
          firstIcon={<FaEye size={16} />}
          secondIcon={<MdOutlineDelete size={16} />}
          onClickFirst={() => onToggleTicketForm(row)}
          onClickSecond={() => onRemoveTicket(row._id)}
        />
      ),
      disableCustomSort: true,
      filterable: false,
      width: 90,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.PARSING_PROFILES
    }

    column.sortable = false
  }

  return columns
}
