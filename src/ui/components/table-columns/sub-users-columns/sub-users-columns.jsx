import {texts} from '@constants/texts'

import {EditOrRemoveBtnsCell, renderFieldValueCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').subUsersTableColumns

export const subUsersColumns = handlers => [
  {
    field: 'name',
    headerName: textConsts.nameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'email',
    headerName: textConsts.emailField,
    width: 300,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 300,
    renderCell: params => <EditOrRemoveBtnsCell isSubUsersTable handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
