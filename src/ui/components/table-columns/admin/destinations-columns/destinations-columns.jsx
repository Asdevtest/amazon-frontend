import React from 'react'

import {texts} from '@constants/texts'

import {EditOrRemoveBtnsCell, renderFieldValueCell} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').destinationsColumns

export const destinationsColumns = handlers => [
  {
    field: 'name',
    headerName: textConsts.nameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'country',
    headerName: textConsts.countryField,
    width: 140,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'zipCode',
    headerName: textConsts.zipCodeField,
    width: 90,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'city',
    headerName: textConsts.cityField,
    width: 200,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'state',
    headerName: textConsts.stateField,
    width: 170,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'address',
    headerName: textConsts.addressField,
    width: 350,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: textConsts.actionField,
    width: 200,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
