import { TranslationKey } from '@constants/translations/translation-key'

import {
  CommentUsersCell,
  EditOrRemoveBtnsCell,
  MultilineTextHeaderCell,
  NormDateCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import { t } from '@utils/translations'

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
      <EditOrRemoveBtnsCell
        isSubUsersTable
        tooltipFirstButton={t(TranslationKey["Editing an employee's permission list"])}
        tooltipSecondButton={t(
          TranslationKey['Removing an employee from the list, banning and disabling access to the platform'],
        )}
        handlers={handlers}
        row={params.row}
        isFirstRow={params.api.getSortedRowIds()?.[0] === params.row.id}
      />
    ),
    width: 340,
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
