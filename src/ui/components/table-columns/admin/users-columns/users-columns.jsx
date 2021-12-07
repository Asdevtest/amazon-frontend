import React from 'react'

import {texts} from '@constants/texts'

import {AdminUsersActionBtnsCell, NormDateCell, renderFieldValueCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminUsersTableColumns

export const adminUsersViewColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createdAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 100,
    type: 'date',
  },

  {field: 'name', headerName: 'Name', width: 150},
  {
    field: 'balance',
    headerName: textConsts.balanceField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },

  {
    field: 'balanceFreeze',
    headerName: textConsts.freezeField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },

  {field: 'email', headerName: textConsts.emailField, width: 150},

  {
    field: 'rate',
    headerName: textConsts.rateField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
    type: 'number',
  },

  {
    field: 'tmpRole',
    headerName: textConsts.roleField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'tmpActive',
    headerName: textConsts.statusField,
    renderCell: params => renderFieldValueCell(params.value),
    width: 150,
  },

  {
    field: 'actions',
    headerName: textConsts.actionsField,
    renderCell: params => (
      <AdminUsersActionBtnsCell
        editBtnText={textConsts.editBtnText}
        balanceBtnText={textConsts.balanceBtnText}
        handlers={handlers}
        row={params.row}
      />
    ),
    width: 300,
    filterable: false,
    sortable: false,
  },
]
