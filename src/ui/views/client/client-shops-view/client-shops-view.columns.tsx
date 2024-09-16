import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  SwitchCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ProfileRequestStatus } from '@typings/enums/request/profile-request-status'
import { IGridColumn } from '@typings/shared/grid-column'

import { IColumnProps } from './client-shops-view.types'
import { ParsingAccessCell } from './components/parsing-access-cell'
import { ParsingProfileCell } from './components/parsing-profile-cell'

export const shopsColumns = (props: IColumnProps) => {
  const { onRemoveShop, onEditShop, onParsingProfile, onParsingAccess, onParsingStatus, onParsingProfileInvited } =
    props

  const columns: IGridColumn[] = [
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'name',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }) => <Text isCell text={row.name} />,
      width: 240,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'profileEmail',
      headerName: t(TranslationKey['Parsing profile']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parsing profile'])} />,
      renderCell: ({ row }) => <ParsingProfileCell profile={row.profile} onConfirm={() => onParsingProfile(row._id)} />,
      valueGetter: ({ row }) => row.profile?.email || '',
      width: 320,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'access',
      headerName: t(TranslationKey.Access),
      renderHeader: () => (
        <MultilineTextHeaderCell
          text={`${t(TranslationKey.Access)} ${t(TranslationKey.and)} ${t(TranslationKey.invitation)}`}
        />
      ),
      renderCell: ({ row }) => (
        <ParsingAccessCell
          profile={row.profile}
          onAccess={() => onParsingAccess(row.profile?.email)}
          onParsingProfileInvited={() => onParsingProfileInvited(row.profile?._id)}
        />
      ),
      valueGetter: ({ row }) => row.profile?.access,
      width: 200,
      disableCustomSort: true,
      filterable: false,
    },
    {
      field: 'status',
      headerName: t(TranslationKey['Parsing status']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Parsing status'])} />,
      valueGetter: ({ row }) => row.profile?.status || '',
      renderCell: ({ row }) => {
        const disabled =
          !row.profile ||
          [ProfileRequestStatus.PENDING, ProfileRequestStatus.REJECTED].includes(row.profile?.requestStatus) ||
          !row.profile?.access

        return (
          <SwitchCell
            disabled={disabled}
            value={row.profile?.isActive}
            onClick={() => onParsingStatus(row.profile?._id, !row.profile?.isActive)}
          />
        )
      },
      width: 160,
      disableCustomSort: true,
      filterable: false,
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
          firstIcon={<MdOutlineEdit size={16} />}
          secondIcon={<MdOutlineDelete size={16} />}
          secondDescription="Are you sure you want to delete the store?"
          onClickFirst={() => onEditShop(row)}
          onClickSecond={() => onRemoveShop(row._id)}
        />
      ),
      minWidth: 90,
      filterable: false,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    if (!column.table) {
      column.table = DataGridFilterTables.SHOPS
    }

    column.sortable = false
  }

  return columns
}
