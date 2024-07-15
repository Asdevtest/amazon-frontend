import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { DeleteIcon, EditIcon } from '@components/shared/svg-icons'

import { parseTextString } from '@utils/text'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { Roles } from '@typings/enums/roles'
import { IPatchNote } from '@typings/shared/patch-notes'

interface IModeratorUpdatedColumns {
  onToggleEditPatchNote: (data: IPatchNote) => void
  onClickRemovePatchNote: (id: string) => void
}

export const moderatorUpdatedColumns = ({
  onToggleEditPatchNote,
  onClickRemovePatchNote,
}: IModeratorUpdatedColumns) => [
  {
    field: 'title',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Title)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell threeLines leftAlign text={row.title} />,
    filterable: false,
    sortable: false,
    minWidth: 300,
  },

  {
    field: 'version',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Version)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell threeLines leftAlign text={row.version} />,
    filterable: false,
    sortable: false,
    minWidth: 160,
  },

  {
    field: 'description',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => (
      <MultilineTextCell threeLines leftAlign maxLength={310} text={parseTextString(row.description)} />
    ),
    filterable: false,
    sortable: false,
    minWidth: 400,
    flex: 1,
  },

  {
    field: 'role',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,
    renderCell: ({ row }: GridRowModel) => <MultilineTextCell text={Roles[row.role]} />,
    filterable: false,
    sortable: false,
    minWidth: 140,
  },

  {
    field: 'createdBy',
    headerName: t(TranslationKey['Created by']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Created by'])} />,
    renderCell: ({ row }: GridRowModel) => <UserLinkCell blackText name={row.author?.name} userId={row.author?._id} />,
    filterable: false,
    sortable: false,
    minWidth: 160,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.updatedAt} />,
    filterable: false,
    sortable: false,
    minWidth: 115,
  },

  {
    field: 'createdAt',
    headerName: t(TranslationKey.Created),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Created)} />,
    renderCell: ({ row }: GridRowModel) => <NormDateCell value={row.createdAt} />,
    minWidth: 115,
    filterable: false,
    sortable: false,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: ({ row }: GridRowModel) => (
      <ActionButtonsCell
        row
        iconButton
        isFirstButton
        isSecondButton
        firstButtonElement={<EditIcon />}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonElement={<DeleteIcon />}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => onToggleEditPatchNote(row)}
        onClickSecondButton={() => onClickRemovePatchNote(row._id)}
      />
    ),
    filterable: false,
    sortable: false,
    minWidth: 90,
    align: 'center',
  },
]
