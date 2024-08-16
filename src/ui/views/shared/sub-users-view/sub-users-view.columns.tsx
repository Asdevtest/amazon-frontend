import { BsPersonFillGear } from 'react-icons/bs'
import { MdOutlineDelete } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid-premium'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  TextCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { IGridColumn } from '@typings/shared/grid-column'

import { IColumnProps } from './sub-users-view.config'

export const subUsersColumns = ({ onClickRemove, onClickEdit, onClickSaveComment }: IColumnProps) => {
  const columns: IGridColumn[] = [
    {
      field: 'name',
      headerName: t(TranslationKey.User),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
      renderCell: ({ row }: GridRowModel) => (
        <UserCell userId={row?._id} name={row?.name} email={row?.email} rating={row?.rating} />
      ),
      width: 300,
    },
    {
      field: 'roles',
      headerName: t(TranslationKey.Roles),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,
      renderCell: ({ row }: GridRowModel) => <UserRolesCell user={row} />,
      width: 160,
    },
    {
      field: 'note',
      headerName: t(TranslationKey.Comment),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
      renderCell: ({ row }: GridRowModel) => (
        <TextCell
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
      renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
      width: 115,
    },
    {
      field: 'action',
      headerName: t(TranslationKey.Action),
      renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
      renderCell: ({ row }: GridRowModel) => (
        <ActionButtonsCell
          row
          isFirstButton
          isSecondButton
          iconButton
          firstButtonElement={<BsPersonFillGear style={{ fill: 'currentColor' }} />}
          firstButtonStyle={ButtonStyle.PRIMARY}
          secondButtonElement={<MdOutlineDelete size={18} />}
          secondButtonStyle={ButtonStyle.DANGER}
          secondDescriptionText="Are you sure you want to unbind the sub-user?"
          onClickFirstButton={() => onClickEdit(row)}
          onClickSecondButton={() => onClickRemove(row._id)}
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
