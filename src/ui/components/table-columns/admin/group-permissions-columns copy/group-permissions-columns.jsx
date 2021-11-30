import React from 'react'

import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').adminGroupPermissionsColumns

export const adminGroupPermissionsColumns = handlers => [
  {
    field: 'createdAt',
    headerName: textConsts.createDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updateDateField,
    renderCell: params => <NormDateCell params={params} />,
    width: 130,
    type: 'date',
  },

  {
    field: 'key',
    headerName: textConsts.keyField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'tmpRole',
    headerName: 'Роль',
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'title',
    headerName: textConsts.titleField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 400,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 250,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
