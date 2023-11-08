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

    width: 350,
    renderCell: params => {
      const user = params.row

      return <UserCell userId={user?._id} name={user?.name} email={user?.email} rating={user?.rating} />
    },
  },

  {
    field: 'roles',
    headerName: t(TranslationKey.Roles),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,

    width: 215,
    renderCell: params => <UserRolesCell user={params.row} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 340,
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
    filterable: false,
    sortable: false,
  },

  {
    field: 'note',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    width: 335,
    renderCell: params => (
      <CommentUsersCell
        id={params.row._id}
        comment={params?.row?.note?.comment}
        handler={reason => handlers.onClickSaveComment(params.row._id, reason)}
      />
    ),
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
