import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  SwitchCell,
  UserCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { convertToSentenceCase } from '@utils/text'
import { t } from '@utils/translations'

import { ProfileStatus } from '@typings/enums/request/profile-request-status'
import { IGridColumn } from '@typings/shared/grid-column'

import { getProfileStatusColor } from './helpers/get-profile-status-color'
import { ColumnsProps } from './parsing-profile-view.config'

export const parsingProfileViewColumns = (props: ColumnsProps) => {
  const { onEditProfileModal, onForceStart, onForceStop, onParsingProfileRegistred, onEditProfileComment } = props

  const columns: IGridColumn[] = [
    {
      field: 'name',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.name} />,
      width: 160,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: ({ row }: GridRowModel) => (
        <UserCell name={row.client?.name} id={row.client?._id} email={row.client?.email} />
      ),
      valueGetter: ({ row }: GridRowModel) => row.client?.name || '',
      width: 160,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.shop?.name} />,
      valueGetter: ({ row }: GridRowModel) => row.shop?.name || '',
      width: 160,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
    },
    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
      renderCell: ({ row }: GridRowModel) => <Text isCell text={row.email} />,
      width: 200,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'isActive',
      headerName: t(TranslationKey.Active),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Active)} />,
      renderCell: ({ row }) => {
        const value = [row._id]
        const handleSubmit = () => (row.isActive ? onForceStop(value) : onForceStart(value))
        const disabled = !row.client?._id || !row.access

        return <SwitchCell disabled={disabled} value={row.isActive} onClick={handleSubmit} />
      },
      width: 90,
      disableCustomSort: true,
      filterable: false,
    },
    {
      field: 'status',
      headerName: t(TranslationKey['Profile status']),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Profile status'])} />,
      renderCell: ({ row }) => {
        const text = t(TranslationKey[convertToSentenceCase(row.status) as TranslationKey])

        return <Text isCell center copyable={false} color={getProfileStatusColor(row.status)} text={text} />
      },
      width: 145,
      columnKey: columnnsKeys.shared.STRING_VALUE,
      transformValueMethod: value => t(TranslationKey[convertToSentenceCase(value) as TranslationKey]),
    },
    {
      field: 'access',
      headerName: t(TranslationKey.Access),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Access)} />,
      renderCell: ({ row }) => {
        const text = row.access ? t(TranslationKey.Yes) : t(TranslationKey.No)

        return <Text isCell center copyable={false} text={text} />
      },
      width: 70,
      disableCustomSort: true,
      filterable: false,
    },
    {
      field: 'comment',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }: GridRowModel) => (
        <Text isCell editMode text={row.comment} onClickSubmit={value => onEditProfileComment(row?._id, value)} />
      ),
      width: 200,
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
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
      width: 110,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          showFirst
          showSecond
          secondDisabled={row?.status !== ProfileStatus.INVITED}
          firstContent={t(TranslationKey.Edit)}
          secondContent={t(TranslationKey.Registered)}
          onClickFirst={() => onEditProfileModal(row)}
          onClickSecond={() => onParsingProfileRegistred(row._id)}
        />
      ),
      disableCustomSort: true,
      filterable: false,
      width: 160,
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
