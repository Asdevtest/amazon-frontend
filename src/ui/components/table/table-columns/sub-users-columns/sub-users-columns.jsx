import { TranslationKey } from '@constants/translations/translation-key'

import {
  ActionButtonsCell,
  CommentUsersCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

export const subUsersColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,
    renderCell: ({ row }) => <UserCell userId={row?._id} name={row?.name} email={row?.email} rating={row?.rating} />,
    width: 350,
  },

  {
    field: 'roles',
    headerName: t(TranslationKey.Roles),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,
    renderCell: ({ row }) => <UserRolesCell user={row} />,
    width: 160,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,
    renderCell: params => (
      <ActionButtonsCell
        isFirstButton
        isSecondButton
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
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
    width: 230,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },

  {
    field: 'note',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,
    renderCell: params => (
      <CommentUsersCell
        id={params.row._id}
        comment={params?.row?.note?.comment}
        handler={reason => handlers.onClickSaveComment(params.row._id, reason)}
      />
    ),
    width: 335,
    disableColumnMenu: true,
    filterable: false,
    sortable: false,
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Updated)} />,
    renderCell: params => <NormDateCell value={params.value} />,
    width: 100,
  },
]
