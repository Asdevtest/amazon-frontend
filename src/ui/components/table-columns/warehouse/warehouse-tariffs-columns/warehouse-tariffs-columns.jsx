import React from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {
  EditOrRemoveBtnsCell,
  NormDateCell,
  renderFieldValueCell,
  ScrollingCell,
} from '@components/data-grid-cells/data-grid-cells'

import {t} from '@utils/translations'

export const warehouseTariffsColumns = handlers => [
  {
    field: 'name',
    headerName: t(TranslationKey.Title),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'updatedAt',
    headerName: t(TranslationKey.Updated),
    renderCell: params => <NormDateCell params={params} />,
    width: 120,
    type: 'date',
  },

  {
    field: 'description',
    headerName: t(TranslationKey.Description),
    width: 600,
    renderCell: params => <ScrollingCell value={params.value} />,
  },

  {
    field: 'price',
    headerName: t(TranslationKey['Service cost per kg, $']),
    width: 250,
    renderCell: params => renderFieldValueCell(params.value),
  },

  {
    field: 'action',
    headerName: t(TranslationKey.Action),
    width: 250,
    renderCell: params => <EditOrRemoveBtnsCell handlers={handlers} row={params.row} />,
    filterable: false,
    sortable: false,
  },
]
