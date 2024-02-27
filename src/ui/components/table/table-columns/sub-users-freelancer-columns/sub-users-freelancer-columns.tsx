/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GridRowParams } from '@mui/x-data-grid'

import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  CommentUsersCell,
  MultilineTextCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ISpec } from '@typings/shared/spec'

interface SubUsersFreelancerColumnsProps {
  onClickRemoveBtn: (row: GridRowParams) => void
  onClickEditBtn: (row: GridRowParams) => void
  onClickSaveComment: (id: string, comment?: string) => void
}

export const subUsersFreelancerColumns = (handlers: SubUsersFreelancerColumnsProps) => [
  {
    field: 'name',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
    width: 350,
    renderCell: (params: GridRowParams) => {
      const user = params.row
      return <UserCell userId={user?._id} name={user?.name} email={user?.email} rating={user?.rating} />
    },
  },

  {
    field: 'roles',
    headerName: t(TranslationKey.Roles),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,
    width: 215,
    renderCell: (params: GridRowParams) => <UserRolesCell user={params.row} />,
  },

  {
    field: 'spec',
    headerName: t(TranslationKey['Request type']),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey['Request type'])} />,
    renderCell: (params: GridRowParams) => {
      const stringForRender = params.row.allowedSpec?.map((spec: ISpec) => spec?.title).join('\n')

      return <MultilineTextCell leftAlign text={stringForRender} />
    },
    width: 110,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    width: 340,
    renderCell: (params: GridRowParams) => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        // @ts-ignore
        isFirstRow={params?.api?.getSortedRowIds()?.[0] === params.row.id}
        firstButtonTooltipText={t(TranslationKey["Editing an employee's permission list"])}
        firstButtonElement={t(TranslationKey['Assign permissions'])}
        firstButtonStyle={ButtonStyle.PRIMARY}
        secondButtonTooltipText={t(
          TranslationKey['Removing an employee from the list, banning and disabling access to the platform'],
        )}
        secondButtonElement={t(TranslationKey.Remove)}
        secondButtonStyle={ButtonStyle.DANGER}
        onClickFirstButton={() => handlers.onClickEditBtn(params.row)}
        onClickSecondButton={() => handlers.onClickRemoveBtn(params.row)}
      />
    ),
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },

  {
    field: 'note',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    width: 335,
    renderCell: (params: GridRowParams) => (
      <CommentUsersCell
        comment={params?.row?.note?.comment}
        handler={comment => handlers.onClickSaveComment(params?.row?._id, comment)}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: (params: GridRowParams) => <NormDateCell value={params.row.originalData.updatedAt} />,
    width: 100,
  },
]
