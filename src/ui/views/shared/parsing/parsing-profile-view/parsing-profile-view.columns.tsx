import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  SwitchCell,
  TextCell,
  UserMiniCell,
} from '@components/data-grid/data-grid-cells'
import { EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IGridColumn } from '@typings/shared/grid-column'

import { ColumnsProps } from './parsing-profile-view.config'

export const parsingProdileViewColumns = (props: ColumnsProps) => {
  const { onEditProfileModal, onForceStart, onForceStop } = props

  const columns: IGridColumn[] = [
    {
      field: 'name',
      headerName: t(TranslationKey.Name),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Name)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.name} />,
      width: 240,
    },
    {
      field: 'client',
      headerName: t(TranslationKey.Client),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Client)} />,
      renderCell: ({ row }: GridRowModel) => <UserMiniCell userName={row.client?.name} userId={row.client?._id} />,
      width: 160,
    },
    {
      field: 'shop',
      headerName: t(TranslationKey.Shop),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Shop)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.shop?.name} />,
      width: 240,
    },
    {
      field: 'email',
      headerName: t(TranslationKey.Email),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Email)} />,
      renderCell: ({ row }: GridRowModel) => <TextCell text={row.email} />,
      width: 360,
    },
    {
      field: 'status',
      headerName: t(TranslationKey.Status),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Status)} />,
      renderCell: ({ row }: GridRowModel) => {
        const value = [row._id]
        const handleSubmit = () => (row.isActive ? onForceStop(value) : onForceStart(value))

        return <SwitchCell value={row.isActive} onClick={handleSubmit} />
      },
      width: 100,
    },
    {
      field: 'access',
      headerName: t(TranslationKey.Access),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Access)} />,
      renderCell: ({ row }: GridRowModel) => {
        const text = row.isActive ? t(TranslationKey.Yes) : t(TranslationKey.No)
        return <TextCell center copyable={false} text={text} />
      },
      width: 100,
    },
    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
      width: 115,
    },
    {
      field: 'createdAt',
      headerName: t(TranslationKey.Created),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
      width: 115,
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
          onClickFirstButton={() => onEditProfileModal(row)}
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
    column.sortable = false
    column.filterable = false
  }

  return columns
}