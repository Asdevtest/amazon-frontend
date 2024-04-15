import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { EditIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Roles } from '@typings/enums/roles'
import { IPatchNote } from '@typings/shared/patch-notes'

interface IModeratorUpdatedColumns {
  onToggleEditPatchNote: (data: IPatchNote) => void
}

export const moderatorUpdatedColumns = ({ onToggleEditPatchNote }: IModeratorUpdatedColumns) => [
  {
    field: 'title',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell threeLines leftAlign text={row.title} />,
    filterable: false,
    sortable: false,
    width: 300,
  },

  {
    field: 'description',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell threeLines leftAlign maxLength={310} text={row.description} />
    ),
    filterable: false,
    sortable: false,
    width: 400,
    flex: 1,
  },

  {
    field: 'role',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={Roles[row.role]} />,
    filterable: false,
    sortable: false,
    width: 140,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }: GridRowModel) => <UserLinkCell blackText name={row.author?.name} userId={row.author?._id} />,
    filterable: false,
    sortable: false,
    width: 160,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    filterable: false,
    sortable: false,
    width: 115,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
    width: 115,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        isFirstButton
        iconButton
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        onClickFirstButton={() => onToggleEditPatchNote(row)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 80,
    align: 'center',
  },
]
