import React from 'react'

import {texts} from '@constants/texts'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
} from '@components/data-grid-cells/data-grid-cells'

import {getLocalizedTexts} from '@utils/get-localized-texts'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseTariffsColumns

export const warehouseTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: textConsts.nameField,
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'updatedAt',
    headerName: textConsts.updatedAtField,
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'description',
    headerName: textConsts.descriptionField,
    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: textConsts.priceField,
    width: 250,
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
