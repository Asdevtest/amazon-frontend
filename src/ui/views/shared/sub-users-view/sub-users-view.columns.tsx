import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { IGridColumn } from '@typings/shared/grid-column'

import { IColumnProps } from './sub-users-view.config'

export const subUsersColumns = ({ onClickRemove, onClickEdit, onClickSaveComment }: IColumnProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'name',
      headerName: t(TranslationKey.User),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
      renderCell: ({ row }) => <UserCell userId={row?._id} name={row?.name} email={row?.email} rating={row?.rating} />,
      width: 300,
    },

    {
      field: 'roles',
      headerName: t(TranslationKey.Roles),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,
      renderCell: ({ row }: GridRowModel) => <UserRolesCell user={row} />,
      width: 160,
      disableCustomSort: true,
    },

    {
      field: 'note',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }) => (
        <Text
          isCell
          editMode
          rows={4}
          maxLength={255}
          text={row?.note?.comment}
          onClickSubmit={reason => onClickSaveComment(row._id, reason)}
        />
      ),
      width: 500,
      disableCustomSort: true,
    },

    {
      field: 'updatedAt',
      headerName: t(TranslationKey.Updated),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
      renderCell: ({ row }) => <NormDateCell value={row.updatedAt} />,
      width: 115,
    },

    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
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
          secondConfirmText="Are you sure you want to unbind the sub-user?"
          onClickFirst={() => onClickEdit(row)}
          onClickSecond={() => onClickRemove(row._id)}
        />
      ),
      width: 100,
      disableCustomSort: true,
    },
  ]

  for (const column of columns) {
    column.sortable = false
    column.filterable = false
  }

  return columns
}
