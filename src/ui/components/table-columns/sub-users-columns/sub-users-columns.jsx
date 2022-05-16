import {TranslationKey} from '@constants/translations/translation-key'

import {EditOrRemoveBtnsCell, renderFieldValueCell} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const subUsersColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Name),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'email',
    headerName: t(TranslationKey.Email),
    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 300,
    renderCell: params => <EditOrRemoveBtnsCell isSubUsersTable handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
