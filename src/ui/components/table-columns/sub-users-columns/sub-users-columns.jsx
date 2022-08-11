import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  UserCell,
  TextHeaderCell,
  UserRolesCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const subUsersColumns = (handlers, firstRowId) => [
  {
    field: 'name',
    headerName: t(TranslationKey.User),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey.User)} />,

    width: 500,
    renderCell: params => <UserCell user={params.row} />,
  },

  {
    field: 'roles',
    headerName: t(TranslationKey.Roles),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey.Roles)} />,

    width: 300,
    renderCell: params => <UserRolesCell user={params.row} />,
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    renderHeader: () => <TextHeaderCell text={t(TranslationKey.Action)} />,

    width: 365,
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
]
