import { MdOutlineDelete, MdOutlineEdit } from 'react-icons/md'

import { GridRowModel } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserLinkCell,
} from '@components/data-grid/data-grid-cells'
import { Text } from '@components/shared/text'

import { parseTextString } from '@utils/text'
import { t } from '@utils/translations'

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
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.title} />,
    filterable: false,
    sortable: false,
    width: 290,
  },

  {
    field: 'version',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Version)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={row.version} />,
    filterable: false,
    sortable: false,
    width: 160,
  },

  {
    field: 'description',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Description)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={parseTextString(row.description)} />,
    filterable: false,
    sortable: false,
    width: 400,
    flex: 1,
  },

  {
    field: 'role',
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Role)} />,
    renderCell: ({ row }: GridRowModel) => <Text isCell text={Roles[row.role]} />,
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
        row
        showFirst
        showSecond
        secondDanger
        firstGhost
        secondGhost
        firstIcon={<MdOutlineEdit size={16} />}
        secondIcon={<MdOutlineDelete size={16} />}
        onClickFirst={() => onToggleEditPatchNote(row)}
        onClickSecond={() => onClickRemovePatchNote(row._id)}
      />
    ),
    filterable: false,
    sortable: false,
    width: 100,
    align: 'center',
  },
]
