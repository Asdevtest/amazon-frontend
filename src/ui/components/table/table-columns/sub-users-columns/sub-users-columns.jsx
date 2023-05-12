/* eslint-disable no-unused-vars */
import {TranslationKey} from '@constants/translations/translation-key'

import {
  CommentUsersCell,
  EditOrRemoveBtnsCell,
  MultilineTextHeaderCell,
  UserCell,
  UserRolesCell,
} from '@components/data-grid/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const subUsersColumns = (handlers, firstRowId) => [
  {
    field: 'name',
    headerName: t(TranslationKey.User),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.User)} />,

    width: 346,
    renderCell: params => <UserCell user={params.row} />,
  },

  {
    field: 'roles',
    headerName: t(TranslationKey.Roles),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Roles)} />,

    width: 213,
    renderCell: params => <UserRolesCell user={params.row} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Action)} />,

    width: 381,
    renderCell: params => (
      <EditOrRemoveBtnsCell
        isSubUsersTable
        tooltipFirstButton={t(TranslationKey["Editing an employee's permission list"])}
        tooltipSecondButton={t(
          TranslationKey['Removing an employee from the list, banning and disabling access to the platform'],
        )}
        handlers={handlers}
        row={params.row}
        isFirstRow={firstRowId === params.row.id}
      />
    ),
    filterable: false,
    sortable: false,
  },

  {
    field: 'note',
    headerName: t(TranslationKey.Comment),
    renderHeader: () => <MultilineTextHeaderCell text={t(TranslationKey.Comment)} />,

    width: 381,
    renderCell: params => <CommentUsersCell params={params} handler={handlers.onClickSaveComment} />,
    filterable: false,
    sortable: false,
  },
]
