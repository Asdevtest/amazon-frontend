import { GridRowModel } from '@mui/x-data-grid-premium'

import { columnnsKeys } from '@constants/data-grid/data-grid-columns-keys'
import { DataGridFilterTables } from '@constants/data-grid/data-grid-filter-tables'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  SwitchCell,
  TextCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ProfileRequestStatus } from '@typings/enums/request/profile-request-status'
import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnsProps } from './parsing-profile-view.config'

export const parsingProfileViewColumns = (props: ColumnsProps) => {
  const { onEditProfileModal, onForceStart, onForceStop } = props

  const columns: IGridColumn[] = [
    {
      field: 'name',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.name} />,
      width: 220,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: ({ row }: GridRowModel) => <UserMiniCell userName={row.client?.name} userId={row.client?._id} />,
      valueGetter: ({ row }: GridRowModel) => row.client?.name || '',
      width: 160,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      hideEmptyObject: true,
    },
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.shop?.name} />,
      valueGetter: ({ row }: GridRowModel) => row.shop?.name || '',
      width: 220,
      columnKey: columnnsKeys.shared.OBJECT_VALUE,
      hideEmptyObject: true,
    },
    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.email} />,
      width: 280,
      columnKey: columnnsKeys.shared.STRING_VALUE,
    },
    {
      field: 'isActive',
      headerName: t(TranslationKey.Active),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Active)} />,
      renderCell: ({ row }: GridRowModel) => {
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
      renderCell: ({ row }: GridRowModel) => {
        return <TextCell center copyable={false} text={''} />
      },
      width: 130,
      disableCustomSort: true,
      filterable: false,
    },
    {
      field: 'access',
      headerName: t(TranslationKey.Access),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Access)} />,
      renderCell: ({ row }: GridRowModel) => {
        const text = row.access ? t(TranslationKey.Yes) : t(TranslationKey.No)
        return <TextCell center copyable={false} text={text} />
      },
      width: 90,
      disableCustomSort: true,
      filterable: false,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
      width: 115,
      columnKey: columnnsKeys.shared.DATE,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Actions),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Actions)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          isFirstButton
          isSecondButton
          disabledSecondButton={row?.status !== ProfileRequestStatus.INVITED}
          firstButtonElement={t(TranslationKey.Edit)}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={t(TranslationKey.Registered)}
          secondButtonStyle={ButtonStyle.PRIMARY}
          onClickFirstButton={() => onEditProfileModal(row)}
        />
      ),
      disableCustomSort: true,
      filterable: false,
      width: 180,
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
